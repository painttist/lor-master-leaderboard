<template>
    <div class="match" :class="{won: won, loss: !won}">
        <div class="row opponent">
            <router-link class="opponent-name btn" :to="opponentLink">
                {{opponentName}}
            </router-link>
            <div class="history-info">{{rounds}} Rounds</div>
        </div>
        <div class="row decklist">
            <div class="row deck btn" @click="showOpponentDeck">
                <div class="region-icon icon">SI</div>
                <div class="region-icon icon">DE</div>
                <div class="champion-icon icon">EL</div>
                <div class="champion-icon icon">TF</div>
            </div>
            <div>VS</div>
            <div class="row deck btn" @click="showDeck">
                <div class="region-icon icon">SI</div>
                <div class="region-icon icon">DE</div>
                <div class="champion-icon icon">EL</div>
                <div class="champion-icon icon">TF</div>
            </div>
        </div>
    </div>

    <deck-detail v-if="visibleDeck == 1">{{deck}}</deck-detail>
    <deck-detail v-if="visibleDeck == 2">{{opponentDeck}}</deck-detail>

</template>

<script>
import DeckDetail from '../components/MatchInfoDeckDetail.vue'

export default {
    data() {
        return {
            visibleDeck: 0
        }
    },
    props: {
        opponentName: String,
        rounds: Number,
        deck: String,
        opponentDeck: String,
        won: Boolean,
    },
    computed: {
        opponentLink() {
            return "/profile/" + this.opponentName
        },
    }, 
    methods: {
        showDeck() {
            if (this.visibleDeck == 1)
                this.visibleDeck = 0
            else
                this.visibleDeck = 1
        },
        showOpponentDeck() {
            if (this.visibleDeck == 2)
                this.visibleDeck = 0
            else
                this.visibleDeck = 2
        }
    },
    components: {
        DeckDetail,
    }
}
</script>

<style scoped>

    .match {
        display: flex;
        width: 100%;
        flex-direction: column;
        background: linear-gradient(60deg, var(--col-grey), var(--col-light-grey));
        padding: 10px;
        border-radius: 6px;
        margin-top: 10px;
    }

    .match .opponent-name {
        color: white;
    }

    .match.won {
        /* background: linear-gradient(-60deg,rgb(224, 171, 24), rgb(78, 78, 78) 60%); */
        /* box-shadow: inset 0px 0px 0px 2px var(--col-gold); */
        background: linear-gradient(60deg, var(--col-dark-gold), var(--col-gold));
        /* box-shadow: 2px solid gold; */
        /* background: linear-gradient(90deg,rgb(224, 171, 24) 1%, rgb(94, 94, 94) 1%); */
    }

    .match.loss {
        /* background: linear-gradient(300deg,rgb(224, 171, 24), rgb(94, 94, 94)); */
        /* background: linear-gradient(300deg,rgb(224, 171, 24) 20%, rgb(94, 94, 94) 20%); */
        /* background: linear-gradient(-90deg,rgb(224, 171, 24) 1%, rgb(94, 94, 94) 1%); */
    
    }

    .row {
        display: flex;
        align-items: baseline;
    }

    .row.decklist {
        justify-content: space-between;
    }

    .row.deck {
        width: 200px;
        padding: 10px;
        justify-content: space-between;
        border-radius: 6px;
    }

    .row.opponent {
        /* margin-bottom: 10px; */
        /* padding-left: 330px; */
    }

    .opponent-name {
        /* display: block; */
        padding: 10px;
        border-radius: 6px;
        text-decoration: none;
    }

    .history-info {
        font-size: 0.8em;
        color: rgba(255, 255, 255, 0.5);
        padding: 10px;
    }

    .icon {
        padding: 10px;
        width: 20px;
        height: 20px;
        color: black;
        background-color: white;
        border-radius: 20px;
    }

    .btn:hover {
        background-color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
    }

</style>