<script setup lang='ts'>
/* Dependencies */
import { computed, ref } from 'vue'

/* Types */
import type { ColorStyle, ColorSpace } from '../features/color'

/* Config */
import { COLOR_SPACES, COLOR_STYLES } from '../features/color'

/* Model */
import { generateColorScale, generateNeutralScale, hexToOklch, generateRootStyleFromScales } from '../features/color'

/* UI */
import { ColorInput, ColorPicker, ColorScale, StyleEditor } from '../features/color'

/* Refs */
const color = ref('#3584e4');
const colorSpace = ref<ColorSpace>(COLOR_SPACES[0]);
const colorStyle = ref<ColorStyle>(COLOR_STYLES[0]);

/* Computed */
const oklch = computed(() => hexToOklch(color.value));
const primaryScale = computed(() => generateColorScale(oklch.value));
const neutralScale = computed(() => generateNeutralScale(oklch.value));
const styleScale = computed(() => generateRootStyleFromScales([primaryScale.value, neutralScale.value], ['primary', 'neutral'], colorSpace.value, colorStyle.value));

/* Methods */
const onColorChanged = (newColor: string) => {
    color.value = newColor;
}

const onStyleChanged = (selectedStyle: string) => {
    colorStyle.value = selectedStyle as ColorStyle;
}

const onSpaceChanged = (selectedSpace: string) => {
    colorSpace.value = selectedSpace as ColorSpace;
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
    left: 80px;
    transform: translateY(-50%);
}

.style-editor {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
}
</style>

<template>
    <ColorPicker :color="color" @color-changed="onColorChanged" />
    <ColorInput :values="COLOR_SPACES" @value-changed="onSpaceChanged" />
    <ColorInput :values="COLOR_STYLES" @value-changed="onStyleChanged" />
    <ColorScale class="primary-scale" :scale="primaryScale" />
    <ColorScale class="neutral-scale" :scale="neutralScale" />
    <StyleEditor class="style-editor" :text="styleScale" />
</template>