export function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text)
        .catch((err: unknown) => {
            throw new Error(err instanceof Error ? err.message : `Error cpying to clipboard.`)
        });
}