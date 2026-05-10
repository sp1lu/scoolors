<script setup lang='ts'>
/* Dependencies */
import { computed, ref, watch } from 'vue'

/* Types */
import type { ColorStyle, ColorSpace } from '../features/color'

/* Config */
import { COLOR_SPACES, COLOR_STYLES } from '../features/color'

/** Lib */
import { copyToClipboard } from '../shared/lib'

/* Model */
import { generateColorScale, generateNeutralScale, hexToOklch, generateRootStyleFromScales, convertToHexScale, createFavicon, generateStyleVariablesFromScales } from '../features/color'
import { useTheme } from '../features/theme'
import { useSnackbars } from '../features/snackbar'

/* UI */
import { AppLogo, ColorPicker, ColorScale, StyleEditor } from '../features/color'
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
    createFavicon(convertToHexScale(scales[0]));
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

<template>
    <div class="view color-view">
        <Header>
            <template #left>
                <AppLogo />
            </template>
            <template #right>
                <RouterLink to="/about">About</RouterLink>
            </template>
        </Header>
        <div class="color-view__content">
            <ColorScale class="primary-scale" :scale="convertToHexScale(primaryScale)" @text-copied="onCopyClicked" />
            <div class="content-center">
                <ColorPicker class="color-picker" :color="color" @color-changed="onColorChanged"
                    @text-copied="onCopyClicked" />
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
                <div class="footer__credits">
                    <span>© {{ new Date().getFullYear() }} scoolors</span><span>&#8226;</span>
                    <a href="https://daviderivolta.com/" target="_blank">Davide Rivolta</a><span>&#8226;</span>
                    <a href="https://github.com/sp1lu/coolors" target="_blank">GitHub</a>
                </div>
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

<style lang='scss'>
@use '@/shared/styles' as *;

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

.title {
    margin: 0;
    font-size: 1.33rem;
    font-weight: 600;
}

.radio-group {
    margin: 16px 0;
}

.footer__credits {
    display: flex;
    gap: 4px;
}

@media screen and (max-width: 992px) {
    .color-view__content {
        flex-direction: column;
        justify-content: start;
        padding: 10% 0;
    }

    .content-center {
        order: 1;
        margin: 0 0 48px 0;
        gap: 16px;
        width: 100%;
    }

    .primary-scale {
        order: 2;
        margin: 0 0 8px 0;
    }

    .neutral-scale {
        order: 3;
    }

    .dialog-toggle {
        height: 40px !important;
        width: 100%;
    }
}
</style>