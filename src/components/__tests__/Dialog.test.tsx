import {fireEvent, render, screen} from "@testing-library/react";
import {Dialog} from "../atom/Dialog.tsx";

describe("Dialog", () => {
	const mockOnClose = jest.fn();

	beforeEach(() => {
		mockOnClose.mockClear();
		// Reset body style before each test
		document.body.style.overflow = "";
	});

	it("renders nothing when closed", () => {
		render(
			<Dialog isOpen={false} onClose={mockOnClose}>
				<div>Content</div>
			</Dialog>
		);
		expect(screen.queryByText("Content")).not.toBeInTheDocument();
	});

	it("renders content when open", () => {
		render(
			<Dialog isOpen={true} onClose={mockOnClose}>
				<div>Content</div>
			</Dialog>
		);
		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	it("renders title when provided", () => {
		render(
			<Dialog isOpen={true} onClose={mockOnClose} title="Test Title">
				<div>Content</div>
			</Dialog>
		);
		expect(screen.getByText("Test Title")).toBeInTheDocument();
	});

	it("renders footer when provided", () => {
		render(
			<Dialog
				isOpen={true}
				onClose={mockOnClose}
				footer={<div>Footer Content</div>}
			>
				<div>Content</div>
			</Dialog>
		);
		expect(screen.getByText("Footer Content")).toBeInTheDocument();
	});

	it("calls onClose when backdrop is clicked", () => {
		render(
			<Dialog isOpen={true} onClose={mockOnClose}>
				<div>Content</div>
			</Dialog>
		);

		// Use data-testid to find the backdrop
		const backdrop = screen.getByTestId("dialog-backdrop");
		fireEvent.click(backdrop);
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it("prevents body scroll when open", () => {
		const { unmount } = render(
			<Dialog isOpen={true} onClose={mockOnClose}>
				<div>Content</div>
			</Dialog>
		);

		expect(document.body.style.overflow).toBe("hidden");

		unmount();
		expect(document.body.style.overflow).toBe("");
	});

	it("restores body scroll when closed", () => {
		const { rerender } = render(
			<Dialog isOpen={true} onClose={mockOnClose}>
				<div>Content</div>
			</Dialog>
		);

		expect(document.body.style.overflow).toBe("hidden");

		rerender(
			<Dialog isOpen={false} onClose={mockOnClose}>
				<div>Content</div>
			</Dialog>
		);

		expect(document.body.style.overflow).toBe("");
	});
});
