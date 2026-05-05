<script setup lang='ts'>
/* Types */
import type { Hex, Scale } from '../types'

/* Props */
const props = defineProps<{
    scale: Scale<Hex>
}>();
</script>

<style>
.color-scale {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.color-scale__element {
    cursor: pointer;
    width: 320px;
    height: 48px;
    display: grid;
    grid-template-columns: 1fr 4fr 2fr;
    border: 1px solid var(--neutral-500);
    border-radius: 8px;
}

.color-scale__element > * {
    display: flex;
    justify-content: center;
    align-items: center;
}

.element__step {
    background-color: oklch(from var(--neutral-100) l c h / .25);
}

.element__color {
    background-color: var(--neutral-100);
    border-radius: 0 7px 7px 0;
}

.color-scale__element:nth-child(n+7) .element__step {
    color: var(--neutral-100);   
}

@media screen and (max-width: 768px) {
}
</style>

<template>
    <ul class="color-scale">
        <!-- <li class="color-scale__element" popovertarget="color-popover" v-for="(color, step) in scale" :key="step"
            :style="{ backgroundColor: `oklch(${color.l * 100}% ${color.c} ${color.h})`, borderColor: color.l === 1 && color.c === 0 && color.h === 0 ? 'whitesmoke' : 'transparent' }">
        </li> -->

        <li class="color-scale__element" v-for="(color, step) in scale" :style="{ backgroundColor: color }">
            <div class="element__step">{{ step }}</div>
            <div class="element__bg"></div>
            <div class="element__color">{{ color }}</div>
        </li>
    </ul>
</template>