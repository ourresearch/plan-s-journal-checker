<template>
  <div class="home">
      <div class="top-screen" :class="{'landing-mode': showLandingMode}">

            <div class="content" :class="{'landing-mode': showLandingMode}">

              <h2 class="hero" v-if="showLandingMode">
                  Find journals that meet your
                  open-access funder mandate:
              </h2>

              <div class="searchbar">
                <div class="inputs">

                    <input-journal @selected="updateJournal"></input-journal>
                    <div class="sep"></div>
                    <input-institution @selected="updateModifier($event, 'institution')"></input-institution>
                    <div class="sep"></div>
                    <input-funder @selected="updateModifier($event, 'funder')"></input-funder>



                </div>
                <div id="search-button" @click="submitForm">

                  <i class="fas fa-search"></i>
                  <span>Find journals</span>
                </div>

              </div>
            </div>

            <div class="data" style="display:none;color:#fff; width:500px; background:#000;padding:20px;">
                <pre>
                    {{userInput}}
                </pre>

            </div>

      </div>

      <div class="bottom-screen-wrapper" :class="{'landing-mode': showLandingMode}">
          <div class="bottom-screen">
              <div class="results-list" v-if="!res.journal.show">

                  <div class="results-list-loading loading"v-show="res.journalList.isLoading">
                      <div class="loading">
                          Loading...
                      </div>
                  </div>

                  <div class="results-list-loaded" v-if="!res.journalList.isLoading">
                      <div class="journal-row"
                           v-for="journal in res.journalList.data">

                          <div class="icon">
                              <i class="fas fa-times" v-show="!journal.policy_compliance.plan_s.compliant"></i>
                              <i class="fas fa-check" v-show="journal.policy_compliance.plan_s.compliant"></i>
                          </div>
                          <div class="words">
                              <div class="row-1">
                                  <span class="name" @click="zoomOnJournal(journal.id)">
                                    {{journal.name}}
                                  </span>
                              </div>
                              <div class="row-1">
                                  {{ journal.num_articles_since_2018}} articles since 2018
                              </div>
                              <div class="row-3">
                                  <div v-show="journal.policy_compliance.plan_s.compliant">
                                      Plan S compliant
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>


              <div class="single-result" v-if="res.journal.show">

                  <div class="single-result-loading loading" v-if="res.journal.isLoading">
                    <div class="loading">
                          Loading...
                    </div>
                  </div>

                  <div class="single-result-loaded" v-if="!res.journal.isLoading">
                      <div class="is-zoom">
                          <md-button class="md-raised" @click="pageMode='results-list'">
                            < back to results
                          </md-button>
                      </div>

                      <h1>{{res.journal.data.name}}</h1>
                      <pre>{{res.journal.data}}</pre>

                  </div>

              </div>



          </div>



      </div>






  </div>
</template>

<script>
    import axios from 'axios'
    import InputJournal from '../components/InputJournal'
    import InputInstitution from '../components/InputInstitution'
    import InputFunder from '../components/InputFunder'
    import {store} from '../components/store.js'

    export default {
        name: 'Home',
        data: () => ({
            userInput: store.input,

            pageMode: "ready",
            showLandingMode: true,

            journalEndpoint: "https://rickscafe-api.herokuapp.com/journal/",
            baseEndpoint: "https://rickscafe-api.herokuapp.com/",
            endpoints: {
                topic: "topic/",
                text: "search/journals/",
                journal: "journal/"
            },
            results: [],
            singleResult: {},


            form: {
                institution: {},
                funder: {},
                journalSearch: {
                    type: null,
                    q: null
                }

            },

            res: {
                journal: {
                    isLoading: false,
                    data: {},
                    show: false
                },
                journalList: {
                    isLoading: false,
                    data: []
                }
            }

        }),
        components: {
            axios,
            InputJournal,
            InputInstitution,
            InputFunder
        },
        metaInfo: {
            title: 'Home'
        },
        computed: {

        },
        methods: {
            updateModifier(val, fieldName){
                this.form[fieldName] = val
            },
            updateJournal(input) {
                console.log("journal selected", input)
                this.form.journalSearch = input
            },

            zoomOnJournal(id){

            },
            getJournal(id){
                this.res.journal.isLoading = true
                this.res.journal.show = true

                let query = this.$route.query
                query.zoom = id
                this.$router.push({
                    path: "/",
                    query: query
                })

            },
            getJournalList(q, queryType){
                this.res.journalList.isLoading = true
                this.res.journal.show = false
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
            getJournalQueryModifiers(){
                let ret = {}
                if (this.form.institution){
                    ret.institution = this.form.institution.id
                }
                if (this.form.funder){
                    ret.funder = this.form.funder.id
                }
                return ret
            },

            getJournalQueryModifiersStr(){
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

            submitForm(){
                this.showLandingMode = false;
                this.$router.push({
                    path: "/",
                    query: this.getJournalQueryModifiers()
                })

                console.log("type", this.form)
                if (["topic", "text"].indexOf(this.form.journalSearch.type) > -1){
                    this.getJournalList(
                        this.form.journalSearch.q,
                        this.form.journalSearch.type
                    )
                }
                else {
                    this.getJournal(this.form.journalSearch.q)
                }


                // store.search()
                //     .then(response => {
                //         console.log("got search response", response)
                //         this.singleResult = response.data
                //         this.resultsLoading = false
                //     });
                //
                // if (store.getSearchType() == "journal") {
                //     this.pageMode = "single-result"
                //     this.showSingleResult = true
                // }
                // else {
                //     this.pageMode = "results-list"
                //     store.search()
                //         .then(response => {
                //             console.log("got journals response", response)
                //             this.results = response.data.list
                //             this.resultsLoading = false
                //         });
                // }
                //
                // let routeObj = {
                //     path: "/",
                //     query: store.getQueryObj()
                // }
                // this.$router.push(routeObj)
            }
        },
        mounted() {
            // store.reset()
            this.$router.push({
                path: "/",
                query: {}
            })
            // setTimeout(function(){document.getElementById("journal-input").focus()}, 1000)
        },
        watch: {
            "$route": function(to, from){
                // console.log("route change")
            }
        }
    }
</script>


<style lang="scss">

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


            &.landing-mode {
                height: 100vh;
            }



            .content {
                border-radius: 10px;
                margin-top: 60px;

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

                .searchbar {
                    display: flex;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .1);
                    .inputs {
                        display:flex;
                        flex: 1;
                        .autosuggest-container {
                            border: 1px solid #ddd;
                            border-top: none;
                            border:none;
                            background: #fff;
                            /*border: none;*/
                            padding-top: 5px;
                            padding-bottom: 20px;
                            width: 350px;
                            flex: 1;
                            &.input-journal {
                                border-radius: 10px 0 0 10px;
                                border-right: 1px solid #ddd;
                            }
                            &.input-funder {
                                border-left: 1px solid #ddd;
                            }

                            &.has-focus {
                                /*border-radius: 10px 10px 10px 0;*/
                                /*box-shadow: 0px 0 2px 0 rgba(0, 0, 0, .4);*/
                                /*border-radius: 5px;*/
                                /*border-bottom: none;*/
                                /*border: 1px solid #999;*/
                                transition: all 0.5s;
                                h2 {
                                    color: orangered;
                                }
                            }

                            h2 {
                                font-size: 12px;
                                text-transform: uppercase;
                                margin: 10px 15px 5px;
                                i {
                                    display: none;
                                }
                            }

                            input {
                                outline: none;
                                /*position: relative;*/
                                /*display: block;*/
                                width: 100%;
                                border: none;
                                /*border-bottom: 1px solid #ccc;*/
                                font-size: 18px;
                                /*padding: 0 0 15px 15px;*/
                                /*margin: 15px;*/
                                padding: 0 15px;
                                box-sizing: border-box;
                                -webkit-box-sizing: border-box;
                                -moz-box-sizing: border-box;

                                &.autosuggest__input-open {
                                    /*border: 1px solid #999;*/
                                    /*border-bottom: none;*/
                                }
                            }
                            .autosuggest__results {
                                position: absolute;
                                border: 1px solid #ddd;
                                border-top: none;
                                width: 352px;
                                margin-left: -1px;
                                margin-top: 23px;
                                z-index: 999;
                                background: #fff;
                                border-radius: 10px;
                                box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, .1);



                                ul {
                                    list-style: none;
                                    padding-left: 0;
                                    margin: 0;

                                    .autosuggest__results_item {
                                        cursor: pointer;
                                        padding: 10px 20px;
                                        font-size: 16px;
                                    }

                                    .autosuggest__results_title {
                                        display: none;
                                    }

                                    .autosuggest__results_item:active,
                                    .autosuggest__results_item:hover,
                                    .autosuggest__results_item:focus,
                                    .autosuggest__results_item.autosuggest__results_item-highlighted {
                                        background-color: #eee;
                                    }

                                }
                            }

                        }
                    }

                    #search-button {
                        background: orangered;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 0 10px 10px 0;
                        height: 82px;
                        color: #fff;
                        font-size: 36px;
                        text-transform: uppercase;
                        font-weight: bold;
                        cursor: pointer;
                        width: 100px;
                        i {
                            color: #fff;
                        }
                        span {
                            display:none;
                        }
                    }
                    .bottom {
                        display: flex;
                        justify-content: flex-end;

                    }

                }

            }
        }



        .bottom-screen-wrapper {
            background: #fff;
            padding-top: 100px;
            min-height: 100vh;
            &.landing-mode {
                min-height: 0;
            }

            .bottom-screen {
                max-width: 1150px;
                margin: 0 auto;
                &.loading {
                    display:flex;
                    justify-content: center;
                }
                .results-list {

                    .journal-row {
                        display: flex;
                        margin-bottom: 20px;
                        .icon {

                        }
                        .name {
                            font-size: 20px;
                        }
                    }

                }

            }

        }


    }


</style>
