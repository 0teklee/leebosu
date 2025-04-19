import { ABOUT_TEXT, SERVICE_TABLE_ITEMS } from "./constants";

export default function AboutTable() {
	return (
		<div className="w-full mb-8">
			<h3 className="text-theme text-xl sm:text-2xl font-semibold mb-2">
				{ABOUT_TEXT.price_table.title}
			</h3>
			<p className="text-secondary mb-4">
				{ABOUT_TEXT.price_table.description}
			</p>
			<div className="overflow-hidden rounded border max-w-3xl mx-auto">
				<table className="w-full [&_tr]:divide-x divide-secondary border-secondary">
					<thead>
						<tr className="border-b-2 border-double bg-theme">
							<th className="p-2 text-left text-white w-2/5">서비스 대분류</th>
							<th className="p-2 text-left text-white w-3/5">서비스 소분류</th>
						</tr>
					</thead>
					<tbody className="bg-background divide-y">
						{SERVICE_TABLE_ITEMS.map((item, index) => (
							<tr key={index} className="align-top">
								<td className="p-2 font-semibold">{item.service}</td>
								<td className="p-2">
									{item.subCategories.map((subCategory) => (
										<tr key={subCategory} className="text-sm">
											{subCategory}
										</tr>
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
