import { ABOUT_TEXT, SERVICE_TABLE_ITEMS } from "./constants";

export default function AboutTable() {
	return (
		<div className="w-full max-w-3xl mx-auto">
			<h3 className="text-theme text-xl sm:text-2xl font-semibold mb-2">
				{ABOUT_TEXT.price_table.title}
			</h3>
			<p className="text-secondary mb-4">
				{ABOUT_TEXT.price_table.description}
			</p>
			<div className="overflow-hidden rounded-lg border border-secondary">
				<table className="w-full text-left">
					<thead>
						<tr className="bg-theme border-b border-secondary">
							<th className="p-3 text-left text-white font-semibold w-2/5">
								서비스 대분류
							</th>
							<th className="p-3 text-left text-white font-semibold w-3/5">
								서비스 소분류
							</th>
						</tr>
					</thead>
					<tbody className="bg-background">
						{SERVICE_TABLE_ITEMS.map((item, index) => (
							<tr
								key={index}
								className="align-top border-b border-secondary last:border-b-0"
							>
								<td className="p-3 font-semibold text-theme">{item.service}</td>
								<td className="p-3 text-secondary">
									<div className="flex flex-col gap-1">
										{item.subCategories.map((subCategory) => (
											<div key={subCategory} className="text-sm">
												{subCategory}
											</div>
										))}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
