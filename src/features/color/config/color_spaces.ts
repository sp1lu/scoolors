import type { Space } from "../types";

export const COLOR_SPACES: Space[] = [
    {
        id: 'hex',
        type: 'string'
    },
    {
        id: 'rgb',
        type: 'number',
        schema: [
            {
                step: 1,
                max: 255
            },
            {
                step: 1,
                max: 255
            },
            {
                step: 1,
                max: 255
            }
        ]
    },
    {
        id: 'hsl',
        type: 'number',
        schema: [
            {
                step: 1,
                max: 360
            },
            {
                step: 1,
                max: 100
            },
            {
                step: 1,
                max: 100
            }
        ]
    },
    {
        id: 'oklch',
        type: 'number',
        schema: [
            {
                step: 1,
                max: 100
            },
            {
                step: 1,
                max: 100
            },
            {
                step: 1,
                max: 100
            }
        ]
    }
]