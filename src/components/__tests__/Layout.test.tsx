import { render, screen } from "@testing-library/react";
import { Layout } from "../Layout";
import { TransitionProvider } from "../../hooks/useAppTransition.tsx";
import { MemoryRouter } from "react-router-dom";

describe("Layout", () => {
	const renderWithProviders = (ui: React.ReactElement) => {
		return render(
			<MemoryRouter>
				<TransitionProvider>{ui}</TransitionProvider>
			</MemoryRouter>
		);
	};

	it("renders header with logo and navigation", () => {
		renderWithProviders(<Layout>Test Content</Layout>);

		// Check for logo
		expect(screen.getByText("이보수")).toBeInTheDocument();
		// Check if logo is a link to home (might need more specific selector)
		// expect(screen.getByText("이보수")).toHaveAttribute("href", "/");

		// Check for navigation links
		expect(screen.getByRole("link", { name: "홈" })).toHaveAttribute(
			"href",
			"/"
		);
		expect(screen.getByRole("link", { name: "소개" })).toHaveAttribute(
			"href",
			"/about"
		);
		expect(screen.getByRole("link", { name: "예약" })).toHaveAttribute(
			"href",
			"/book"
		);
	});

	it("renders children content", () => {
		renderWithProviders(
			<Layout>
				<div>Main Content Here</div>
			</Layout>
		);
		expect(screen.getByText("Main Content Here")).toBeInTheDocument();
	});

	it("renders footer with copyright", () => {
		renderWithProviders(<Layout>Test Content</Layout>);
		const currentYear = new Date().getFullYear();
		expect(
			screen.getByText(`© ${currentYear} 이보수. 모든 권리 보유.`)
		).toBeInTheDocument();
	});
});
