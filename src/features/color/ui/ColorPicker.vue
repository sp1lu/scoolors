<!--#region script -->
<script setup lang='ts'>
/* Inputs */
const props = defineProps<{
    color: string
}>();

/* Output */
const emit = defineEmits<{
    (e: 'color-changed', value: string): void
}>();

/* Methods */
const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    emit('color-changed', value);
}
</script>
<!-- #endregion -->

<!-- #region style -->
<style>
.color-picker {
    position: relative;
    width: 128px;
    height: 128px;
}

.color-picker__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    visibility: hidden;
    opacity: 0;
}

.color-picker__label {
    cursor: pointer;
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    box-shadow: 0px 0px 1px 1px #0000001a;
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
</style>
<!-- #endregion -->

<!--#region template -->
<template>
    <div class="color-picker">
        <input type="color" id="color-picker" class="color-picker__input" :value="props.color" @input="onInput">
        <label for="color-picker" class="color-picker__label pulse"
            :style="{ backgroundColor: props.color, '--shadow-color': props.color }"></label>
    </div>
</template>
<!-- #endregion -->