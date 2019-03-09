<template>
    <div class="journal-row"
         :class="{compliant: journal.policy_compliance.compliant}">



        <!--<div class="icon">-->
            <!--<i class="fas fa-ban" v-show="!journal.policy_compliance.compliant"></i>-->
            <!--<i class="fas fa-check" v-show="journal.policy_compliance.compliant"></i>-->
        <!--</div>-->
        <div class="words">
            <div class="row-main">
                              <span class="name" @click="store.setJournal(journal.id)">
                                {{journal.name}}
                                  <span class="issn">
                                      {{journal.id}}
                                  </span>
                              </span>
            </div>


            <div class="row-topics">
                <div class="topic"
                     @click="store.setTopic(topic[0])"
                     v-for="topic in journal.topics.slice(0,3)">
                    {{topic[0].replace(" (miscellaneous)", "")}};
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
                                  <span class="low"
                                        v-show="journal.num_articles_since_2018 > 25 && journal.num_articles_since_2018 < 150">
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
</template>

<script>
    // import axios from 'axios'
    import {store} from '../components/store.js'

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
        margin-bottom: 30px;
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
                font-size: 20px;
                cursor: pointer;
                color: #4DA1E7;
            }
            .issn {
                font-size: 11px;
                font-weight: normal;
                color: #333;
            }
        }
        .row-meta {
            font-size: 16px;
            padding-top: 5px;
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
            .topic {
                /*border: 1px solid #999;*/
                /*padding: 2px 7px;*/
                /*background: #eee;*/
                border-radius: 10px;
                margin-right: 10px;
                display: flex;
                align-items: center;
                font-size: 16px;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }

            }
        }

    }

</style>
