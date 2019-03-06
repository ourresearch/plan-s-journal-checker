<template>
    <div class="home">
        <div class="top-screen" :class="{'landing-mode': showLandingMode}">

            <div class="content" :class="{'landing-mode': showLandingMode}">

                <h2 class="hero" v-if="showLandingMode">
                    Find journals that meet your
                    open-access funder mandate:
                </h2>
                <search-form @submit="doSearch" @update="updateSearch"></search-form>
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


            <!--<transition-->
            <!--name="custom-classes-transition"-->
            <!--enter-active-class="animated slideInRight"-->
            <!--leave-active-class="animated slideOutRight"-->
            <!--&gt;-->
            <div class="single-result-wrapper" v-if="!journalData.list">
                <div class="go-back-wrapper" v-if="query.field && query.field != 'journal'">
                    <div class="go-back">
                        <div class="back-button" @click="hideJournal">
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
                    <div class="top">
                        <h1>{{journalData.name}}</h1>


                    </div>


                    <pre>{{journalData}}</pre>

                </div>

            </div>

            <!--</transition>-->


        </div>


    </div>
</template>

<script>
    import axios from 'axios'

    import JournalRow from '../components/JournalRow'
    import SearchForm from '../components/SearchForm'
    import {store} from '../components/store.js'


    export default {
        name: 'Home',
        data: () => ({
            showLandingMode: true,

            journalEndpoint: "https://rickscafe-api.herokuapp.com/journal/",
            baseEndpoint: "https://rickscafe-api.herokuapp.com/",
            endpoints: {
                topic: "topic/",
                text: "search/journals/",
                journal: "journal/"
            },

            query: {}, // set from form or url


            isLoading: false,
            journalData: {}

        }),
        components: {
            axios,
            SearchForm,
            JournalRow
        },
        metaInfo: {
            title: 'Home'
        },
        computed: {},
        methods: {
            hideJournal() {
                this.res.journalList.show = false
                this.res.zoomJournal.show = false
            },
            updateSearch(formData){
            },
            doSearch(formData){
                console.log("home.doSearch", formData)

            },

            getZoomJournal(id) {
                this.res.isLoading = true
                this.res.zoomJournal.show = true

                let url = this.baseEndpoint
                    + this.endpoints.journal
                    + id
                    + this.getJournalQueryModifiersStr()


                console.log("getting this url", url)

                axios.get(url)
                    .then(response => {
                        console.log("got response from journal endpoint", response.data)
                        this.res.zoomJournal.data = response.data
                        this.res.isLoading = false
                    })

            },
            getJournalList(q, queryType) {
                this.res.journalList.isLoading = true
                this.res.zoomJournal.show = false
                // this.$router.push({
                //     path: "/",
                //     query: {
                //         q: q,
                //         queryType: queryType
                //     }
                // })

                let url = this.baseEndpoint
                    + this.endpoints[queryType]
                    + q
                    + this.getJournalQueryModifiersStr()


                console.log("getting this url", url)

                axios.get(url)
                    .then(response => {
                        console.log("got response from journal list", response.data.list)
                        this.res.journalList.data = response.data.list
                        this.res.journalList.isLoading = false
                    })

            },
            getJournalQueryModifiers() {
                let ret = {}
                if (this.form.institution) {
                    ret.institution = this.form.institution.id
                }
                if (this.form.funder) {
                    ret.funder = this.form.funder.id
                }
                return ret
            },

            getJournalQueryModifiersStr() {
                let str = Object.entries(this.getJournalQueryModifiers())
                    .map(entry => {
                        return entry[0] + "=" + entry[1]
                    })
                    .join("&")

                if (str) {
                    return "?" + str
                }
                else {
                    return ""
                }
            },

            submitForm() {
                console.log(
                    "submitting form",
                    this.form.journalSearch.q,
                    this.form.journalSearch.type,
                    this.form
                )

                this.showLandingMode = false;
                // this.$router.push({
                //     path: "/",
                //     query: this.getJournalQueryModifiers()
                // })

                if (["topic", "text"].indexOf(this.form.journalSearch.type) > -1) {
                    this.getJournalList(
                        this.form.journalSearch.q,
                        this.form.journalSearch.type
                    )
                }
                else {
                    this.res.journalList.data = []
                    this.getJournal(this.form.journalSearch.q)
                }
            }
        },
        mounted() {
            // store.reset()
            this.$router.push({
                path: "/",
                query: {}
            })
            setTimeout(function () {
                document.getElementById("journal-input").focus()
            }, 100)
        },
        watch: {
            "$route": function (to, from) {
                // console.log("route change")
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
