<template>
    <div class="deck-detail">
        <div class="deck-code">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .deck-detail {
        width: 500px;
        /* height: 100px; */
        word-wrap: break-word;
        padding: 10px;
        background-color: var(--col-dark-grey);
    }
</style>