import type { StyleSchema } from '../types'

export const STYLE_SCHEMAS: StyleSchema = new Map([
    ['css', `\t--{{key}}: {{value}};\n`],
    ['scss', `\t$${'{'}{key}}: {{value}};\n`],
    ['sass', `\t$${'{'}{key}}: {{value}}\n`],
    ['less', `\t@{{key}}: {{value}};\n`],
    ['json', `\t"{{key}}": "{{value}}",\n`],
]);