<template>
    <base-navbar></base-navbar>
    <div id="content">

        <h1 id="title">LoR Master Leaderboard</h1>

        <div id="btn-group-regions" class="flex">
            <button id="btn-na" class="btn" :class="{active: activeRegion == 0}" @click="switchRegion(regions.NA)">NA</button>
            <button id="btn-eu" class="btn" :class="{active: activeRegion == 1}"  @click="switchRegion(regions.EU,)">EU</button>
            <button id="btn-as" class="btn" :class="{active: activeRegion == 2}" @click="switchRegion(regions.AS)">AS</button>
            <button id="btn-sea" class="btn" :class="{active: activeRegion == 3}" @click="switchRegion(regions.SEA)">SEA</button>
        </div>

        <div id="search-container">
            <div id="search-icon" v-if="!isLoading"><i class="fa fa-search"></i></div>
            <div id="search-icon" v-if="isLoading"><i class="fa fa-spinner"></i></div>
            <input id="search-input" type="text" :placeholder="isLoading ? 'Loading...' : 'Search' " :disabled="isLoading">
        </div>

        <div id="ladder">
            <div class="flex info-help">
                <div class="info-rank">Rank</div>
                <div class="info-name">Name</div>
                <div class="info-lp">Points</div>
            </div>
            <leaderboard-player v-for="(player, index) in players" :key="index" :rank="player.rank + 1" :name="player.name" :lp="player.lp"></leaderboard-player>
        </div>

    </div>
</template>

<script>
import BaseNavbar from '../components/BaseNavbar.vue'
// const axios = require('axios')
import axios from 'axios'
import LeaderboardPlayer from '../components/LeaderboardPlayer.vue'

const regions = {
    NA: 0, EU: 1, AS: 2, SEA: 3
}

// var activeRegionNavElement = document.getElementById('btn-na')

// var activeRegionNavElement
const api_regions = ["americas", "europe", "asia", "sea"]
const api_key = "RGAPI-484a6415-722b-490f-8e7f-ae5cbbaf847f"



const APILink2 = "https://run.mocky.io/v3/40e6eb37-e9c5-421d-897a-2a7045fce75b"
const APILink = 'https://run.mocky.io/v3/ed875f26-bf4b-4159-bdbb-2892f5d98b3e'
const test_api_links = [
    APILink, APILink2, APILink, APILink2
]

export default {
    mounted() {
        // this.activeRegionNavElement = document.getElementById('btn-na')
        // console.log(document.getElementById('btn-na'))
        // this.activeRegionNavElement = document.getElementById('btn-na')

        this.activeRegion = 0

        this.getLeaderboard(this.activeRegion)

        // axios.get(APILink)
        // .then((data) => {
        //     this.players = data.data.players
        //     // console.log('players', this.players)
        // })
        // .catch((e) => {
        //     console.log('error', e)
        // })
    }, 
    data() {
        return {
            players: null,
            activeRegion: 0,
            regions: regions,
            request: null,
            isLoading: false,
        }
    },
    computed: {
    },
    components: { BaseNavbar, LeaderboardPlayer },
    methods: {
        getLeaderboard(regionID) {
            
            if (this.request) this.cancelLeaderboard()

            const axiosSource = axios.CancelToken.source()
            this.request = { cancel: axiosSource.cancel, msg: "Loading..." };

            var APILink = test_api_links[regionID]

            this.isLoading = true;

            axios.get(APILink, {cancelToken: axiosSource.token} )
            .then((data) => {
                this.players = data.data.players
                // console.log('players', this.players)
                this.isLoading = false;
            })
            .catch((e) => {
                if (axios.isCancel(e)) {
                    console.log("Request cancelled");
                } else 
                { console.log('error', e) }
            })
        },

        cancelLeaderboard() {
            this.request.cancel()
        },

        switchRegion(regionID) {
            // console.log(document.getElementById('btn-na'))
            // console.log(this.$refs.defaultRegionBtn)
            // console.log(this.activeRegionNavElement)
            
            if (this.activeRegion != regionID) {
                // this.activeRegionNavElement.classList.remove("active")
                // event.target.classList.add("active")
                // this.activeRegionNavElement = event.target

                // var APILink = "https://" + api_regions[regionsID] + ".api.riotgames.com/lor/ranked/v1/leaderboards?api_key=" + api_key;
                
                this.getLeaderboard(regionID)

                this.activeRegion = regionID
            }

            // console.log(regionID)
            // console.log(this.$refs.defaultRegionBtn)
            // console.log(this.activeRegionNavElement)
        },
    }

}
</script>

<style scoped>

    .info-help {
        color: white;
        background-color: var(--col-light-grey);
        width: 500px;
        height: 30px;
        padding: 5px 10px;
        margin: 5px 0px;
        align-items: center;
        justify-content: space-around;
        border-radius: 5px;
    }

    .info-rank {
        width: 50px;
        text-align: center;
    }

    .info-name {
        width: 280px;
        text-align: left;
    }

    .info-lp {
        width: 50px;
        text-align: center;
    }

    /* Search */

    #search-container {
        position: relative;
        margin-top: 20px;
        width: 420px;
        height: 50px;
    
    }

    #search-input {
        color: white;
        border-radius: 40px;
        width: 100%;
        height: 100%;
        border: none;
        background-color: rgba(255, 255, 255, 0.062);
        padding: 20px 20px 20px 50px;

        box-sizing: border-box;
    }

    #search-input:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.2);
        /* box-shadow: 0px 0px 10px 2px var(--col-gold); */
    }

    #search-icon {
        position: absolute;
        top: 14px;
        left: 20px;
        opacity: 0.7;
    }


    #btn-menu {
        /* display: block; */
        display: none;
        position: relative;
        top: 0px;
        left: 0px;;
    }

    #container {
        color: white;
    }

    #content {
        display: flex;
        flex-direction: column;

        width: 100%;

        align-items: center;
    }

    #title {
        margin-top: 90px;
        margin-bottom: 50px;
    }

    #btn-group-regions {
        border-radius: 5px;
    }

    #btn-group-regions .btn {
        background-color: transparent;
        color: var(--col-gold);

        padding: 10px;
        width: 100px;
        height: 40px;

        cursor: pointer;

        border: 0px;
        border-bottom: 2px transparent solid;
    }

    #btn-group-regions .btn:hover {
        border-bottom: 2px var(--col-gold) solid;
    }

    #btn-group-regions .btn:focus {
        outline: 0px;
    }

    #btn-group-regions .btn.active {
        color: white;
        border-bottom: 2px var(--col-gold) solid;
    }


    /* Ladder  */
    #ladder {
        margin-top: 25px;
        /* color: white; */
    }

</style>