import type { StyleSchema } from '../types'

export const STYLE_SCHEMAS: StyleSchema = new Map([
    ['css', `\t--{{key}}: {{value}};\n`],
    ['scss', `$${'{'}{key}}: {{value}};\n`],
    ['sass', `$${'{'}{key}}: {{value}}\n`],
    ['less', `@{{key}}: {{value}};\n`],
    ['json', `\t"{{key}}": "{{value}}",\n`],
]);