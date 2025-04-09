import type { Config } from "jest";

const config: Config = {
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	// Update path to the new .ts setup file
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
	transform: {
		// Use ts-jest preset for transforming TS/TSX files
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				// Specify the TS config file for Jest
				tsconfig: "tsconfig.jest.json",
				// Ensure ESM compatibility if needed, though often handled by tsconfig
				// useESM might not be needed if tsconfig handles module interop
			},
		],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	// Indicate that Jest should collect coverage information
	collectCoverage: true,
	// Specify the directory where coverage reports should be written
	coverageDirectory: "coverage",
	// Set the coverage reporter format
	coverageReporters: ["json", "lcov", "text", "clover"],
};

export default config;
