function Table({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
	return (
		<table
			className="w-full border border-secondary rounded-lg overflow-hidden"
			{...props}
		>
			{children}
		</table>
	);
}
Table.Head = function Head({ children }: { children: React.ReactNode }) {
	return <thead className="bg-theme text-white">{children}</thead>;
};
Table.Body = function Body({ children }: { children: React.ReactNode }) {
	return <tbody className="bg-background">{children}</tbody>;
};
Table.Row = function Row({ children }: { children: React.ReactNode }) {
	return (
		<tr className="border-b border-secondary last:border-b-0">{children}</tr>
	);
};
Table.Cell = function Cell({
	children,
	header,
}: {
	children: React.ReactNode;
	header?: boolean;
}) {
	return header ? (
		<th className="p-3 font-semibold">{children}</th>
	) : (
		<td className="p-3">{children}</td>
	);
};

export default Table;
