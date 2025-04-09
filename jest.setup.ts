// Import Jest DOM matchers
import "@testing-library/jest-dom";

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		// Use jest.fn() for addListener/removeListener for compatibility
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// You can add other global setup configurations here if needed
