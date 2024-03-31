<script lang="ts">
    export let show: boolean = false;

    let dialog: HTMLDialogElement;

    $: if (dialog) {
        if (show) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && show && (show = false)}
                on:click={(e) => show && e.target === dialog && (show = false)}
/>

<dialog bind:this={dialog}>
    <slot name="header"/>
    <hr />
    <slot/>
</dialog>

<style lang="scss">
    dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 1rem;
        background-color: #0005;
        z-index: 1000;
        color: white;
        min-width: 45vw;
        flex-direction: column;
        gap: 1em;

        &[open] {
            display: flex;
        }
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }

    hr {
        margin: 0;
    }
</style>