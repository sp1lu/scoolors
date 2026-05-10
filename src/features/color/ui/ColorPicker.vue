<script setup lang='ts'>
/* Inputs */
const { color } = defineProps<{
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

const onBtnClick = () => {
    emit('text-copied', color);
}
</script>

<template>
    <div class="color-picker">
        <input type="color" id="color-picker" class="color-picker__input" :value="color" @input="onInput">
        <label for="color-picker" class="color-picker__label pulse"
            :style="{ backgroundColor: color, '--shadow-color': color }">
        </label>

        <div class="color-value">
            <label for="color-picker" class="color-value__label">{{ color.toUpperCase() }}</label>
            <button type="button" class="color-value__btn" @click="onBtnClick">
                <span class="color-value__icon"></span>
            </button>
        </div>
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

.color-value,
.color-value__label,
.color-value__btn {
    display: flex;
    align-items: center;
    justify-content: center;
}

.color-value {
    height: 32px;
}

.color-value__label,
.color-value__btn {
    cursor: pointer;
}

.color-value__label {
    font-size: 1.33rem;
    height: 100%;
    padding: 0;
}

.color-value__btn {
    padding: 0;
    border: none;
    width: 32px;
    height: 32px;
    background-color: transparent;

    &:hover {
        border: 1px solid var(--primary-100);
    }

    &:active {
        background-color: var(--primary-100);
    }
}

.color-value__icon {
    @include mask-icon('/icons/content_copy_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg', 20px);
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