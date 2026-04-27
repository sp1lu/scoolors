/* Config */
import { COLOR_STEPS, LIGHTNESS_STEPS } from '../config'

/* Types */
import type { Oklch, Scale } from '../types'

/* Model */
import { parseOklch } from './color.parser'

/* Lib */
import { hexToRgb, mix, oklabToOklch, oklabToRgb, oklchToOklab, rgbToOklab } from '../lib'
import { easeIn, easeOut } from '../../../shared/lib'

/* Service */
export function hexToOklch(hex: string): Oklch {
    const rgb = hexToRgb(hex);
    const lab = rgbToOklab(rgb);
    return parseOklch(oklabToOklch(lab));
}

export function oklchToHex(color: Oklch) {
    const lab = oklchToOklab(color);
    const { r, g, b } = oklabToRgb(lab);

    return (
        "#" +
        [r, g, b]
            .map(v => v.toString(16).padStart(2, "0"))
            .join("")
    );
}

export function oklchToRgb(color: Oklch) {
    const lab = oklchToOklab(color);
    return oklabToRgb(lab);
}

export function generateColorScale(base: Oklch): Scale {
    const scale: Scale = {};

    const white: Oklch = {
        l: 0.98,
        c: base.c * 0.05,
        h: base.h
    }

    const black: Oklch = {
        l: 0.08,
        c: base.c * 0.15,
        h: base.h
    }

    for (const step of COLOR_STEPS) {
        if (step === 500) {
            scale[step] = base
            continue
        }

        if (step < 500) {
            const t = (500 - step) / 400
            scale[step] = mix(base, white, easeOut(t))
        } else {
            const t = (step - 500) / 400
            scale[step] = mix(base, black, easeIn(t))
        }
    }

    return scale;
}

export function generateNeutralScale(base: Oklch): Scale {
    const scale = {} as Scale

    const MAX_CHROMA = base.c * 0.08

    for (const step of COLOR_STEPS) {
        const t = (step - 100) / 800

        const chromaFactor = Math.exp(-4 * Math.pow(t - 0.5, 2))

        scale[step] = {
            l: LIGHTNESS_STEPS.get(step) ?? .85,
            c: MAX_CHROMA * chromaFactor,
            h: base.h
        }
    }

    return scale
}