import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {TransitionProvider} from "../../components/TransitionProvider";
import {Layout} from "../layout/Layout.tsx";

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
		expect(screen.getByText("LEEBOSU")).toBeInTheDocument();
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
		expect(screen.getByText("Leebosu.com")).toBeInTheDocument();
		expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
	});
});
