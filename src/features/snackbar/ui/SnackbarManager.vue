<script setup lang='ts'>
/* Dependencies */
import { TransitionGroup } from 'vue'

/* Models */
import { useSnackbars } from '../model'

/* Components */
import { AppSnackbar } from '.'

/* Model */
const { snackbars, removeSnackbar } = useSnackbars();
</script>

<style>
.snackbar-manager {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.snackbars-enter-active,
.snackbars-leave-active {
    transition: all 0.5s ease;
}

.snackbars-enter-from,
.snackbars-leave-to {
    opacity: 0;
    transform: translateX(24px);
}
</style>

<template>
    <TransitionGroup name="snackbars" tag="div" class="snackbar-manager">
        <AppSnackbar v-for="{ id, text } in snackbars" :key="id" :id="id" :text="text"
            @remove-snackbar="removeSnackbar"></AppSnackbar>
    </TransitionGroup>
</template>