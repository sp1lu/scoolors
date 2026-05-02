<script setup lang='ts'>
/* Dependencies */
import { computed } from 'vue'
import hljs from 'highlight.js'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import less from 'highlight.js/lib/languages/less'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/vs2015.css'

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
    /* width: 350px; */
}

.style-editor__text {
    /* white-space: pre; */
}

.yellow {
    color: yellow;
}
</style>

<template>
    <div class="style-editor">
        <pre class="style-editor__text hljs" v-html="highlighted"></pre>
        <div class="style-editor__actions">
            <button type="button" @click="onBtnClick(text)">COPY</button>
            <slot></slot>
        </div>
    </div>
</template>