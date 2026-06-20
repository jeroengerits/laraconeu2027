import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation((query: string) => ({
        addEventListener: jest.fn(),
        addListener: jest.fn(),
        dispatchEvent: jest.fn(),
        matches: false,
        media: query,
        onchange: null,
        removeEventListener: jest.fn(),
        removeListener: jest.fn(),
    })),
    writable: true,
});

class ResizeObserverMock {
    disconnect(): void {}

    observe(): void {}

    unobserve(): void {}
}

class IntersectionObserverMock {
    readonly root = null;

    readonly rootMargin = '';

    readonly thresholds = [];

    disconnect(): void {}

    observe(): void {}

    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }

    unobserve(): void {}
}

global.ResizeObserver = ResizeObserverMock;
global.IntersectionObserver = IntersectionObserverMock;

window.scrollTo = jest.fn();
