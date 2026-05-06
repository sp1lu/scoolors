<script setup lang='ts'>
/* Dependencies */
import { computed, ref, watch } from 'vue'

/* Types */
import type { ColorStyle, ColorSpace } from '../features/color'

/* Config */
import { COLOR_SPACES, COLOR_STYLES, convertToHexScale, generateStyleVariablesFromScales } from '../features/color'

/** Lib */
import { copyToClipboard } from '../shared/lib'

/* Model */
import { generateColorScale, generateNeutralScale, hexToOklch, generateRootStyleFromScales } from '../features/color'
import { ThemeToggle, useTheme } from '../features/theme'
import { useSnackbars } from '../features/snackbar'

/* UI */
import { ColorPicker, ColorScale, StyleEditor } from '../features/color'
import { AppDialog, Footer, Header, Radio, Select } from '../shared/ui'

/* Refs */
const color = ref('#3584e4');
const colorSpace = ref<ColorSpace>(COLOR_SPACES[0]);
const colorStyle = ref<ColorStyle>(COLOR_STYLES[0]);

/* Composables */
const { setStyle } = useTheme();
const { addSnackbar } = useSnackbars()

/* Computed */
const oklch = computed(() => hexToOklch(color.value));
const primaryScale = computed(() => generateColorScale(oklch.value));
const neutralScale = computed(() => generateNeutralScale(oklch.value));
const styleScale = computed(() => generateRootStyleFromScales([primaryScale.value, neutralScale.value], ['primary', 'neutral'], colorSpace.value, colorStyle.value));

watch([primaryScale, neutralScale], (scales) => {
    const style = generateStyleVariablesFromScales(scales, ['primary', 'neutral']);
    setStyle(style);
}, { immediate: true });

/* Methods */
const onColorChanged = (newColor: string) => {
    color.value = newColor;
}

const onStyleChanged = (selectedStyle: string) => {
    colorStyle.value = selectedStyle as ColorStyle;
}

const onSpaceChanged = (selectedSpace: string) => {
    colorSpace.value = selectedSpace as ColorSpace;
}

const onCopyClicked = (text: string) => {
    copyToClipboard(text)
        .then(() => addSnackbar('\u{1F389} Copied!'))
}
</script>

<style lang='scss'>
@use '@/shared/styles' as *;

.color-view {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100dvw;
    min-height: 100dvh;
    padding: 0 4%;
}

.color-view__content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.content-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
}

.dialog-toggle__icon {
    @include mask-icon('/icons/download_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg', 16px);
    background-color: var(--primary-500);
}

.dialog__content {
    padding: 24px;
}

.logo {
    color: var(--primary-500);
}

.title {
    margin: 0;
    font-size: 1.33rem;
    font-weight: 600;
}

.radio-group {
    margin: 16px 0;
}

@media screen and (max-width: 768px) {
    .color-view__content {
        flex-direction: column;
        justify-content: start;
    }

    .color-picker-wrapper {
        order: 1;
    }

    .primary-scale {
        order: 2;
    }

    .neutral-scale {
        order: 3;
    }
}
</style>

<template>
    <div class="color-view">
        <Header>
            <template #center>
                <span class="logo">C00LORS</span>
            </template>
            <template #right>
                <ThemeToggle />
            </template>
        </Header>
        <div class="color-view__content">
            <ColorScale class="primary-scale" :scale="convertToHexScale(primaryScale)" @text-copied="onCopyClicked" />
            <div class="content-center">
                <ColorPicker class="color-picker" :color="color" @color-changed="onColorChanged" @text-copied="onCopyClicked" />
                <button type="button" class="primary btn-icon dialog-toggle" commandfor="code-dialog"
                    command="show-modal">
                    <span class="dialog-toggle__icon"></span>
                    <span class="dialog-toggle__label">Export tokens</span>
                </button>
            </div>
            <ColorScale class="neutral-scale" :scale="convertToHexScale(neutralScale)" @text-copied="onCopyClicked" />
        </div>
        <Footer>
            <template #center>
                © {{ new Date().getFullYear() }} C00LORS
                <a href="https://daviderivolta.com/" target="_blank">Davide Rivolta</a>
                <a href="https://github.com/sp1lu/coolors" target="_blank">GitHub</a>
            </template>
        </Footer>
        <AppDialog>
            <div class="dialog__content">
                <p class="title">Export tokens</p>
                <Radio :values="COLOR_STYLES" @radio-changed="onStyleChanged"></Radio>
                <Select :label="'Color space'" :values="COLOR_SPACES" @value-changed="onSpaceChanged"></Select>
            </div>
            <StyleEditor class="style-editor" :text="styleScale" :language="colorStyle" @text-copied="onCopyClicked" />
        </AppDialog>
    </div>
</template>