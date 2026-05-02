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
/* .primary-scale {
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
} */

/* .color-view,
.color-scales {
    display: flex;
    align-items: center;
    justify-content: space-between;
} */

.color-view {
    width: 100dvw;
}

.color-picker-wrapper,
.color-scales,
.style-editor {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
}

.color-picker-wrapper {
    left: 50%;
}

.color-scales {
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.style-editor {
    right: 0;
}

@media screen and (max-width: 768px) {
    .color-view {
        display: flex;
        flex-direction: column;
    }

    .color-picker-wrapper,
    .color-scales,
    .style-editor {
        position: unset;
        transform: none;
    }

    .color-picker-wrapper {
        order: 1;
        display: block;
    }

    .color-scales {
        order: 2;
        display: flex;
        flex-direction: column;
    }

    .style-editor {
        order: 3;
    }
}
</style>

<template>
    <div class="color-view">
        <div class="color-scales">
            <ColorScale class="primary-scale" :scale="primaryScale" />
            <ColorScale class="neutral-scale" :scale="neutralScale" />
        </div>
        <div class="color-picker-wrapper">
            <ColorPicker class="color-picker" :color="color" @color-changed="onColorChanged" />
        </div>
        <StyleEditor class="style-editor" :text="styleScale" :language="colorStyle">
            <ColorInput :values="COLOR_SPACES" @value-changed="onSpaceChanged" />
            <ColorInput :values="COLOR_STYLES" @value-changed="onStyleChanged" />
        </StyleEditor>
    </div>
</template>