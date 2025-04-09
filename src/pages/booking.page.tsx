import { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { Button } from "../components/Button";
import { Dialog } from "../components/Dialog";
import { PageLayout } from "../components/PageLayout";
import { TEXT } from "../constants/text";

export function BookingPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(true);

	const handleClose = () => {
		setIsDialogOpen(false);
		// Navigate back to previous page
		window.history.back();
	};

	return (
		<PageLayout title="예약하기">
			<div className="text-center">
				<p className="mb-6 text-base sm:text-lg">
					아래 버튼을 클릭하여 예약을 시작해주세요.
				</p>
				<Button size="lg" onClick={() => setIsDialogOpen(true)}>
					{TEXT.hero.cta}
				</Button>
			</div>

			<Dialog isOpen={isDialogOpen} onClose={handleClose} title="예약하기">
				<BookingForm onClose={handleClose} />
			</Dialog>
		</PageLayout>
	);
}
