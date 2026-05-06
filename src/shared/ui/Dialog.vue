<style>
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
</style>

<template>
    <dialog id="code-dialog" class="dialog">
        <button type="button" class="dialog-close" commandfor="code-dialog" command="close">
            <span class="dialog-close__icon"></span>
        </button>
        <slot></slot>
    </dialog>
</template>