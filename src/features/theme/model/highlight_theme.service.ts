/* Types */
import type { Theme } from '../types'

/* Config */
const THEME_ID: string = 'hljs-theme';

/* Service */
export const setHighlightTheme = (theme: Theme) => {
    const foundTheme: HTMLElement | null = document.getElementById(THEME_ID);
    if (foundTheme) foundTheme.remove();

    const link: HTMLLinkElement = document.createElement('link');
    link.id = THEME_ID;
    link.rel = 'stylesheet';
    link.href = theme === 'light' ?
        '/highlight/github.css' :
        '/highlight/vs2015.css'

    document.head.appendChild(link);
}