<script setup lang='ts'>
/* Props */
const { id, text } = defineProps<{
    id: string,
    text: string
}>();

/* Emit */
const emit = defineEmits<{
    (e: 'remove-snackbar', id: string): void
}>();

/* Methods */
const onBtnClick = () => emit('remove-snackbar', id);
</script>

<template>
    <div class="snackbar">
        <p class="snackbar__txt">{{ text }}</p>
        <button type="button" class="snackbar__action" @click="onBtnClick()">Close</button>
    </div>
</template>

<style lang='scss'>
@use '@/shared/styles' as *;

.snackbar {
    display: flex;
    align-items: center;
    color: var(--neutral-100);
    min-width: 300px;
    border-radius: 8px;
    background-color: var(--primary-900);
}

.snackbar__txt {
    flex: 1;
    margin: 0;
    padding: 8px 16px;
}

.snackbar__action {
    border: none;
    padding: 8px;
    margin: 8px;
    border-radius: 4px;
    color: var(--primary-500);
    font-weight: 500;
    background-color: transparent;

    &:hover {
        background-color: oklch(from var(--primary-800) l c h / .1);
    }

    &:active {
        background-color: oklch(from var(--primary-800) l c h / .25);
    }
}
</style>