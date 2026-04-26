<script setup lang='ts'>
/* Dependencies */
import { ref } from 'vue'

/* Config */
import { COLOR_SPACES } from '../config'

const selectedSpace = ref<string>();
</script>

<template>
    <select v-model="selectedSpace">
         <option v-for="space in COLOR_SPACES" :key="space.id" :value=space.id>{{ space.id }}</option>
    </select>
</template>