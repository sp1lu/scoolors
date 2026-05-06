<script setup lang='ts'>
/* Props */
const props = defineProps<{
    id: string,
    text: string
}>();
</script>

<template>
    <div class="snackbar">
        <p>{{ text }}</p>
    </div>
</template>