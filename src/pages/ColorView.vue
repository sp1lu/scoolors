<script setup lang='ts'>
/** Dependencies */
import { computed, ref, watch } from 'vue'

/* Model */
import { COLOR_SPACES, generateColorScale, generateNeutralScale, hexToOklch, type Scale } from '../features/color'

/* UI */
import { ColorInput, ColorPicker, ColorScale } from '../features/color'

/* Refs */
const color = ref('#3584e4');

/* Computed */
const oklch = computed(() => hexToOklch(color.value));
const primaryScale = computed(() => generateColorScale(oklch.value));
const neutralScale = computed(() => generateNeutralScale(oklch.value));

/* Watch */
watch(primaryScale, (s: Scale) => {
    console.log(s);    
})
/* Methods */
const onColorChanged = (newColor: string) => {
    color.value = newColor;
}

const onStyleChanged = (selectedStyle: string) => {
    console.log(selectedStyle);
}

const onSpaceChanged = (selectedSpace: string) => {
    console.log(selectedSpace);
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
    <ColorInput :values="['party', 'corporate', 'punk']" @value-changed="onStyleChanged" />
    <ColorPicker :color="color" @color-changed="onColorChanged" />
    <ColorInput :values="COLOR_SPACES" @value-changed="onSpaceChanged" />
    <ColorScale class="primary-scale" :scale="primaryScale" />
    <ColorScale class="neutral-scale" :scale="neutralScale" />
</template>