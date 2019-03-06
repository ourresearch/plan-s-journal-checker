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
                    <input-funder @selected="updateModifier($event, 'funder')"></input-funder>
                    <input-institution @selected="updateModifier($event, 'institution')"></input-institution>



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



      <div class="bottom-screen" :class="{'landing-mode': showLandingMode}">

          <div class="results-list-wrapper">

              <div class="results-list loading"v-show="res.journalList.isLoading">
                  <div class="loading">
                      Loading...
                  </div>
              </div>

              <div class="results-list loaded" v-if="!res.journalList.isLoading">
                  <div class="journal-row"
                       :class="{compliant: journal.policy_compliance.compliant}"
                       v-for="journal in res.journalList.data">

                      <div class="icon">
                          <i class="fas fa-ban" v-show="!journal.policy_compliance.compliant"></i>
                          <i class="fas fa-check" v-show="journal.policy_compliance.compliant"></i>
                      </div>
                      <div class="words">
                          <div class="row-main">
                              <span class="name" @click="getJournal(journal.id)">
                                {{journal.name}}
                                  <span class="issn">
                                      {{journal.id}}
                                  </span>
                              </span>
                          </div>


                          <div class="row-topics">
                              <div class="topic" v-for="topic in journal.topics.slice(0,3)">
                                {{topic.replace(" (miscellaneous)", "")}};
                              </div>
                          </div>


                          <div class="row-meta">
                              <span class="volume">
                                  <span class="low" v-show="journal.num_articles_since_2018 < 25">
                                      <span class="icons">
                                          <i class="fas fa-circle"></i>
                                          <i class="far fa-circle"></i>
                                          <i class="far fa-circle"></i>
                                      </span>
                                      <!--Lower-->
                                  </span>
                                  <span class="low" v-show="journal.num_articles_since_2018 > 25 && journal.num_articles_since_2018 < 150">
                                      <span class="icons">
                                          <i class="fas fa-circle"></i>
                                          <i class="fas fa-circle"></i>
                                          <i class="far fa-circle"></i>
                                      </span>
                                      <!--Medium-->
                                  </span>
                                  <span class="high" v-show="journal.num_articles_since_2018 > 150">
                                      <span class="icons">
                                          <i class="fas fa-circle"></i>
                                          <i class="fas fa-circle"></i>
                                          <i class="fas fa-circle"></i>
                                      </span>
                                      <!--High-->
                                  </span>
                                  Publication volume
                              </span>


                              <span class="impact">
                                  <span class="low" v-show="journal.sjr_best_quartile=='Q4'">
                                      <span class="icons">
                                          <i class="fas fa-circle"></i>
                                          <i class="far fa-circle"></i>
                                          <i class="far fa-circle"></i>
                                      </span>
                                      <!--Lower-->
                                  </span>
                                  <span class="medium" v-show="['Q3', 'Q2'].includes(journal.sjr_best_quartile)">
                                      <span class="icons">
                                          <i class="fas fa-circle"></i>
                                          <i class="fas fa-circle"></i>
                                          <i class="far fa-circle"></i>
                                      </span>
                                      <!--Medium-->
                                  </span>
                                  <span class="high" v-show="journal.sjr_best_quartile=='Q1'">
                                      <span class="icons">
                                          <i class="fas fa-circle"></i>
                                          <i class="fas fa-circle"></i>
                                          <i class="fas fa-circle"></i>
                                      </span>
                                      <!--High-->
                                  </span>
                                  Impact
                              </span>

                              <span class="publisher">
                                  {{journal.publisher}}
                              </span>





                          </div>

                      </div>
                  </div>
              </div>
          </div>


          <transition
                  name="custom-classes-transition"
                enter-active-class="animated slideInRight"
                leave-active-class="animated slideOutRight"
          >
              <div class="single-result-wrapper" v-if="res.journal.show">
                  <div class="go-back-wrapper" v-if="res.journalList.data.length">
                      <div class="go-back">
                          <div class="back-button" @click="hideJournal">
                            <i class="fas fa-arrow-left"></i> back to results
                          </div>

                      </div>
                  </div>

                  <div class="single-result loading" v-if="res.journal.isLoading">
                    <div class="loading">
                          Loading journal...
                    </div>
                  </div>

                  <div class="single-result loaded" v-if="!res.journal.isLoading">

                      <h1>{{res.journal.data.name}}</h1>
                      <pre>{{res.journal.data}}</pre>

                  </div>

              </div>

          </transition>



      </div>









  </div>
</template>

<script>
    import axios from 'axios'
    import InputJournal from '../components/InputJournal'
    import InputInstitution from '../components/InputInstitution'
    import InputFunder from '../components/InputFunder'
    import {store} from '../components/store.js'

    console.log("hi heather!")

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
                this.form.journalSearch = input
            },
            hideJournal(){
                this.res.journalList.show = false
                this.res.journal.show = false
            },
            foo(){
                this.res.journal.show = false
            },

            submitForm(){
                this.res.journal.show = false;
            },
            getJournal(id){
                this.res.journal.isLoading = true
                this.res.journal.show = true

                // let query = this.$route.query
                // query.zoom = id
                // this.$router.push({
                //     path: "/",
                //     query: query
                // })

                let url = this.baseEndpoint
                    + this.endpoints.journal
                    + id
                    + this.getJournalQueryModifiersStr()


                console.log("getting this url", url)

                axios.get(url)
                    .then(response => {
                        console.log("got response from journal endpoint", response.data)
                        this.res.journal.data = response.data
                        this.res.journal.isLoading = false
                    })

            },
            getJournalList(q, queryType){
                this.res.journalList.isLoading = true
                this.res.journal.show = false
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

                if (["topic", "text"].indexOf(this.form.journalSearch.type) > -1){
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

                .searchbar {
                    display: flex;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .1);
                    width: 100%;
                    .inputs {
                        display:flex;
                        width: 100%;
                        /*overflow: hidden;*/
                        .autosuggest-container {
                            background: #fff;
                            padding-top: 5px;
                            padding-bottom: 20px;
                            flex:1;
                            flex-direction: column;
                            // see https://codepen.io/thomas-eilermann/pen/grjEjE
                            transition: flex-basis 300ms ease-in-out;
                            &.input-journal {
                                border-radius: 10px 0 0 10px;
                                flex: 2;
                                .autosuggest__results {
                                    width: 502px;
                                }
                            }
                            &.input-funder {
                                border-left: 1px solid #ddd;
                                border-right: 1px solid #ddd;
                            }

                            &.has-focus {
                                /*flex-basis: 500px;*/
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
                                width: 303px;
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
                                        div {
                                            display: flex;
                                            i {
                                                margin-right: 5px;
                                                margin-top: 1px;
                                            }

                                        }

                                    }
                                    .autosuggest__results_title
                                    {
                                        padding: 20px 20px 0;
                                        border-bottom: 1px solid #eee;
                                        color: orangered;
                                    }

                                    /*.autosuggest__results_title_topics:before,*/
                                    /*.autosuggest__results_title_journals:before*/
                                    /*{*/
                                        /*font-family: "Font Awesome 5 Free";*/
                                        /*display: inline-block;*/
                                        /*padding-right: 6px;*/
                                        /*vertical-align: middle;*/
                                        /*opacity: .9;*/
                                    /*}*/

                                    /*.autosuggest__results_title_topics:before {*/
                                        /*content: "\f02b";*/
                                    /*}*/

                                    /*.autosuggest__results_title_journals:before {*/
                                        /*content: "\f02d";*/
                                    /*}*/

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
                        display:flex;
                        justify-content: center;
                    }
                    &.loaded {
                        padding-top: 50px;

                        .journal-row {
                            display: flex;
                            margin-bottom: 40px;
                            &.compliant {
                                opacity: 1;
                            }

                            .icon {
                                margin-right: 7px;
                                font-size: 150%;
                                color: #4DA1E7;
                            }
                            .row-main {
                                .name {
                                    font-size: 22px;
                                    cursor: pointer;
                                    color: #4DA1E7;
                                }
                                .issn {
                                    font-size: 50%;
                                    font-weight: normal;
                                    color: #333;
                                }
                            }
                            .row-meta {
                                font-size: 16px;
                                padding-top: 10px;
                                display: flex;
                                .icons {
                                    font-size: 70%;
                                    i {
                                        margin-right: 2px;
                                        &.fas {
                                            opacity: .5;
                                        }
                                    }
                                }

                                .impact {
                                    border-left: 1px solid #999;
                                    border-right: 1px solid #999;
                                    margin: 0 .5em;
                                    padding: 0 .5em;
                                }
                                .volume {
                                }
                                .publisher {
                                    font-style: italic;
                                }
                            }

                            .row-topics {
                                display: flex;
                                margin-top: 8px;
                                .topic {
                                    /*border: 1px solid #999;*/
                                    /*padding: 2px 7px;*/
                                    /*background: #eee;*/
                                    border-radius: 10px;
                                    margin-right: 10px;
                                    display: flex;
                                    align-items: center;
                                    font-size: 16px;

                                }
                            }

                        }

                    }


                }

            }


            .single-result-wrapper {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
                background: #fff;
                box-shadow: 0 10px 5px 5px rgba(0,0,0,.5);
                border-left: 1px solid #333;
                z-index: 99;

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
