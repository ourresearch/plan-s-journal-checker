<template>
    <div class="journal-row"
         @click="store.setJournal(journal.id)"
         :class="{compliant: journal.policy_compliance.compliant}">

        <div class="col icon" v-show="store.state.funder && journal.policy_compliance.compliant">
        </div>
        <div class="col main">


            <div class="row-compliant" v-show="store.state.funder && journal.policy_compliance.compliant">
                <i class="far fa-thumbs-up"></i>
                Funder-approved
            </div>
            <div class="row-main">
                              <span class="name"
                                    :class="{compliant: store.state.funder && journal.policy_compliance.compliant}"
                                    >
                                {{journal.name}}
                                  <span class="issn">
                                      {{journal.id}}
                                  </span>
                              </span>
            </div>
            <div class="row-publisher">
                <span class="publisher">
                                  {{journal.publisher}}
                              </span>
            </div>



            <div class="row-meta">
              <span class="volume">
                  <span class="low" v-show="journal.num_articles_since_2018 < 25">
                      <span class="icons">
                          <i class="far fa-circle"></i>
                          <i class="far fa-circle"></i>
                          <i class="fas fa-circle"></i>
                      </span>
                      <!--Lower-->
                  </span>
                  <span class="low"
                        v-show="journal.num_articles_since_2018 > 25 && journal.num_articles_since_2018 < 150">
                      <span class="icons">
                          <i class="far fa-circle"></i>
                          <i class="fas fa-circle"></i>
                          <i class="fas fa-circle"></i>
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


                <span class="impact" v-show="journal.sjr_best_quartile && journal.sjr_best_quartile.indexOf('Q')==0">
                      <span class="low" v-show="journal.sjr_best_quartile=='Q4'">
                          <span class="icons">
                              <i class="far fa-circle"></i>
                              <i class="far fa-circle"></i>
                              <i class="fas fa-circle"></i>
                          </span>
                          <!--Lower-->
                      </span>
                      <span class="medium" v-show="['Q3', 'Q2'].includes(journal.sjr_best_quartile)">
                          <span class="icons">
                              <i class="far fa-circle"></i>
                              <i class="fas fa-circle"></i>
                              <i class="fas fa-circle"></i>
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


            </div>



            <div class="row-topics">
                <div class="topic"
                     @click="store.setTopic(topic[0])"
                     v-for="topic in journal.topics.slice(0,3)">
                    <i class="fas fa-tag"></i>
                    {{topic[0].replace(" (miscellaneous)", "")}}
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    // import axios from 'axios'
    import {store} from '../store.js'

    export default {
        name: 'JournalRow',
        components: {},
        props: ['journal'],
        data() {
            return {
                store: store
            };
        },
        methods: {},
        watch: {}
    }
</script>


<style lang="scss">
    .journal-row {
        display: flex;
        margin: 10px;
        padding: 20px;
        cursor: pointer;
        transition: box-shadow 300ms;
        /*box-shadow: 0px 3px 6px 1px rgba(0,0,0,0.1);*/
        border-radius: 3px;
        background: #fafafa;

        /*flex: 1 0 300px;*/
        /*min-width: 300px;*/

        &:hover {
            box-shadow: 0px 3px 6px 2px rgba(0,0,0,0.2);
        }


        .col.icon {
            margin-right: 7px;
            font-size: 150%;
            color: green;
        }

        .col.main {

            .row-compliant {
                font-size: 12px;
                color: green;
            }

            .row-main {
                .name {
                    font-size: 20px;
                    cursor: pointer;
                    line-height: 1.3;
                    font-weight: bold;
                    &.compliant {
                        color: green;
                    }
                }
                .issn {
                    display: none;
                    font-size: 11px;
                    font-weight: normal;
                    color: #333;
                }
            }

            .row-publisher {
                font-style: italic;
            }


            .row-topics {
                /*display: flex;*/
                .topic {
                    margin: 3px 10px 3px 0;
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    cursor: pointer;
                    padding: 2px;
                    &:hover {
                        /*text-decoration: underline;*/
                    }
                    i {
                        margin-right: 5px;
                        font-size: 70%;
                        opacity: .7
                    }

                }
            }

            .row-meta {
                font-size: 16px;


                padding: 7px 0;
                margin: 7px 0;
                border-bottom: 1px solid #ddd;
                border-top: 1px solid #ddd;
                span.volume, span.impact {
                    display: block;
                }
                .icons {
                    font-size: 60%;
                    i {
                        margin-right: 1px;
                        &.fas {
                            opacity: .5;
                        }
                    }
                }

                .impact {
                    /*border-left: 1px solid #999;*/
                    /*border-right: 1px solid #999;*/
                    /*margin: 0 .5em;*/
                    /*padding: 0 .5em;*/
                }
                .volume {
                }
                .publisher {
                    font-style: italic;
                }
            }

        }


    }

</style>
