
function DevError({ error }: { error?: Error }) {
	if (typeof window === "undefined") return null;

	return (
		<>
			{import.meta.env.DEV && error && (
				<pre className="text-left p-4 rounded-lg mb-4 overflow-auto max-w-2xl mx-auto text-sm">
					<code>{error.toString()}</code>
				</pre>
			)}
		</>
	);
}

export default DevError;
