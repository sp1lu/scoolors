/* Dependencies */
import { ref } from 'vue'

/* Types */
import type { Snackbar } from '../types'

/* Refs */
const snackbars = ref<Snackbar[]>([]);

/* Composable */
export function useSnackbars() {
    const addSnackbar = (text: string): void => {
        const id: string = `${text.replaceAll(' ', '_')}_${new Date().getTime()}`;
        snackbars.value.push({ id, text });
        setTimeout(() => removeSnackbar(id), 3000);
    }

    const removeSnackbar = (id: string): void => {
        snackbars.value = snackbars.value.filter((snackbar: Snackbar) => snackbar.id !== id);
    }

    return {
        snackbars,
        addSnackbar,
        removeSnackbar
    }
}