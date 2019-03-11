<template>


    <div class="journal-zoom" v-if="server.journalZoom.id">


        <div class="top">
            <div class="main-col">

                <div class="row-1">
                    <div class="image" v-if="hasImage">
                        <img @error="noImg"
                             :src="'http://images.serialssolutions.com/ulrichs/' + server.journalZoom.id.replace('-', '') + '.gif'"
                             alt="">
                    </div>
                    <h1>
                        {{server.journalZoom.name}}
                    </h1>
                </div>

                <div class="text">
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

        </div>























        <div class="bottom">
            <div class="compliance"
                 :class="{yes: server.journalZoom.policy_compliance.compliant}"
                 v-if="server.funder.id">

                <div class="compliance-message yes" v-if="server.journalZoom.policy_compliance.compliant">
                    <h1>
                        <i class="far fa-thumbs-up"></i>
                        <div class="text">
                            Funder-approved!

                        </div>
                    </h1>
                    <div class="reason-container">
                        This journal complies with your funder's Open Access policy because
                        <span class="reason" v-show="server.journalZoom.policy_compliance.reason=='gold-oa'">
                            it's a fully CC-BY Open Access journal. <a
                                href="https://www.coalition-s.org/">(learn more)</a>
                        </span>

                        <span class="reason"
                              v-show="server.journalZoom.policy_compliance.reason=='funder-specific-agreement'">
                            of a special arrangement between its publisher and {{store.server.funder.name}}.
                        </span>

                        <span class="reason"
                              v-show="server.journalZoom.policy_compliance.reason=='transformative-agreement'">
                            of a transformative agreement signed between its publisher and {{store.server.institution.name}} (Agreement: {{ server.journalZoom.policy_compliance.transformative_agreement_id }})
                        </span>
                    </div>
                </div>


                <div class="compliance-message no" v-if="!server.journalZoom.policy_compliance.compliant">
                    <h1>
                        <i class="far fa-thumbs-down"></i>
                        <div class="text">
                            Doesn't meet funder guidelines
                        </div>


                    </h1>
                    <div class="reason-container">
                        This journal doesn't satistfy your funder's Open Access policy because
                        <span class="reason" v-show="!server.journalZoom.policy_compliance.reason.length">
                            it's not a fully CC-BY Open Access journal. <a href="https://www.coalition-s.org/">(learn more)</a>
                        </span>

                        <span class="reason"
                              v-show="server.journalZoom.policy_compliance.reason.length && server.journalZoom.policy_compliance.reason[0]=='mirror-journal'">
                            it's an OA mirror journal. <a
                                href="https://www.insidehighered.com/news/2019/01/24/european-commission-envoy-warns-about-mirror-journals-way-around-open-access">(learn more)</a>
                        </span>
                    </div>
                </div>





                <div class="related-journals" v-show="!server.journalZoom.policy_compliance.compliant">
                    <div class="related-journals-header">
                        <h1 class="alternatives">
                            <i class="fas fa-exchange-alt"></i>
                            Alternatives available
                        </h1>
                        <div class="explanation">
                            These related journals <em>do</em> meet your funder's guidelines:
                        </div>

                    </div>

                    <div class="related-journals-list">
                        <div class="journal-row-wrapper"
                             v-for="myJournal in server.journalZoom.similar_journals.slice(0, 5)">
                            <journal-row :journal="myJournal"></journal-row>

                        </div>

                    </div>


                </div>
            </div>











            <div class="infographic" v-if="store.server.journalZoom.policy_compliance.compliant">

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
                        <div class="minor">in {{ store.server.journalZoom.topics[0][0].replace(" (miscellaneous)",
                            "") }}
                        </div>
                    </div>


                    <div class="also">

                        <div class="peer-review also-row"
                             v-show="store.server.journalZoom.oa_details.review_process">
                            <a :href="store.server.journalZoom.oa_details.review_process_url">
                                <i class="fas fa-certificate"></i>
                                Peer reviewed
                            </a>
                        </div>
                        <div class="plagiarism-policy also-row"
                             v-show="store.server.journalZoom.oa_details.plagiarism_screening_policy">
                            <a :href="store.server.journalZoom.oa_details.plagiarism_screening_policy_url">
                                <i class="fas fa-search"></i>
                                Plagiarism screening
                            </a>
                        </div>

                    </div>
                </div>


                <!--PRICE INFOBOX-->
                <div class="infobox price" v-if="store.server.journalZoom.oa_details.apc_fee">
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
                <div class="infobox speed" v-if="store.server.journalZoom.oa_details.weeks_submission_to_publication">
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
                <div class="infobox license" v-if="store.server.journalZoom.oa_details.license">
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
                        <div class="also-row"
                             v-show="store.server.journalZoom.oa_details.author_holds_copyright_no_restictions">
                            <a :href="store.server.journalZoom.oa_details.copyright_url">
                                <i class="far fa-copyright"></i>
                                Author holds copyright
                            </a>
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
            noImg: function () {
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
        font-size: 16px;
        display: flex;
        .top {
            flex: 2;
            /*background: #eee;*/
            .main-col {
                padding: 20px;

                .row-1 {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    h1 {
                        margin: 0;
                        line-height: 1.3;
                    }
                    margin-bottom: 10px;
                    .image {
                        margin: 5px 15px 0 0;
                        /*flex: 1 100px 75px;*/
                        max-width: 100px;
                        width: 100px;
                        min-width: 100px;
                        img {
                            border: 1px solid #ddd;
                            /*max-height: 100px;*/
                            /*max-height: 200px;*/

                        }
                    }
                }

                .text {
                    font-size: 16px;
                    line-height: 1.5;

                    .row.publisher {
                        .flag-icon {
                            margin-right: 5px;
                        }
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
        }

        .bottom {
            flex: 3;
            padding:  20px;
            margin-bottom: 50px;

            .compliance {
                &.yes {
                    background: #fff;
                }
                /*background: lightpink;*/

                h1 {
                    display: flex;
                    margin: 0;
                    margin-bottom: 5px;
                    line-height: 1.3;
                    i {
                        margin-right: 4px;
                    }
                    .fa-thumbs-down {
                        margin-top: 5px;
                    }
                }
                .compliance-message {
                    padding: 20px;
                    &.no {
                        h1 { color: #D50000;}
                        background: #FFEBEE;
                    }
                    &.yes {
                        h1 { color: darkgreen;}
                        background: #E8F5E9;
                    }

                }
                .noncompliant {
                    h1 {
                        color: red;
                    }
                }
                .reason-container {
                    font-size: 16px;
                }

            }

            .infographic {
                display: flex;
                flex-wrap: wrap;
                min-height: 200px;
                margin: 10px -5px;
                .infobox {
                    margin: 5px;
                    flex: 1 1 220px;
                    justify-content: space-between;
                    /*background: #fafafa;*/
                    padding: 20px;
                    background: #fafafa;
                    /*box-shadow: 0px 3px 6px 2px rgba(0,0,0,0.1);*/

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
                                /*border: 1px solid #ccc;*/
                                border-top: 1px solid #ddd;
                                /*background: #fff;*/
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
                background: #E8F5E9;
                .related-journals-header {
                    padding: 20px;
                    /*border-bottom: 1px solid #ddd;*/
                    h1 {
                        padding: 0;
                        margin: 0;
                        line-height: 1.3;
                        color: green;
                    }
                }

                /*background: lightpink;*/
                /*border: 1px solid #ddd;*/
                /*background: #fafafa;*/
                margin-top: 5px;
                border-radius: 3px;
                div.explanation {
                    padding-bottom: 5px;
                }
                .related-journals-list {
                    padding: 0 20px;
                    .journal-row-wrapper {
                        display: flex;
                    }
                }
                .journal-row {
                    background: #fff;
                    .name {
                    }
                    width: 100%;
                }
            }

        }

    }

</style>
