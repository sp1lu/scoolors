<script setup lang='ts'>
import { ColorPicker } from '../features/color'

const onColorChanged = (color: string) => {
    console.log(color);    
}
</script>

<template>
    <ColorPicker @color-changed="onColorChanged" />
</template>