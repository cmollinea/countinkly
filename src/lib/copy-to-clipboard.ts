export async function copyToClipboard(text: string, source: string) {
	const type = "text/plain";
	const blob = new Blob([text], { type });
	const data = [new ClipboardItem({ [type]: blob })];

	navigator.clipboard.write(data);
}
