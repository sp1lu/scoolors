import type { Oklch } from "../types";

export function hexToRgb(hex: string): { r: number, g: number, b: number } {
    const clean: string = hex.replace('#', '');

    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);

    return { r, g, b };
}

export function srgbToLinearRgb(c: number) {
    c = c / 255;
    return c <= 0.04045 ?
        c / 12.92 :
        Math.pow((c + 0.055) / 1.055, 2.4);
}

export function rgbToOklab({ r, g, b }: { r: number; g: number; b: number }): { L: number, A: number, B: number } {
    const rl = srgbToLinearRgb(r)
    const gl = srgbToLinearRgb(g)
    const bl = srgbToLinearRgb(b)

    const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl
    const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl
    const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl

    const l_ = Math.cbrt(l)
    const m_ = Math.cbrt(m)
    const s_ = Math.cbrt(s)

    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    const A = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

    return { L, A, B }
}

export function oklabToOklch({ L, A, B }: { L: number; A: number; B: number }): { l: number, c: number, h: number } {
    const C = Math.sqrt(A * A + B * B);
    let H = Math.atan2(B, A) * (180 / Math.PI);

    if (H < 0) H += 360

    return { l: L, c: C, h: H }
}

export function oklchToOklab({ l, c, h }: { l: number; c: number; h: number }) {
    const hr = (h * Math.PI) / 180;

    return {
        L: l,
        A: c * Math.cos(hr),
        B: c * Math.sin(hr),
    };
}

export function oklabToRgb({ L, A, B }: { L: number; A: number; B: number }) {
    const l_ = L + 0.3963377774 * A + 0.2158037573 * B;
    const m_ = L - 0.1055613458 * A - 0.0638541728 * B;
    const s_ = L - 0.0894841775 * A - 1.2914855480 * B;

    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;

    let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    function linearToSrgb(x: number) {
        return x <= 0.0031308
            ? 12.92 * x
            : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
    }

    r = linearToSrgb(r);
    g = linearToSrgb(g);
    b = linearToSrgb(b);

    return {
        r: Math.round(Math.min(Math.max(0, r), 1) * 255),
        g: Math.round(Math.min(Math.max(0, g), 1) * 255),
        b: Math.round(Math.min(Math.max(0, b), 1) * 255),
    };
}

export function oklchToHsl(color: Oklch): { h: number; s: number; l: number } {
    // OKLCH → OKLab
    const hr = (color.h * Math.PI) / 180;
    const L = color.l;
    const A = color.c * Math.cos(hr);
    const B = color.c * Math.sin(hr);

    // OKLab → RGB
    const l_ = L + 0.3963377774 * A + 0.2158037573 * B;
    const m_ = L - 0.1055613458 * A - 0.0638541728 * B;
    const s_ = L - 0.0894841775 * A - 1.2914855480 * B;

    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;

    let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    function linearToSrgb(x: number) {
        return x <= 0.0031308
            ? 12.92 * x
            : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
    }

    r = linearToSrgb(r);
    g = linearToSrgb(g);
    b = linearToSrgb(b);

    // clamp
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);

    // RGB → HSL
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    let sVal = 0;
    const lVal = (max + min) / 2;

    const d = max - min;

    if (d !== 0) {
        sVal = d / (1 - Math.abs(2 * lVal - 1));

        switch (max) {
            case r:
                h = ((g - b) / d) % 6;
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h *= 60;
        if (h < 0) h += 360;
    }

    return {
        h: Math.round(h),
        s: Math.round(sVal * 100),
        l: Math.round(lVal * 100),
    };
}