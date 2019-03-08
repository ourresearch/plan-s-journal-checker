<template>
    <div class="home">
        hello
        <div class="top-screen" :class="{'landing-mode': showLandingMode}">

            <div class="content" :class="{'landing-mode': showLandingMode}">

                <h2 class="hero" v-if="showLandingMode">
                    Find journals that meet your
                    open-access funder mandate:
                </h2>
                <search-form @submit="formSubmitHandler"></search-form>
            </div>




        </div>


        <div class="bottom-screen" :class="{'landing-mode': showLandingMode}">

            <div class="results-list-wrapper" v-show="journalData.list">

                <div class="results-list loading" v-show="isLoading">
                    <div class="loading">
                        Loading...
                    </div>
                </div>

                <div class="results-list loaded" v-if="!isLoading">
                    <div v-for="myJournal in journalData.list">

                        <journal-row :journal="myJournal"></journal-row>

                    </div>
                </div>
            </div>


            <div class="single-result-wrapper" v-if="journalData && !journalData.list">
                <div class="go-back-wrapper" v-if="storeState.topic || storeState.text">
                    <div class="go-back">
                        <div class="back-button" @click="store.setJournal(null)">
                            <i class="fas fa-arrow-left"></i> back to results
                        </div>

                    </div>
                </div>

                <div class="single-result loading" v-if="isLoading">
                    <div class="loading">
                        Loading zoomJournal...
                    </div>
                </div>

                <div class="single-result loaded" v-if="!isLoading">
                    <journal-zoom :journal="journalData"></journal-zoom>


                </div>

            </div>



        </div>


    </div>
</template>

<script>
    import axios from 'axios'

    import {store} from '../components/store.js'
    import JournalRow from '../components/JournalRow'
    import SearchForm from '../components/SearchForm'
    import JournalZoom from '../components/JournalZoom'


    export default {
        name: 'Search',
        data: () => ({
            showLandingMode: true,
            storeState: store.state,
            store: store,

            baseEndpoint: "https://rickscafe-api.herokuapp.com/",
            endpoints: {
                topic: "topic/",
                text: "search/journals/",
                journal: "journal/"
            },

            isLoading: false,
            journalData: {}

        }),
        components: {
            axios,
            SearchForm,
            JournalRow,
            JournalZoom
        },
        metaInfo: {
            title: 'Search'
        },
        computed: {},
        methods: {
            formSubmitHandler(){
                this.doSearch()
                this.showLandingMode = false
            },
            doSearch(){
                console.log("home.doSearch", this.storeState)

                let url = this.baseEndpoint
                if (this.storeState.journal){
                    url += this.endpoints["journal"] + this.storeState.journal
                }

                else if (this.storeState.text){
                    url += this.endpoints["text"] + this.storeState.text
                }

                else if (this.storeState.topic){
                    url += this.endpoints["topic"] + this.storeState.topic
                }
                url += "?institution=" + this.storeState.institution
                url += "&funder=" + this.storeState.funder


                console.log("Home.doSearch() getting this url", url)
                axios.get(url)
                    .then(response => {
                        console.log("Home.doSearch() got response: ", response.data)
                        this.journalData = response.data
                        this.isLoading = false
                    })
            },


        },
        mounted() {
            // store.reset()
            // this.$router.push({
            //     path: "/",
            //     query: {}
            // })
            setTimeout(function () {
                document.getElementById("journal-input").focus()
            }, 100)
        },
        watch: {
            "$route": function (to, from) {
                // console.log("route change")
            },
            "storeState": function(newState){
                console.log("Search.watch(): store state changed", to)
            }
        }
    }
</script>


<style lang="scss">
    @import '../assets/animate.css';

    .home {

        .top-screen {

            background: url("../assets/sky.jpg") no-repeat;
            background-color: dodgerblue;
            background-size: cover;
            background-position: 50% 50%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 150px;
            transition: height 0.3s;

            &.landing-mode {
                height: 100vh;
            }

            .content {
                border-radius: 10px;
                margin-top: 60px;
                transition: margin-top 0.3s;
                width: 1150px;

                &.landing-mode {
                    margin-top: 20vh;
                }

                h2.hero {
                    font-size: 40px;
                    /*text-align: center;*/
                    line-height: 1.3;
                    margin-bottom: 0;
                    padding: 0 0 20px;
                    margin: 0;
                    color: #fff;
                    /*background: #fff;*/
                    padding: 20px;
                    /*text-shadow: 5px 5px 25px rgba(0, 0, 0, 1);*/
                    z-index: 9;
                    position: relative;
                    border-radius: 10px 10px 0 0;
                    margin-bottom: 20px;
                    font-weight: 100;
                }

            }
        }

        .bottom-screen {
            background: #fff;
            min-height: 100vh;
            position: relative;
            &.landing-mode {
                min-height: 0;
            }

            .results-list-wrapper {
                width: 100%;
                .results-list {
                    max-width: 1150px;
                    margin: 0 auto;
                    &.loading {
                        display: flex;
                        justify-content: center;
                    }
                    &.loaded {
                        padding-top: 50px;

                    }

                }

            }

            .single-result-wrapper {
                /*position: absolute;*/
                /*top: 0;*/
                /*bottom: 0;*/
                /*width: 100%;*/
                /*background: #fff;*/
                /*box-shadow: 0 10px 5px 5px rgba(0,0,0,.5);*/
                /*border-left: 1px solid #333;*/
                /*z-index: 99;*/

                .go-back-wrapper {
                    background: #4DA1E7;
                    color: #fff;
                    padding: 10px;
                    .go-back {
                        max-width: 1150px;
                        margin: 0 auto;
                        .back-button {
                            font-size: 16px;
                            text-transform: uppercase;
                            font-weight: bold;
                            cursor: pointer;
                        }

                    }
                }
                .single-result.loading {
                    display: flex;
                    justify-content: center;
                }
                .single-result.loaded {
                    max-width: 1150px;
                    margin: 0 auto;
                }

            }

        }

    }


</style>
