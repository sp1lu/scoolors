<script setup lang='ts'>
/* Dependencies */
import { computed, ref, watch } from 'vue'

/* Types */
import type { ColorStyle, ColorSpace } from '../features/color'

/* Config */
import { COLOR_SPACES, COLOR_STYLES, generateStyleVariablesFromScales } from '../features/color'

/* Model */
import { generateColorScale, generateNeutralScale, hexToOklch, generateRootStyleFromScales } from '../features/color'

/* UI */
import { ColorInput, ColorPicker, ColorScale, StyleEditor } from '../features/color'
import { ThemeToggle, useTheme } from '../features/theme'
import { Footer, Header } from '../shared/ui'

/* Refs */
const color = ref('#3584e4');
const colorSpace = ref<ColorSpace>(COLOR_SPACES[0]);
const colorStyle = ref<ColorStyle>(COLOR_STYLES[0]);

/* COmposables */
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
}

.dialog-toggle__icon {
    display: flex;
    height: 24px;
    width: 24px;
    mask-image: url('/icons/download_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
    background-color: var(--neutral-900);
}

.dialog {
    position: relative;
    padding: 0;
    border: 1px solid var(--neutral-300);
    border-radius: 8px;

    &::backdrop {
        background-color: oklch(from var(--neutral-900) l c h / .5);
    }
}

.dialog__close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
}

.logo {
    color: var(--primary-500);
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
            <ColorScale class="primary-scale" :scale="primaryScale" />
            <div class="content-center">
                <div class="color-picker-wrapper">
                    <ColorPicker class="color-picker" :color="color" @color-changed="onColorChanged" />
                </div>
                <button type="button" class="dialog-toggle" commandfor="code-dialog" command="show-modal">
                    <span class="dialog-toggle__icon"></span>
                </button>
            </div>
            <ColorScale class="neutral-scale" :scale="neutralScale" />
        </div>
        <Footer>
            <template #center>© {{ new Date().getFullYear() }} C00lors&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;<a
                    href="https://daviderivolta.com/" target="_blank">Davide
                    Rivolta</a>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;<a href="https://github.com/sp1lu/coolors"
                    target="_blank">GitHub</a>
            </template>
        </Footer>
        <dialog id="code-dialog" class="dialog">
            <button type="button" class="dialog__close" commandfor="code-dialog" command="close">CLOSE</button>
            <StyleEditor class="style-editor" :text="styleScale" :language="colorStyle">
                <ColorInput :values="COLOR_SPACES" @value-changed="onSpaceChanged" />
                <ColorInput :values="COLOR_STYLES" @value-changed="onStyleChanged" />
            </StyleEditor>
        </dialog>
    </div>
</template>