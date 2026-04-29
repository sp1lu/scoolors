/* Config */
import { COLOR_STEPS, LIGHTNESS_STEPS } from '../config'

/* Types */
import type { Hex, Oklch, Rgb, Scale } from '../types'

/* Model */
import { parseOklch } from './color.parser'

/* Lib */
import { hexToRgb, mix, oklabToOklch, oklabToRgb, oklchToOklab, rgbToOklab } from '../lib'
import { easeIn, easeOut } from '../../../shared/lib'

/* Service */
export function hexToOklch(hex: string): Oklch {
    const rgb: Rgb = hexToRgb(hex);
    const lab = rgbToOklab(rgb);
    return parseOklch(oklabToOklch(lab));
}

export function oklchToHex(color: Oklch): Hex {
    const lab = oklchToOklab(color);
    const { r, g, b }: Rgb = oklabToRgb(lab);

    return (
        "#" +
        [r, g, b]
            .map(v => v.toString(16).padStart(2, "0"))
            .join("")
    ) as Hex;
}

export function oklchToRgb(color: Oklch): Rgb {
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

export function convertToHexScale(scale: Scale<Oklch>): Scale<Hex> {
    return Object.entries(scale).reduce((acc: Scale<Hex>, [key, value]: [string, Oklch]) => {
        acc[key] = `${oklchToHex(value)}`;
        return acc;
    }, {} as Scale<Hex>);
}

export function generateStyleFromScale(scale: Scale, styleKey: string, type: 'hex' | 'oklch'): string {
    let str: string = ':root {\n';

    switch (type) {
        case 'oklch':
            str += generateOklchStyleFromScale(scale, styleKey);
            break;

        default:
            str += generateHexStyleFromScale(convertToHexScale(scale), styleKey);
            break;
    }

    return str;
}

export function generateOklchStyleFromScale(scale: Scale, styleKey: string): string {
    return Object.entries(scale).reduce((acc: string, [key, value]: [string, Oklch]) => {
        acc += `\t--${styleKey}-${key}: oklch(${value.l.toFixed(3)} ${value.c.toFixed(3)} ${value.h.toFixed(3)});\n`;
        return acc;
    }, '');
}

export function generateHexStyleFromScale(scale: Scale<Hex>, styleKey: string): string {
    return Object.entries(scale).reduce((acc: string, [key, value]: [string, Hex]) => {
        acc += `\t--${styleKey}-${key}: ${value};\n`;
        return acc;
    }, '');
}

export function generateRgbStyleFromScale(scale: Scale<Rgb>, styleKey: string): string {
    return Object.entries(scale).reduce((acc: string, [key, value]: [string, Rgb]) => {
        acc += `\t--${styleKey}-${key}: rgb(${value.r} ${value.g} ${value.b});\n`;
        return acc;
    }, '');
}