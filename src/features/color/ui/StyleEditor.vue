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
});

/* Emitters */
const emit = defineEmits<{
    (e: 'text-copied', value: string): void
}>();

/* Methods */
const onBtnClick = (text: string) => {
    emit('text-copied', text);
}
</script>

<template>
    <div class="style-editor">
        <pre class="style-editor__text hljs" v-html="highlighted"></pre>
        <button type="button" class="secondary btn-icon action-copy" @click="onBtnClick(text)">
            <span class="action-copy__icon"></span>
            <span class="action-copy__label">Copy tokens</span>
        </button>
    </div>
</template>

<style lang='scss'>
@use '@/shared/styles' as *;

.style-editor {
    position: relative;
    min-width: 496px;
}

.style-editor__text {
    margin: 0;
    padding: 48px;
}

.action-copy {
    position: absolute;
    bottom: 8px;
    right: 8px;
    border-radius: 4px
}

.action-copy__icon {
    @include mask-icon('/icons/content_copy_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg', 16px);
    background-color: var(--neutral-900);
}

@media screen and (max-width: 992px) {
    .style-editor {
        min-width: min-content;
    }
}
</style>