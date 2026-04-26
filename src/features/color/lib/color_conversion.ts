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