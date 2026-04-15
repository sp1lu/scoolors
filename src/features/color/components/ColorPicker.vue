<!--#region script -->
<script setup lang='ts'>
// Dependencies
import { ref } from 'vue'

// Refs
const color = ref('#ff0000');

</script>
<!-- #endregion -->

<!-- #region style -->
<style>
.color-picker {
    position: relative;
}

.color-picker__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    visibility: hidden;
    opacity: 0;
}

.color-picker__label {
    display: flex;
    width: 64px;
    height: 64px;
    border-radius: 100%;
    background-color: red;
}
</style>
<!-- #endregion -->

<!--#region template -->
<template>
    <div class="color-picker">
        <input type="color" id="color-picker" class="color-picker__input" v-model="color">
        <label for="color-picker" class="color-picker__label" :style="{ backgroundColor: color }"></label>
    </div>
</template>
<!-- #endregion -->