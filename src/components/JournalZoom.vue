<template>


    <div class="journal-zoom" v-if="server.journalZoom.id">


        <div class="top">
            <div class="main-col">
                <div class="image" v-if="hasImage">
                    <img @error="noImg" :src="'http://images.serialssolutions.com/ulrichs/' + server.journalZoom.id.replace('-', '') + '.gif'"
                         alt="">
                </div>
                <div class="text">
                    <div class="row compliance" v-if="server.funder.id">
                        <div class="compliant" v-if="server.journalZoom.policy_compliance.compliant">
                            <i class="fas fa-thumbs-up"></i>
                            This fully CC-BY journal is
                            <strong>compliant</strong> with your funder publication guidelines. <a href="https://www.coalition-s.org/">Learn more</a>
                        </div>

                        <div class="noncompliant" v-if="!server.journalZoom.policy_compliance.compliant">
                            <i class="fas fa-thumbs-down"></i>
                            This hybrid journal
                            <strong>does not comply</strong> with your funder publication guidelines. <a href="https://www.coalition-s.org/">Learn more</a>

                        </div>
                    </div>



                    <h1>
                        {{server.journalZoom.name}}
                        <small class="issn">

                            {{server.journalZoom.id}}
                        </small>
                    </h1>

                    <div class="row publisher">
                        <flag :squared="false" :iso="server.journalZoom.country_code"/>

                        <span class="date start">{{ server.journalZoom.oldest_published_date | moment("YYYY") }}</span>&ndash;<span
                            class="date till">present,</span>
                        <span class="publisher">
                            <span class="publisher-country">


                            </span>
                            <span class="publisher-name">
                                {{server.journalZoom.publisher}}
                            </span>
                        </span>
                    </div>
                    <div class="row volume">
                        <span class="volume">
                                  <span class="low" v-show="server.journalZoom.num_articles_since_2018 < 25">
                                      <span class="icons">
                                          <i class="fas fa-circle"></i>
                                          <i class="far fa-circle"></i>
                                          <i class="far fa-circle"></i>
                                      </span>
                                      Low
                                  </span>
                                  <span class="low"
                                        v-show="server.journalZoom.num_articles_since_2018 > 25 && server.journalZoom.num_articles_since_2018 < 150">
                                      <span class="icons">
                                          <i class="fas fa-circle"></i>
                                          <i class="fas fa-circle"></i>
                                          <i class="far fa-circle"></i>
                                      </span>
                                      Medium
                                  </span>
                                  <span class="high" v-show="server.journalZoom.num_articles_since_2018 > 150">
                                      <span class="icons">
                                          <i class="fas fa-circle"></i>
                                          <i class="fas fa-circle"></i>
                                          <i class="fas fa-circle"></i>
                                      </span>
                                      High
                                  </span>
                                  volume
                              </span>


                        ({{server.journalZoom.num_articles_since_2018}} articles published in the last year)
                    </div>
                    <div class="row topics">
                        <div class="topic"
                             @click="store.setTopic(topic[0])"
                             v-for="topic in store.server.journalZoom.topics.slice(0,3)">
                            <i class="fas fa-tag"></i>
                            {{topic[0].replace(" (miscellaneous)", "")}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="tools-col">
                <md-button>
                    View in API
                </md-button>
                <md-button>
                    Get updates
                </md-button>
                <md-button>
                    Report errors
                </md-button>
            </div>
        </div>

        <div class="bottom">
            <div class="infographic">




                <!--IMPACT INFOBOX-->
                <div class="infobox impact">
                    <div class="main">
                        <div class="big">
                            {{ 99 - (store.server.journalZoom.topics[0][1] * 24) }}
                        </div>
                        <div class="label">
                            <div class="main">Percentile Impact</div>
                            <div class="minor">in {{ store.server.journalZoom.topics[0][0].replace(" (miscellaneous)", "") }}</div>
                        </div>
                    </div>


                    <div class="also">
                        <div class="also-row sjr">
                            <a :href="'https://www.scimagojr.com/journalsearch.php?q=' + store.server.journalZoom.id">
                                <i class="fas fa-chart-area"></i>
                                <strong>{{ store.server.journalZoom.sjr }}</strong> Scimago Journal Ranking
                            </a>

                        </div>


                        <div class="peer-review also-row" v-show="store.server.journalZoom.oa_details.review_process">
                            <a :href="store.server.journalZoom.oa_details.review_process_url">
                                <i class="fas fa-certificate"></i>
                                Peer reviewed
                            </a>
                        </div>
                        <div class="plagiarism-policy also-row" v-show="store.server.journalZoom.oa_details.plagiarism_screening_policy">
                            <a :href="store.server.journalZoom.oa_details.plagiarism_screening_policy_url">
                                <i class="fas fa-search"></i>
                                Plagiarism screening
                            </a>
                        </div>

                    </div>
                </div>



                <!--PRICE INFOBOX-->
                <div class="infobox price">
                    <div class="main">
                        <div class="big">
                            <span class="currency">
                                $
                            </span>
                            <span class="num">
                                {{ store.server.journalZoom.oa_details.apc_fee }}
                            </span>
                        </div>
                        <div class="label">
                            Article Processing Charge
                        </div>
                        <div class="also">
                            <div class="also-row" v-show="store.server.journalZoom.oa_details.submission_fee">
                                <a :href="store.server.journalZoom.oa_details.submission_fee_url">
                                    <i class="far fa-money-bill-alt"></i>
                                    <strong>${{ store.server.journalZoom.oa_details.submission_fee }}</strong>
                                    Submission Fee
                                </a>
                            </div>
                            <div class="also-row">
                                <a :href="store.server.journalZoom.oa_details.apc_waiver_url">
                                    <i class="fas fa-hand-holding-usd"></i>
                                    Waivers available
                                </a>
                            </div>
                        </div>
                    </div>
                </div>




                <!--SPEED INFOBOX-->
                <div class="infobox speed">
                    <div class="main">
                        <div class="big">
                            <span class="num">
                                {{ (store.server.journalZoom.oa_details.weeks_submission_to_publication / 4).toFixed(1) }}
                            </span>
                        </div>
                        <div class="label">
                            Months from submission to publication (avg)
                        </div>
                    </div>
                </div>



                <!--LICENSE INFOBOX-->
                <div class="infobox speed">
                    <div class="main">
                        <div class="big">
                            <span class="str">
                                {{ store.server.journalZoom.oa_details.license }}
                            </span>
                        </div>
                        <div class="label">
                            Open Access license
                        </div>
                    </div>
                    <div class="also">
                            <div class="also-row" v-show="store.server.journalZoom.oa_details.author_holds_copyright_no_restictions">
                                <a :href="store.server.journalZoom.oa_details.copyright_url">
                                    <i class="far fa-copyright"></i>
                                    Author holds copyright
                                </a>
                            </div>
                        </div>
                </div>




            </div>


            <div class="related-journals">
                <h2>similar journals</h2>
                <div class="related-journal-wrapper" v-for="myJournal in server.journalZoom.similar_journals">
                    <journal-row :journal="myJournal"></journal-row>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import JournalRow from '../components/JournalRow'
    import {ImgFallback} from 'v-img-fallback'
    import {store} from '../components/store.js'

    export default {
        name: 'JournalZoom',
        components: {
            JournalRow
        },
        data() {
            return {
                store: store,
                server: store.server,
                hasImage: true
            };
        },
        methods: {
            noImg: function(){
                console.log("no image!")
                this.hasImage = false

            }
        },
        directives: {
            ImgFallback
        },
        watch: {}
    }
</script>


<style lang="scss">

    .journal-zoom {
        .top {
            display: flex;
            justify-content: space-between;
            .main-col {
                display: flex;
                flex-basis: 700px;
                .image {
                    margin: 10px 25px 0 0;
                    height: 200px;
                    img {
                        border: 1px solid #ddd;

                    }
                }
                .text {
                    font-size: 16px;
                    line-height: 1.5;


                    .compliance {
                        i {margin-right: 5px;}
                        a {text-decoration: underline;}
                        .compliant {
                            color: green;
                            a {color: green;}
                        }
                        .noncompliant {
                            color: red;
                            a {color: red;}
                        }
                    }

                    h1 {
                        margin: 0;
                        small {
                            font-size: 50%;
                            font-weight: normal;
                        }
                    }
                    .row.publisher {
                        .flag-icon { margin-right: 5px;}
                        .publisher-name {
                            font-style: italic;
                        }
                    }
                    .row.volume {
                        .icons {
                            font-size: 70%;
                            i {
                                margin-right: 2px;
                                &.fas {
                                    opacity: .8;
                                }
                            }
                        }
                    }
                    .row.topics {
                        border-top: 1px solid #ddd;
                        margin-top: 5px;
                        padding-top: 5px;
                        i.fas {
                            opacity: .8;
                            font-size: 66%;
                        }
                        .topic {
                            cursor: pointer;
                            &:hover {
                                text-decoration: underline;
                            }

                        }
                    }
                }

            }
        }

        .bottom {

        }

    }

</style>
