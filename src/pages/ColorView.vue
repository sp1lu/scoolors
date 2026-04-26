<script setup lang='ts'>
/** Dependencies */
import { computed, ref } from 'vue'

/* Model */
import { generateColorScale, generateNeutralScale, hexToOklch } from '../features/color'

/* UI */
import { ColorInput, ColorPicker, ColorScale } from '../features/color'

/* Refs */
const color = ref('#3584e4');

/* Computed */
const oklch = computed(() => hexToOklch(color.value));
const primaryScale = computed(() => generateColorScale(oklch.value));
const neutralScale = computed(() => generateNeutralScale(oklch.value));

/* Methods */
const onColorChanged = (newColor: string) => {
    color.value = newColor;
}
</script>

<style>
.primary-scale {
    position: fixed;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

.neutral-scale {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
</style>

<template>
    <ColorPicker :color="color" @color-changed="onColorChanged" />
    <ColorInput />
    <ColorScale class="primary-scale" :scale="primaryScale" />
    <ColorScale class="neutral-scale" :scale="neutralScale" />
</template>