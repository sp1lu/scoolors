<template>
    <dialog id="code-dialog" class="dialog">
        <button type="button" class="dialog-close" commandfor="code-dialog" command="close">
            <span class="dialog-close__icon"></span>
        </button>
        <slot></slot>
    </dialog>
</template>

<style lang='scss'>
@use '@/shared/styles' as *;

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
    top: 4px;
    right: 4px;
    z-index: 9;
    height: 28px;
    width: 28px;
    margin: 0;
    padding: 0;
    border-radius: 8px;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: var(--neutral-200);
    }
    
    &:active {
        background-color: var(--neutral-300);
    }
}

.dialog-close__icon {
    /* display: flex;
    height: 16px;
    width: 16px;
    mask-image: url('/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
    mask-size: contain; */
    @include mask-icon('/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg', 16px);
    background-color: var(--neutral-900);
}

@media screen and (max-width: 992px) {
    .dialog {
        width: 100%;
        margin: auto 4%;
    }
}
</style>