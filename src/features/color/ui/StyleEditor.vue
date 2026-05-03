<script setup lang='ts'>
/* Dependencies */
import { computed } from 'vue'
import hljs from 'highlight.js'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import less from 'highlight.js/lib/languages/less'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('sass', scss);
hljs.registerLanguage('less', less);
hljs.registerLanguage('json', json);

/* Props */
const props = defineProps<{
    text: string,
    language?: string
}>();

const highlighted = computed(() => {
    try {
        return hljs.highlight(props.text, { language: props.language ?? 'css' }).value;
    } catch (error) {
        return props.text;
    }
})

/* Methods */
const onBtnClick = (text: string) => {
    navigator.clipboard.writeText(text)
}
</script>

<style>
.style-editor {
    position: relative;
    min-width: 500px;
}

.style-editor__text {
    margin: 0;
    padding: 48px;
}

.style-editor__actions {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>

<template>
    <div class="style-editor">
        <pre class="style-editor__text hljs" v-html="highlighted"></pre>
        <div class="style-editor__actions">
            <slot></slot>
            <button type="button" @click="onBtnClick(text)">COPY</button>
        </div>
    </div>
</template>