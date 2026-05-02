<script setup lang='ts'>
/* Types */
import type { Scale } from '../types'

/* Props */
const props = defineProps<{
    scale: Scale
}>();
</script>

<style>
.color-scale {
    padding: 0;
    margin: 0;
    list-style: none;
}

.color-scale__element {
    width: 50px;
    height: 50px;
}

@media screen and (max-width: 768px) {
    .color-scale {
        display: flex;
    }
}
</style>

<template>
    <ul class="color-scale">
        <li class="color-scale__element" popovertarget="color-popover" v-for="(color, step) in scale" :key="step"
            :style="{ backgroundColor: `oklch(${color.l * 100}% ${color.c} ${color.h})` }"></li>
    </ul>
</template>