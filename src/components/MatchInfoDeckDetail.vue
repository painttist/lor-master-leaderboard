<template>
    <div class="deck-detail">
        <div class="deck-code">
            {{deck}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        deck: String,
    },
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