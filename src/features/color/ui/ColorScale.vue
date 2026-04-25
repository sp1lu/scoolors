<script setup lang='ts'>
/* Types */
import type { Scale } from '../types'

/* Props */
const props = defineProps<{
    scale: Scale
}>();

</script>

<template>
    <ul>
        <li v-for="(color, step) in scale" :key="step"
            :style="{ backgroundColor: `oklch(${color.l * 100}% ${color.c} ${color.h})` }"></li>
    </ul>
</template>