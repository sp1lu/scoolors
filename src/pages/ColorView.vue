<script setup lang='ts'>
/** Dependencies */
import { ref } from 'vue'

/* Types */
import type { Oklch, Scale } from '../features/color'

/* Model */
import { createScale, hexToOklch } from '../features/color'

/* UI */
import { ColorPicker, ColorScale } from '../features/color'

/* Refs */
const scale = ref<Scale>({});
/* Methods */
const onColorChanged = (color: string) => {
    const oklch: Oklch = hexToOklch(color);
    scale.value = createScale(oklch);
}
</script>

<template>
    <ColorPicker @color-changed="onColorChanged" />
    <ColorScale :scale="scale" />
</template>