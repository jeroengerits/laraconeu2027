import type { Speaker } from '@/types/speaker';

export function speakerInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return '';
    }

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

export function formatScheduleSpeakerName(name: string): string {
    return name.toUpperCase();
}

export function speakersById(
    speakers: readonly Speaker[],
): Map<string, Speaker> {
    return new Map(speakers.map((speaker) => [speaker.id, speaker]));
}
