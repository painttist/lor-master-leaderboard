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
            <div class="search-icon" v-if="!isLoading"><i class="fa fa-search"></i></div>
            <div class="search-icon loading" v-if="isLoading"><i class="fa fa-circle-notch fa-spin"></i></div>
            <input v-model="searchText"
                id="search-input" type="text" :placeholder="isLoading ? 'Loading...' : searchPlaceHolder " :disabled="isLoading">
        </div>

        <div id="ladder">
            <div class="flex info-help">
                <div class="info-rank">Rank</div>
                <div class="info-name">Name</div>
                <div class="info-lp">Points</div>
            </div>
            <leaderboard-player v-for="(player, index) in filteredPlayers" :key="index" :rank="player.rank + 1" :name="player.name" :lp="player.lp"></leaderboard-player>
        </div>

    </div>
</template>

<script>
import BaseNavbar from '../components/BaseNavbar.vue'
// const axios = require('axios')
import axios from 'axios'
import LeaderboardPlayer from '../components/LeaderboardPlayer.vue'

import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";

const regions = {
    NA: 0, EU: 1, AS: 2, SEA: 3
}

// var activeRegionNavElement = document.getElementById('btn-na')

// var activeRegionNavElement
const api_regions = ["americas", "europe", "asia", "sea"]

const APILink2 = "https://run.mocky.io/v3/40e6eb37-e9c5-421d-897a-2a7045fce75b"
const APILink = 'https://run.mocky.io/v3/ed875f26-bf4b-4159-bdbb-2892f5d98b3e'
const test_api_links = [
    APILink, APILink2, APILink, APILink2
]

const cors = "https://cors-anywhere.herokuapp.com/"

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
            players: [],
            // activeRegion: 0,
            regions: regions,
            request: null,
            isLoading: false,
            searchText: "",
            signedIn: false,
            dataStartTime: 0,
        }
    },
    computed: {
        filteredPlayers() {
            if (this.searchText) {
                // console.log("filtered")
                var searchText = this.searchText
                var filteredPlayers = []
                var prefilteredPlayer = this.rawPlayers
                for (var i = 0; i < prefilteredPlayer.length; i++) {
                    // console.log(i)
                    if (prefilteredPlayer[i].name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                        filteredPlayers.push(prefilteredPlayer[i])
                    }
                }
                // return this.players[this.activeRegion].filter(function(player) {
                //     return player.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                // })

                return filteredPlayers
            }
            return this.rawPlayers;
        },
        searchPlaceHolder() {
            if (this.rawPlayers) {
                return "Search "+ this.rawPlayers.length +" players"
            } else {
                return "Search"
            }
        },
        rawPlayers() {
            return this.$store.state.players[this.activeRegion]
        },
        activeRegion() {
            return this.$store.state.activeRegion
        }
    },
    components: { BaseNavbar, LeaderboardPlayer },
    methods: {
        signIn() {

            console.log("Start of signin()")
            
            if (firebase.apps.length === 0) {

                console.log("Init Firebase App")

                var firebaseConfig = {
                apiKey: "AIzaSyCxGjwqMuzBJXPWz1ixhpFLpH0Gn-SMIl0",
                authDomain: "lor-master-leaderboard.firebaseapp.com",
                databaseURL: "https://lor-master-leaderboard-default-rtdb.firebaseio.com",
                projectId: "lor-master-leaderboard",
                storageBucket: "lor-master-leaderboard.appspot.com",
                messagingSenderId: "659164123299",
                appId: "1:659164123299:web:88206dcb77fc2d81642f16",
                measurementId: "G-Q7ZNPR6Y79"
                };
                // Initialize Firebase
                firebase.initializeApp(firebaseConfig);
                // firebase.analytics();
            }

            if (!firebase.auth().currentUser) {

                console.log("User undefined, prepare signin")

                firebase.auth().signInAnonymously()
                    .then(() => {
                        // Signed in..
                        
                        // console.log("Signed In")
                        // console.log(this.signedIn)
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode + " | " + errorMessage)
                    });
                
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                        // var uid = user.uid;
                        console.log("Sign in Success")
                        this.signedIn = true
                        this.getLeaderboard(this.activeRegion)
                    } else {
                    // User is signed out
                    // ...
                    }
                });
            } else {
                console.log("User is defined")
                this.signedIn = true
                this.getLeaderboard(this.activeRegion)
            }
        },
        storePlayers(regionID, newPlayers) {
            this.$store.commit('storePlayers', 
                {id: regionID, obj: newPlayers})
        },
        getLeaderboard(regionID) {

            this.isLoading = true;

            if (!this.signedIn) {
                console.log("Signed-In: FALSE")
                this.signIn()
                // console.log("Sighed In: " +  this.signedIn)
            } else {
                console.log("Signed-In: TRUE")
                this.dataStartTime = (new Date()).getTime();

                var selfImplementCache = false;

                if (!this.rawPlayers || !selfImplementCache) {
                    // this.players[this.activeRegion]
                    // console.log()
                
                    var database = firebase.database();
                    var ref = database.ref('leaderboard/' + api_regions[regionID] + '/players/')
                    // .limitToFirst(200)

                    ref.on('value', (snapshot) => {
                    
                        if (!snapshot.val()) {
                            // console.log("Data Empty")
                            // this.getLeaderboard(this.activeRegion);
                        } else {
                            // console.log("Data Success")
                            // var data = snapshot.val();
                            console.log("Data newly loaded")
                            var readTime = (new Date()).getTime() - this.dataStartTime;
                            console.log("Read time: " + readTime / 1000 + ' s');
                            const size = new TextEncoder().encode(JSON.stringify(snapshot.val())).length
                            const kiloBytes = size / 1024;
                            const megaBytes = kiloBytes / 1024;

                            console.log("File size: " + megaBytes.toFixed(3) + " MB");
                        
                            this.isLoading = false;
                        
                            this.players[this.activeRegion] = snapshot.val();

                            this.storePlayers(this.activeRegion, snapshot.val());
                            // console.log(this.rawPlayers)
                            // var players = this.players[0];
                            // console.log(players);
                            // console.log(this.players[this.activeRegion][0])
                        
                        }
                        // console.log(data)
                    }, (err) => {
                        console.log(err)
                    })

                } else {
                    this.isLoading = false;
                    console.log("Data already loaded " + this.activeRegion)
                    var readTime = (new Date()).getTime() - this.dataStartTime;
                    console.log("Read time: " + readTime / 1000 + ' s');
                }
                // console.log("Logged in and start reading data")
                
                
            }
            
            // if (this.request) this.cancelLeaderboard()

            // const axiosSource = axios.CancelToken.source()
            // this.request = { cancel: axiosSource.cancel, msg: "Loading..." };

            // var APILink = null;
            // if (process.env.NODE_ENV === "production") {
            //     APILink = test_api_links[regionID]
            //     // APILink = cors + "https://" + api_regions[regionID] + ".api.riotgames.com/lor/ranked/v1/leaderboards?api_key=" + api_key;
            // } else {
            //     APILink = test_api_links[regionID]
            // }

            // axios.get(APILink, {cancelToken: axiosSource.token} )
            // .then((data) => {
            //     this.players = data.data.players
            //     // console.log('players', this.players)
            //     this.isLoading = false;
            // })
            // .catch((e) => {
            //     if (axios.isCancel(e)) {
            //         console.log("Request cancelled");
            //     } else 
            //     { console.log('error', e) }
            // })
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
                // this.activeRegion = regionID

                this.$store.commit("changeRegion", regionID);
                this.getLeaderboard(regionID)
                
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

    .search-icon {
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