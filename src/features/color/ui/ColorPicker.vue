<script setup lang='ts'>
/* Inputs */
const props = defineProps<{
    color: string
}>();

/* Output */
const emit = defineEmits<{
    (e: 'color-changed', value: string): void,
    (e: 'text-copied', value: string): void
}>();

/* Methods */
const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    emit('color-changed', value);
}

const onBtnClick = (text: string) => {
    emit('text-copied', text);
}
</script>

<template>
    <div class="color-picker">
        <input type="color" id="color-picker" class="color-picker__input" :value="props.color" @input="onInput">
        <label for="color-picker" class="color-picker__label pulse"
            :style="{ backgroundColor: props.color, '--shadow-color': props.color }">
        </label>
        <button type="button" class="btn-icon color-value" @click="onBtnClick(color)">
            <span class="color-value__label">{{ props.color.toUpperCase() }}</span>
            <span class="color-value__icon"></span>
        </button>
    </div>
</template>

<style lang='scss'>
@use '@/shared/styles' as *;

.color-picker {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
}

.color-picker__input {
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    visibility: hidden;
}

.color-picker__label {
    cursor: pointer;
    display: flex;
    width: 128px;
    height: 128px;
    border-radius: 100%;
    box-shadow: 0px 0px 1px 1px #0000001a;
}

.color-value {
    background-color: transparent;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid var(--primary-100);
    }

    &:active {
        background-color: var(--primary-100);
    }
}

.color-value__label {
    font-size: 1.33rem;
}

.color-value__icon {
    @include mask-icon('/icons/content_copy_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg', 18px);
    background-color: var(--neutral-500);
}

.pulse {
    animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
    0% {
        box-shadow: 0 0 0 0px var(--shadow-color);
    }

    100% {
        box-shadow: 0 0 0 64px transparent;
    }
}

@media screen and (max-width: 992px) {
    .color-picker__label {
        width: 25dvw;
        height: 25dvw;
    }
}

@media screen and (max-width: 576px) {
    .color-picker__label {
        width: 40dvw;
        height: 40dvw;
    }
}
</style>