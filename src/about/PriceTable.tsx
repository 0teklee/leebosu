interface PriceItem {
	service: string;
	price: string;
	time: string;
}

interface PriceTableProps {
	title: string;
	description: string;
	items: PriceItem[];
}

export function PriceTable({ title, description, items }: PriceTableProps) {
	return (
		<div className="w-full mb-8">
			<h3 className="text-theme text-xl sm:text-2xl font-semibold mb-2">
				{title}
			</h3>
			<p className="text-secondary mb-4">{description}</p>
			<div className="overflow-hidden rounded border">
				<table className="w-full [&_tr]:divide-x divide-secondary  border-secondary">
					<thead>
						<tr className="border-b-2 border-double bg-background-secondary">
							<th className="p-2 text-left">서비스</th>
							<th className="p-2 text-left">가격</th>
							<th className="p-2 text-left">소요 시간</th>
						</tr>
					</thead>
					<tbody className="bg-background divide-y">
						{items.map((item, index) => (
							<tr key={index}>
								<td className="p-2">{item.service}</td>
								<td className="p-2 font-medium">{item.price}</td>
								<td className="p-2">{item.time}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
