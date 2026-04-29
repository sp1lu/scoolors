<script setup lang='ts'>
/* Props */
const props = defineProps<{
    text: string
}>();

/* Methods */
const onBtnClick = (text: string) => {
    navigator.clipboard.writeText(text)
}
</script>

<style>
.style-editor {
    width: 350px;
}

.style-editor__text {
    white-space: pre;
}
</style>

<template>
    <div class="style-editor">
        <div class="style-editor__text">
            {{ text }}
        </div>
        <div class="style-editor__actions">
            <button type="button" @click="onBtnClick(text)">COPY</button>
        </div>
    </div>
</template>