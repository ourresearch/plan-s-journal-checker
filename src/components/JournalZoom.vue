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
                            <i class="fas fa-exclamation-triangle"></i>
                            Noncompliant

                        </div>
                    </div>




                    <h1>
                        {{server.journalZoom.name}}
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

                    <div class="row issn">
                        <div class="issn">
                        ISSN: {{server.journalZoom.id}}
                    </div>
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
            <div class="infographic" v-if="store.server.journalZoom.oa_details.license">




                <!--IMPACT INFOBOX-->
                <div class="infobox impact">
                    <div class="main-row">
                        <div class="big">
                            {{ 99 - (store.server.journalZoom.topics[0][1] * 24) }}
                        </div>
                        <div class="label">
                            Percentile Citedness
                            <div class="main"></div>
                        </div>
                    </div>

                    <div class="second-row">
                            <div class="minor">in {{ store.server.journalZoom.topics[0][0].replace(" (miscellaneous)", "") }}</div>
                    </div>


                    <div class="also">
                        <!--<div class="also-row sjr">-->
                            <!--<a :href="'https://www.scimagojr.com/journalsearch.php?q=' + store.server.journalZoom.id">-->
                                <!--<i class="fas fa-chart-area"></i>-->
                                <!--<strong>{{ store.server.journalZoom.sjr }}</strong> Scimago Journal Ranking-->
                            <!--</a>-->

                        <!--</div>-->


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
                    <div class="main-row">
                        <div class="big">
                            <span class="num">
                                <span class="currency">$</span>{{ Number(store.server.journalZoom.oa_details.apc_fee).toLocaleString() }}
                            </span>
                        </div>
                    </div>
                    <div class="second-row">
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




                <!--SPEED INFOBOX-->
                <div class="infobox speed">
                    <div class="main-row">
                        <div class="big">
                            <span class="num">
                                {{ (store.server.journalZoom.oa_details.weeks_submission_to_publication / 4).toFixed(1) }}
                            </span>
                        </div>
                        <div class="label">
                            Months
                        </div>
                    </div>
                    <div class="second-row">
                        Average time from submission to publication
                    </div>
                </div>



                <!--VOLUME INFOBOX-->
                <div class="infobox volume">
                    <div class="main-row">
                        <div class="big">
                            <span class="num">
                                {{Number(server.journalZoom.num_articles_since_2018).toLocaleString()}}
                            </span>
                        </div>
                    </div>
                    <div class="second-row">
                        articles published per year
                    </div>
                </div>



                <!--LICENSE INFOBOX-->
                <div class="infobox speed">
                    <div class="main-row">
                        <div class="big">
                            <span class="str">
                                {{ store.server.journalZoom.oa_details.license }}
                            </span>
                        </div>
                    </div>
                    <div class="second-row">
                        Open Access license
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


            <div class="related-journals" v-show="!server.journalZoom.policy_compliance.compliant">
                <div class="header">
                    <h2>

                        This hybrid journal doesn't comply with your funder's open access policy.</h2>
                    <p>Here are some policy-compliant alternatives:</p>
                </div>
                <div class="related-journals-list">
                    <div class="journal-row-wrapper" v-for="myJournal in server.journalZoom.similar_journals.slice(0, 5)">
                        <i class="fas fa-check bullet"></i>
                        <journal-row :journal="myJournal" ></journal-row>

                    </div>

                </div>




                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import JournalRow from '../components/JournalRow'
    import {ImgFallback} from 'v-img-fallback'
    import {store} from '../store.js'

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
                flex: 2;
                .image {
                    margin: 5px 25px 0 0;
                    height: 200px;
                    img {
                        border: 1px solid #ddd;

                    }
                }
                .text {
                    font-size: 16px;
                    line-height: 1.5;


                    .compliance {
                        margin-bottom: -5px;
                        i {margin-right: 3px;}
                        a {text-decoration: underline;}

                        .compliant {
                            color: green;
                            a {color: green;}
                        }
                        .noncompliant {
                            color: red;
                        }
                    }

                    h1 {
                        margin: 0;
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
                        /*border-top: 1px solid #ddd;*/
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
            .tools-col {
                flex: 1;
                display: flex;
                justify-content: flex-end;
            }
        }

        .bottom {
            display: flex;
            .infographic {
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                margin: 20px 0 10px;
                padding: 20px 0 10px;
                display: flex;
                .infobox {
                    margin: 20px;
                    flex: 1 1 200px;
                    justify-content: space-between;

                    &.impact {
                    }
                    .main-row {
                        display: flex;
                        align-items: flex-end;
                        .big {
                            font-size: 40px;
                            font-weight: bold;
                            line-height: 1.1;
                            padding-right: 5px;
                        }
                        .label {
                            flex: 0 1 5em;
                            padding-bottom: 4px;
                            font-weight: bold;
                        }

                    }
                    .second-row {
                        margin-bottom: 5px;
                    }
                    .also {
                        /*border-top: 1px solid #eee;*/
                        .also-row {
                            a {
                                padding: 4px 10px;
                                margin: 4px 5px 4px -3px;
                                display: block;
                                border: 1px solid #ccc;
                                border-radius: 20px;
                                color: #333;
                                &:hover {
                                    text-decoration: none;
                                }
                            }
                        }
                    }
                }

            }

            .related-journals {
                width: 100%;
                margin-top: 20px;
                .header {
                    color: red;
                    /*background: #F8D6D9;*/
                    /*padding: 20px;*/
                    padding-bottom: 20px;
                    h2 {
                        margin: 0;
                        margin-bottom: 10px;
                        font-size: 28px;
                    }
                    p {
                        font-size: 18px;
                        margin:0 ;
                        /*color: #333;*/
                    }
                }
                .related-journals-list {
                    padding-left: 20px;
                    .journal-row-wrapper {
                        display: flex;
                        i.bullet {
                            margin-top: 2px;
                            font-size: 20px;
                            color: green;
                            margin-right: 5px;
                        }
                    }
                }
                .journal-row {

                }
            }

        }

    }

</style>
