/* Config */
import { COLOR_STEPS, LIGHTNESS_STEPS, STYLE_SCHEMAS, STYLE_WRAPPERS } from '../config'

/* Types */
import type { ColorSpace, ColorStyle, Hex, Hsl, Oklch, Rgb, Scale } from '../types'

/* Model */
import { parseOklch } from './color.parser'

/* Lib */
import { hexToRgb, mix, oklabToOklch, oklabToRgb, oklchToHsl, oklchToOklab, rgbToOklab } from '../lib'
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
        '#' +
        [r, g, b]
            .map(v => v.toString(16).padStart(2, '0').toUpperCase())
            .join('')
    ) as Hex;
}

export function oklchToRgb(color: Oklch): Rgb {
    const lab = oklchToOklab(color);
    return oklabToRgb(lab);
}

export function generateColorScale(base: Oklch): Scale {
    const scale: Scale = {};

    const white: Oklch = {
        l: 0.95,
        c: base.c * 0.05,
        h: base.h
    }

    const black: Oklch = {
        l: 0.12,
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

    const MAX_CHROMA = base.c * 0.03

    for (const step of COLOR_STEPS) {

        if (step === Math.min(...COLOR_STEPS)) {
            scale[step] = { l: 1, c: 0, h: 0 }
            continue
        }

        if (step === Math.max(...COLOR_STEPS)) {
            scale[step] = { l: 0, c: 0, h: 0 }
            continue
        }

        const t = (step - 100) / 800
        const chromaFactor = Math.exp(-4 * Math.pow(t - 0.5, 2))

        scale[step] = {
            l: LIGHTNESS_STEPS.get(step) ?? 0.85,
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

export function convertToRgbScale(scale: Scale<Oklch>): Scale<Rgb> {
    return Object.entries(scale).reduce((acc: Scale<Rgb>, [key, value]: [string, Oklch]) => {
        acc[key] = oklchToRgb(value);
        return acc;
    }, {} as Scale<Rgb>);
}

export function convertoHslScale(scale: Scale<Oklch>): Scale<Hsl> {
    return Object.entries(scale).reduce((acc: Scale<Hsl>, [key, value]: [string, Oklch]) => {
        acc[key] = oklchToHsl(value);
        return acc;
    }, {} as Scale<Hsl>)
}

export function generateRootStyleFromScales(scales: Scale[], keys: string[], space: ColorSpace, style: ColorStyle): string {
    const wrapper = STYLE_WRAPPERS.get(style);
    if (!wrapper) return '';

    let content = '';

    scales.forEach((scale: Scale, i: number) => {
        content += generateStyleFromScale(scale, space, style, keys[i]);
    });

    if (style === 'json') content = content.replace(/,(\s*)$/, '$1');

    return wrapper(content);
}

export function generateStyleFromScale(scale: Scale, space: ColorSpace, style: ColorStyle, key: string): string {
    const schema: string | undefined = STYLE_SCHEMAS.get(style);

    if (!schema) return '';

    switch (space) {
        case 'oklch':
            return Object.entries(scale as Scale<Oklch>).reduce((acc: string, [k, v]: [string, Oklch]) => {
                const value = `oklch(${v.l.toFixed(3)} ${v.c.toFixed(3)} ${v.h.toFixed(3)})`;
                acc += replaceTokens(schema, { key: `${key}-${k}`, value });
                return acc;
            }, '');

        case 'rgb':
            return Object.entries(convertToRgbScale(scale)).reduce((acc: string, [k, v]: [string, Rgb]) => {
                const value = `rgb(${v.r} ${v.g} ${v.b})`;
                acc += replaceTokens(schema, { key: `${key}-${k}`, value });
                return acc;
            }, '');


        case 'hsl':
            return Object.entries(convertoHslScale(scale)).reduce((acc: string, [k, v]: [string, Hsl]) => {
                const value = `hsl(${v.h} ${v.s} ${v.l})`;
                acc += replaceTokens(schema, { key: `${key}-${k}`, value });
                return acc;
            }, '');

        default:
            return Object.entries(convertToHexScale(scale)).reduce((acc: string, [k, v]: [string, Hex]) => {
                const value = `${v}`;
                acc += replaceTokens(schema, { key: `${key}-${k}`, value });
                return acc;
            }, '');
    }
}

function replaceTokens(template: string, values: Record<string, string>) {
    return template.replace(/{{(.*?)}}/g, (_, key) => {
        return values[key.trim()] ?? '';
    });
}

export function generateStyleVariablesFromScales(scales: Scale[], variables: string[]): Record<string, string> {
    return scales.reduce((acc: Record<string, string>, scale: Scale, i: number) => {
        Object.assign(acc, generateStyleVariablesFromScale(scale, variables[i]));
        return acc;
    }, {});
}

export function generateStyleVariablesFromScale(scale: Scale, variable: string): Record<string, string> {
    return Object.entries(scale).reduce((acc: Record<string, string>, [key, oklch]: [string, Oklch]) => {
        acc[`--${variable}-${key}`] = `oklch(${oklch.l.toFixed(3)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(3)})`;
        return acc;
    }, {})
}