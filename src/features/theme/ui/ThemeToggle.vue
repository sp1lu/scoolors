<script setup lang='ts'>
/* Composable */
import { useTheme } from '../model/useTheme'

const { toggleTheme } = useTheme();

/* Methods */
const onInputChange = () => toggleTheme();
</script>

<style></style>

<template>
    <div class="theme-toggle">
        <input type="checkbox" @change="onInputChange">
    </div>
</template>