/* Dependencies */
import { ref, watch } from 'vue'

/* Types */
import type { Theme } from '../types'

/* Services */
import { setHighlightTheme } from './highlight_theme.service'

/* Store */
const theme = ref<Theme>('light');

watch(theme, (newTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    // document.documentElement.style.setProperty('color-scheme', newTheme);
    setHighlightTheme(newTheme);
}, { immediate: true });

/* Composable */
export function useTheme() {
    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
    }

    const setStyle = (style: Record<string, string>) => {
        Object.entries(style).forEach(([k, v]: [string, string]) => {
            document.documentElement.style.setProperty(k, v);
        });
    }

    return {
        theme,
        toggleTheme,
        setStyle
    }
}