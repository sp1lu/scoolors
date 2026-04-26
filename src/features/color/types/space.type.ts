/* Types */
import type { SpaceSchema } from './space_schema.type'

/* Type */
export type Space = {
    id: string,
    type: string,
    schema?: SpaceSchema[]
}