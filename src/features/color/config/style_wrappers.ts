export const STYLE_WRAPPERS = new Map([
    ['css', (content: string) => `:root {\n${content}}`],
    ['scss', (content: string) => `\n${content}\n`],
    ['sass', (content: string) => `\n${content}\n`],
    ['less', (content: string) => `\n${content}\n`],
    ['json', (content: string) => `{\n${content}}`],
]);