/* Config */
import { COLOR_STEPS } from '../config'

/* Types */
import type { Oklch, Scale } from '../types'

/* Model */
import { parseOklch } from './color.parser'

/* Lib */
import { hexToRgb, oklabToOklch, rgbToOklab } from '../lib'
import { clamp } from '../../../shared/lib'

/* Service */
export function hexToOklch(hex: string): Oklch {
    const rgb = hexToRgb(hex);
    const lab = rgbToOklab(rgb);
    return parseOklch(oklabToOklch(lab));
}

export function createScale(base: Oklch): Scale {
    const scale: Record<string, Oklch> = {};

    for (const [key, delta] of COLOR_STEPS) {
        scale[key] = {
            l: clamp(base.l + delta, 0, 1),
            c: base.c * (key === 500 ? 1 : .9),
            h: base.h
        }
    }

    return scale;
}