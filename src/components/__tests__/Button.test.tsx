import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
	it("renders children correctly", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText("Click me")).toBeInTheDocument();
	});

	it("applies variant styles correctly", () => {
		const { rerender } = render(<Button variant="primary">Primary</Button>);
		expect(screen.getByText("Primary")).toHaveClass("bg-blue-600");

		rerender(<Button variant="secondary">Secondary</Button>);
		expect(screen.getByText("Secondary")).toHaveClass("bg-gray-600");

		rerender(<Button variant="outline">Outline</Button>);
		expect(screen.getByText("Outline")).toHaveClass("border-gray-300");
	});

	it("applies size styles correctly", () => {
		const { rerender } = render(<Button size="sm">Small</Button>);
		expect(screen.getByText("Small")).toHaveClass("px-3", "py-1.5", "text-sm");

		rerender(<Button size="md">Medium</Button>);
		expect(screen.getByText("Medium")).toHaveClass("px-4", "py-2", "text-base");

		rerender(<Button size="lg">Large</Button>);
		expect(screen.getByText("Large")).toHaveClass("px-6", "py-3", "text-lg");
	});

	it("applies fullWidth style when specified", () => {
		render(<Button fullWidth>Full Width</Button>);
		expect(screen.getByText("Full Width")).toHaveClass("w-full");
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Click me</Button>);

		fireEvent.click(screen.getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('renders as an anchor tag when as="a" and href is provided', () => {
		render(
			<Button as="a" href="/test">
				Link
			</Button>
		);
		const link = screen.getByText("Link");
		expect(link.tagName).toBe("A");
		expect(link).toHaveAttribute("href", "/test");
	});

	it("applies custom className correctly", () => {
		render(<Button className="custom-class">Custom</Button>);
		expect(screen.getByText("Custom")).toHaveClass("custom-class");
	});
});
