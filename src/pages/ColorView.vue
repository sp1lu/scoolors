<script setup lang='ts'>
/* Dependencies */
import { computed, ref, watch } from 'vue'

/* Types */
import type { ColorStyle, ColorSpace } from '../features/color'

/* Config */
import { COLOR_SPACES, COLOR_STYLES, convertToHexScale, generateStyleVariablesFromScales } from '../features/color'

/* Model */
import { generateColorScale, generateNeutralScale, hexToOklch, generateRootStyleFromScales } from '../features/color'
import { ThemeToggle, useTheme } from '../features/theme'

/* UI */
import { ColorPicker, ColorScale, StyleEditor } from '../features/color'
import { Footer, Header, Radio, Select } from '../shared/ui'

/* Refs */
const color = ref('#3584e4');
const colorSpace = ref<ColorSpace>(COLOR_SPACES[0]);
const colorStyle = ref<ColorStyle>(COLOR_STYLES[0]);

/* Composables */
const { setStyle } = useTheme();

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
</script>

<style>
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 450px;
}

.dialog-toggle {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 32px;
    width: 32px;
    margin: 0;
    padding: 0;
}

.dialog-toggle__icon {
    display: flex;
    height: 100%;
    width: 100%;
    mask-image: url('/icons/download_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
    mask-size: contain;
    background-color: var(--neutral-900);
}

.dialog {
    position: relative;
    padding: 0;
    border: 1px solid var(--neutral-300);
    border-radius: 8px;

    &::backdrop {
        background-color: oklch(from var(--primary-900) l c h / .5);
    }
}

.dialog-close {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 9;
    height: 20px;
    width: 20px;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
}

.dialog-close__icon {
    display: flex;
    height: 100%;
    width: 100%;
    mask-image: url('/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
    mask-size: contain;
    background-color: var(--neutral-900);
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
    font-weight: 500;
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
            <ColorScale class="primary-scale" :scale="convertToHexScale(primaryScale)" />
            <div class="content-center">
                <div class="color-picker-wrapper">
                    <ColorPicker class="color-picker" :color="color" @color-changed="onColorChanged" />
                </div>
                <button type="button" class="dialog-toggle" commandfor="code-dialog" command="show-modal">
                    <span class="dialog-toggle__icon"></span>
                </button>
            </div>
            <ColorScale class="neutral-scale" :scale="convertToHexScale(neutralScale)" />
        </div>
        <Footer>
            <template #center>
                © {{ new Date().getFullYear() }} C00LORS
                <a href="https://daviderivolta.com/" target="_blank">Davide Rivolta</a>
                <a href="https://github.com/sp1lu/coolors" target="_blank">GitHub</a>
            </template>
        </Footer>
        <dialog id="code-dialog" class="dialog">
            <button type="button" class="dialog-close" commandfor="code-dialog" command="close">
                <span class="dialog-close__icon"></span>
            </button>
            <div class="dialog__content">
                <p class="title">Export tokens</p>
                <Radio :values="COLOR_STYLES" @radio-changed="onStyleChanged"></Radio>
                <Select :label="'Color space'" :values="COLOR_SPACES" @value-changed="onSpaceChanged"></Select>
            </div>
            <StyleEditor class="style-editor" :text="styleScale" :language="colorStyle" />
        </dialog>
    </div>
</template>