<template>
    <base-navbar></base-navbar>
    <div id="content">

        <h3 id="subtitle">Match History</h3>
        <h1 id="title">{{playerName}}</h1>
            

        <!-- <div id="history-stats">
            <div>10-game win rate: 90%</div>
        </div> -->

        <!-- <div id="search-container">
            <div id="search-icon"><i class="fa fa-search"></i></div>
            <input id="search-input" type="text" placeholder="Search...">
        </div> -->

        <div id="history">
            
            <match-info 
                v-for="(match, index) in matchInfos" 
                :key="index"
                :opponentName="match.opponentName" 
                :rounds="match.rounds" 
                :opponentDeck="match.opponentDeck" 
                :deck="match.deck"
                :won="match.won"
            ></match-info>

        </div>

        <div class="footer"></div>

    </div>
</template>


<script>

import BaseNavbar from '../components/BaseNavbar.vue'
import MatchInfo from '../components/MatchInfo.vue'
import axios from 'axios'

export default {
    mounted() {
        // console.log(JSON.stringify(this.matchInfos))
        this.getMatchInfo()
    },
    data() {
        return {
            matchInfos: [],
            request: null
        }
    },
    computed: {
        playerName() {
            if (this.$route.params.name)
                return this.$route.params.name
            return "Unknown Player"
        }
    },
    components: { 
        BaseNavbar,
        MatchInfo,
    },
    methods: {
        getMatchInfo() {
            const APILink = "https://run.mocky.io/v3/ed5ffaec-c040-4a62-839c-e52966cae1d6"
            
            if (this.request) this.cancelLeaderboard()

            const axiosSource = axios.CancelToken.source()
            this.request = { cancel: axiosSource.cancel, msg: "Loading..." };

            // var APILink = test_api_links[regionID]

            this.isLoading = true;

            axios.get(APILink, {cancelToken: axiosSource.token} )
            .then((data) => {
                this.matchInfos = data.data.matches;
                // console.log(data);
            })
            .catch((e) => {
                if (axios.isCancel(e)) {
                    console.log("Request cancelled");
                } else 
                { console.log('error', e) }
            })
        }
    }

}

// const match1Info = {
//     opponentName: "Bike",
//     round: 25,
//     deck: "CICACAQAAEBACAA2FUBQGAAFBIFQGAYJENKVMAQBAEAASBIDBEBCMSC4MQAQCAIACU", 
//     oppdeck: "CIBQEAIABENAEAYAAUFASAYJBERTSVCVKZLWAZAAAEAQCAAH",
//     won: true
// }

// const match2Info = {
//     opponentName: "Ace",
//     round: 25,
//     deck: "CICACAQAAEBACAA2FUBQGAAFBIFQGAYJENKVMAQBAEAASBIDBEBCMSC4MQAQCAIACU", 
//     oppdeck: "CIBQEAIABENAEAYAAUFASAYJBERTSVCVKZLWAZAAAEAQCAAH",
//     won: false
// }

// const match3Info = {
//     opponentName: "Cat",
//     round: 15,
//     deck: "CICACAQAAEBACAA2FUBQGAAFBIFQGAYJENKVMAQBAEAASBIDBEBCMSC4MQAQCAIACU", 
//     oppdeck: "CIBQEAIABENAEAYAAUFASAYJBERTSVCVKZLWAZAAAEAQCAAH",
//     won: false
// }

</script>

<style scoped>

    #title {
        margin-top: 0px;
        margin-bottom: 40px;
    
    }

    #subtitle {
        margin-top: 80px;
        margin-bottom: 20px;
    }

    #history {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 550px;
    }

    .footer {
        height: 50px;
    }

    @media only screen and (max-width: 768px) {
        #history {
            width: 400px;
        }
    }

</style>