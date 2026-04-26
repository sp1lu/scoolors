/* Types */
import type { Oklch } from "../types"

/* Lib */
import { clamp } from "../../../shared/lib"

/* Lib */
export function mix(a: Oklch, b: Oklch, t: number): Oklch {
    return {
        l: clamp(a.l + (b.l - a.l) * t),
        c: Math.max(0, a.c + (b.c - a.c) * t),
        h: a.h
    }
}