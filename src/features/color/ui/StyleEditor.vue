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

.action-copy {
    height: 20px;
    width: 20px;
    margin: 0;
    padding: 0;
}

.action-copy__icon {
    display: flex;
    height: 100%;
    width: 100%;
    mask-image: url('/icons/content_copy_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
    mask-size: contain;
    background-color: var(--neutral-900);
}
</style>

<template>
    <div class="style-editor">
        <pre class="style-editor__text hljs" v-html="highlighted"></pre>
        <div class="style-editor__actions">
            <slot></slot>
            <button type="button" class="action-copy" @click="onBtnClick(text)">
                <span class="action-copy__icon"></span>
            </button>
        </div>
    </div>
</template>