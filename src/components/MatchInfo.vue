<template>
    <div class="match" :class="{won: won, loss: !won}">
        <div class="row opponent">
            <router-link class="opponent-name btn" :to="opponentLink">
                {{opponentName}}
            </router-link>
            <div class="history-info">{{rounds}} Rounds</div>
        </div>
        <div class="row decklist">
            <deck-preview @click="showOpponentDeck" :deck="opponentDeck"></deck-preview>
            <div class="text-vs">VS</div>
            <deck-preview @click="showDeck" :deck="deck"></deck-preview>
        </div>
    </div>

    <deck-detail v-if="visibleDeck == 1" :deck="deck"></deck-detail>
    <deck-detail v-if="visibleDeck == 2" :deck="opponentDeck"></deck-detail>

</template>

<script>
import DeckDetail from '../components/MatchInfoDeckDetail.vue'
import DeckPreview from '../components/MatchInfoDeckPreview.vue'

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
        DeckPreview,
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

    .history-info {
        font-size: 0.8em;
        color: rgba(255, 255, 255, 0.5);
        padding: 10px;
    }
    
    .row {
        display: flex;
        align-items: baseline;
    }

    .row.decklist {
        justify-content: space-between;
        align-items: center;
    }

    .opponent-name {
        /* display: block; */
        padding: 10px 5px 5px 5px;
        margin-left: 8px;
        /* padding-bottom: 5px; */
        /* border-radius: 6px; */
        text-decoration: none;

        border-bottom: 2px solid transparent;
        border-radius: 0px;
    }

    .opponent-name:hover {
        border-bottom: 2px solid white;
    }

    .btn:hover {
        /* background-color: rgba(255, 255, 255, 0.5); */
        /* text-decoration: underline; */
        /* border-bottom: 1px solid white; */
        cursor: pointer;
    }

    @media only screen and (max-width: 768px) {
        .row.decklist {
            /* display: flex; */
            flex-wrap: wrap;
            
        }

        .text-vs {
            /* display: block; */
            /* flex-basis: 2; */
        }
    }

</style>