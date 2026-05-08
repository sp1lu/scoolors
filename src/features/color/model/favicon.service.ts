/* Types */
import type { Hex, Scale } from '../types'

/* Service */
export function createFavicon(scale: Scale<Hex>) {
    const canvas = document.createElement('canvas');
    canvas.width = 96;
    canvas.height = 96;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors: Hex[] = Object.values(scale);

    ctx.beginPath();
    ctx.roundRect(4, 4, 88, 88, 18);
    ctx.clip();

    ctx.fillStyle = colors[2];
    ctx.fillRect(0, 0, 96, 32);

    ctx.fillStyle = colors[4];
    ctx.fillRect(0, 32, 96, 32);

    ctx.fillStyle = colors[6];
    ctx.fillRect(0, 64, 96, 32);

    const link = document.getElementById('favicon');
    if (!link) return;
    (link as HTMLLinkElement).href = canvas.toDataURL('image/png');
}