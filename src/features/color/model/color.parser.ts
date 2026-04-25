/* Types */
import type { Oklch } from '../types'

/* Parser */
export function parseOklch(obj: unknown): Oklch {
    if (typeof obj !== 'object' || obj === null) throw new Error(`Object cannot be used to parse as Oklch type.`);

    return {
        l: 'l' in obj && typeof obj['l'] === 'number' ? obj['l'] : 0,
        c: 'c' in obj && typeof obj['c'] === 'number' ? obj['c'] : 0,
        h: 'h' in obj && typeof obj['h'] === 'number' ? obj['h'] : 0,
    };
} 