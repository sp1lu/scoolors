<script setup lang='ts'>
/* Composable */
import { useTheme } from '../model/useTheme'

/* Store */
const { theme, toggleTheme } = useTheme();

/* Methods */
const onInputChange = () => toggleTheme();
</script>

<style>
.toggle-wrapper {
    cursor: pointer;
    position: relative;
    display: block;
    width: 48px;
    height: 24px;
    background-color: var(--neutral-400);
    border-radius: 24px;
    overflow: hidden;
}

.toggle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border-radius: 100%;
    background-color: var(--neutral-100);
    transition: .4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.toggle--light {
    transform: translate(26px, -50%);
}

.toggle--dark {
    position: relative;
    transform: translate(4px, -50%);
}

.toggle--dark::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 8px;
    width: 20px;
    height: 20px;
    transform: translateY(-50%);
    background-color: var(--neutral-400);
    border-radius: 100%;
}
</style>

<template>
    <div class="theme-toggle">
        <input type="checkbox" hidden id="theme-toggle" @change="onInputChange">
        <label for="theme-toggle" class="toggle-wrapper">
            <div class="toggle" :class="`toggle--${theme}`"></div>
        </label>
    </div>
</template>