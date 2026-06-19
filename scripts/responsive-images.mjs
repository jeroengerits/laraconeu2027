import { spawn } from 'node:child_process';
import { constants } from 'node:fs';
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import path from 'node:path';
import process from 'node:process';

const defaultSizes = new Map([
    ['tiny', 480],
    ['small', 768],
    ['medium', 1024],
    ['large', 1536],
    ['huge', 2048],
    ['mega', 2880],
]);

const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const originalSizeLabel = 'original';

function printUsage() {
    const defaultSizeList = formatSizes(defaultSizes);

    console.log(`Usage: npm run images:responsive -- <source-path> [options]

Options:
  --out <path>             Write variants to this directory instead of <source>/resized.
  --sizes <list>           Comma-separated labels and widths. Defaults to all sizes: ${defaultSizeList}
  --concurrency <number>   Number of variants to process at once. Default: ${getDefaultConcurrency()}
  --overwrite              Replace existing variant files.
  --dry-run                Print planned output without writing files.

Resized variants preserve the source aspect ratio.

Output names preserve the original filename and append the size before the extension:
  photo.jpg -> photo-original.jpg
  photo.jpg -> photo-small.jpg

Examples:
  npm run images:responsive -- resources/img
  npm run images:responsive -- resources/img --sizes small:480,medium:960,large:1440
  npm run images:responsive -- resources/img/photo.jpg`);
}

function parseArgs(argv) {
    const options = {
        concurrency: getDefaultConcurrency(),
        dryRun: false,
        out: null,
        overwrite: false,
        sizes: defaultSizes,
        source: null,
    };

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];

        if (arg === '--help' || arg === '-h') {
            printUsage();
            process.exit(0);
        }

        if (arg === '--dry-run') {
            options.dryRun = true;
            continue;
        }

        if (arg === '--overwrite') {
            options.overwrite = true;
            continue;
        }

        if (arg === '--concurrency') {
            options.concurrency = parseConcurrency(
                readOptionValue(argv, index, arg),
            );
            index += 1;
            continue;
        }

        if (arg === '--out') {
            options.out = readOptionValue(argv, index, arg);
            index += 1;
            continue;
        }

        if (arg === '--sizes') {
            options.sizes = parseSizes(readOptionValue(argv, index, arg));
            index += 1;
            continue;
        }

        if (arg.startsWith('--')) {
            throw new Error(`Unknown option: ${arg}`);
        }

        if (options.source !== null) {
            throw new Error(`Unexpected extra argument: ${arg}`);
        }

        options.source = arg;
    }

    if (options.source === null) {
        throw new Error('Missing source path.');
    }

    return options;
}

function getDefaultConcurrency() {
    return Math.max(1, Math.min(4, availableParallelism()));
}

function parseConcurrency(value) {
    const concurrency = Number(value);

    if (!Number.isInteger(concurrency) || concurrency < 1) {
        throw new Error('--concurrency must be a positive integer.');
    }

    return concurrency;
}

function readOptionValue(argv, index, option) {
    const value = argv[index + 1];

    if (value === undefined || value.startsWith('--')) {
        throw new Error(`Missing value for ${option}.`);
    }

    return value;
}

function parseSizes(value) {
    const sizes = new Map();

    for (const part of value.split(',')) {
        const [label, width] = part.split(':');
        const parsedWidth = Number(width);

        if (!label || !Number.isInteger(parsedWidth) || parsedWidth < 1) {
            throw new Error(
                `Invalid size "${part}". Use the format label:width.`,
            );
        }

        sizes.set(label, parsedWidth);
    }

    if (sizes.size === 0) {
        throw new Error('At least one size is required.');
    }

    return sizes;
}

function formatSizes(sizes) {
    return Array.from(sizes, ([label, width]) => `${label}:${width}`).join(',');
}

async function collectImages(sourcePath, ignoredDirectories = new Set()) {
    const sourceStats = await stat(sourcePath);

    if (sourceStats.isFile()) {
        return isSupportedImage(sourcePath) ? [sourcePath] : [];
    }

    if (!sourceStats.isDirectory()) {
        return [];
    }

    const entries = await readdir(sourcePath, { withFileTypes: true });
    const images = [];

    for (const entry of entries) {
        const entryPath = path.join(sourcePath, entry.name);
        const resolvedEntryPath = path.resolve(entryPath);

        if (entry.isDirectory()) {
            if (ignoredDirectories.has(resolvedEntryPath)) {
                continue;
            }

            images.push(
                ...(await collectImages(entryPath, ignoredDirectories)),
            );
            continue;
        }

        if (entry.isFile() && isSupportedImage(entryPath)) {
            images.push(entryPath);
        }
    }

    return images;
}

function isSupportedImage(filePath) {
    return supportedExtensions.has(path.extname(filePath).toLowerCase());
}

function isGeneratedVariant(filePath, sizeLabels) {
    const { name } = path.parse(filePath);
    const generatedLabels = [originalSizeLabel, ...sizeLabels];

    return generatedLabels.some((label) => name.endsWith(`-${label}`));
}

function appendSizeToFilename(filename, sizeLabel) {
    const extension = path.extname(filename);
    const basename = filename.slice(0, filename.length - extension.length);

    return `${basename}-${sizeLabel}${extension}`;
}

function getOutputPath({ imagePath, outputRoot, sizeLabel, sourceRoot }) {
    const parsedPath = path.parse(imagePath);
    const filename = appendSizeToFilename(parsedPath.base, sizeLabel);
    const relativeDirectory = path.relative(sourceRoot, parsedPath.dir);

    return path.join(outputRoot, relativeDirectory, filename);
}

function relativeFromCwd(filePath) {
    const relativePath = path.relative(process.cwd(), filePath);

    if (relativePath === '') {
        return filePath;
    }

    if (relativePath.startsWith('..')) {
        return filePath;
    }

    return relativePath;
}

async function runCommand(command, args) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            stdio: ['ignore', 'pipe', 'pipe'],
        });
        let stderr = '';

        child.stderr.on('data', (chunk) => {
            stderr += chunk;
        });

        child.on('error', reject);
        child.on('close', (code) => {
            if (code === 0) {
                resolve();

                return;
            }

            reject(
                new Error(
                    `${command} exited with code ${code}.\n${stderr.trim()}`,
                ),
            );
        });
    });
}

async function createVariant({
    dryRun,
    imagePath,
    outputPath,
    overwrite,
    width,
}) {
    const outputDirectory = path.dirname(outputPath);

    if (dryRun) {
        return;
    }

    await mkdir(outputDirectory, { recursive: true });

    await runCommand('ffmpeg', [
        overwrite ? '-y' : '-n',
        '-hide_banner',
        '-loglevel',
        'error',
        '-i',
        imagePath,
        '-vf',
        getAspectRatioPreservingScaleFilter(width),
        '-frames:v',
        '1',
        outputPath,
    ]);
}

function getAspectRatioPreservingScaleFilter(width) {
    return `scale=w=${width}:h=-2`;
}

async function copyOriginalVariant({
    dryRun,
    imagePath,
    outputPath,
    overwrite,
}) {
    if (dryRun) {
        return;
    }

    await mkdir(path.dirname(outputPath), { recursive: true });
    await copyFile(
        imagePath,
        outputPath,
        overwrite ? constants.COPYFILE_FICLONE : constants.COPYFILE_EXCL,
    );
}

function createImageTasks({ images, options, outputRoot, sourceRoot }) {
    const tasks = [];

    for (const imagePath of images) {
        const originalOutputPath = getOutputPath({
            imagePath,
            outputRoot,
            sizeLabel: originalSizeLabel,
            sourceRoot,
        });

        tasks.push({
            description: `${options.dryRun ? 'Would copy' : 'Copying'} ${relativeFromCwd(originalOutputPath)} (original size).`,
            run: () =>
                copyOriginalVariant({
                    dryRun: options.dryRun,
                    imagePath,
                    outputPath: originalOutputPath,
                    overwrite: options.overwrite,
                }),
        });

        for (const [sizeLabel, width] of options.sizes) {
            const outputPath = getOutputPath({
                imagePath,
                outputRoot,
                sizeLabel,
                sourceRoot,
            });

            tasks.push({
                description: `${options.dryRun ? 'Would generate' : 'Generating'} ${relativeFromCwd(outputPath)} (${width}px wide).`,
                run: () =>
                    createVariant({
                        dryRun: options.dryRun,
                        imagePath,
                        outputPath,
                        overwrite: options.overwrite,
                        width,
                    }),
            });
        }
    }

    return tasks;
}

async function processTasksInParallel({ concurrency, tasks }) {
    let completedTasks = 0;
    let nextTaskIndex = 0;

    async function worker() {
        while (nextTaskIndex < tasks.length) {
            const taskIndex = nextTaskIndex;
            nextTaskIndex += 1;

            const task = tasks[taskIndex];
            console.log(
                `[${taskIndex + 1}/${tasks.length}] ${task.description}`,
            );
            await task.run();

            completedTasks += 1;
        }
    }

    const workerCount = Math.min(concurrency, tasks.length);
    await Promise.all(
        Array.from({ length: workerCount }, async () => {
            await worker();
        }),
    );

    return completedTasks;
}

async function main() {
    const options = parseArgs(process.argv.slice(2));
    const sourcePath = path.resolve(options.source);
    const sourceStats = await stat(sourcePath);
    const sourceRoot = sourceStats.isDirectory()
        ? sourcePath
        : path.dirname(sourcePath);
    const outputRoot =
        options.out === null
            ? path.join(sourceRoot, 'resized')
            : path.resolve(process.cwd(), options.out);
    const images = (
        await collectImages(sourcePath, new Set([outputRoot]))
    ).filter(
        (imagePath) => !isGeneratedVariant(imagePath, options.sizes.keys()),
    );

    if (images.length === 0) {
        console.log('No source images found.');

        return;
    }

    const tasks = createImageTasks({
        images,
        options,
        outputRoot,
        sourceRoot,
    });

    console.log(
        `Found ${images.length} image(s). Processing ${tasks.length} image variant(s).`,
    );
    console.log(`Output directory: ${relativeFromCwd(outputRoot)}`);
    console.log(`Concurrency: ${Math.min(options.concurrency, tasks.length)}`);

    const completedVariants = await processTasksInParallel({
        concurrency: options.concurrency,
        tasks,
    });

    const completedLabel = options.dryRun ? 'Planned' : 'Generated';

    console.log(`Done. ${completedLabel} ${completedVariants} variant(s).`);
}

main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
