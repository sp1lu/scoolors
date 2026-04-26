<script setup lang='ts'>
/* Types */
import type { Scale } from '../types'

/* Props */
const props = defineProps<{
    scale: Scale
}>();

</script>

<style>
.color-scale__element {
    width: 50px;
    height: 50px;
}
</style>

<template>
    <ul class="color-scale">
        <li class="color-scale__element" v-for="(color, step) in scale" :key="step"
            :style="{ backgroundColor: `oklch(${color.l * 100}% ${color.c} ${color.h})` }"></li>
    </ul>
</template>