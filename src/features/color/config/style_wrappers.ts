export const STYLE_WRAPPERS = new Map([
    ['css', (content: string) => `:root {\n${content}}`],
    ['scss', (content: string) => `${content}`],
    ['sass', (content: string) => content],
    ['less', (content: string) => content],
    ['json', (content: string) => `{\n${content}}`],
]);