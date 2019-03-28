<template>


    <div class="page transag">
        <div class="warning">
            <div class="icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="msg">
                <strong>Pre-release:</strong>
                Data is preliminary and subject to verification.
            </div>
        </div>

        <div class="heading" v-if="transag">
            <h2 class="label">Transformative agreement {{transagId}}:</h2>
            <h1>
                <span class="subscriber">
                    {{transag.subscriber}}
                </span>
                and
                <span class="content-ownder">
                    {{transag.content_owner}}
                </span>
            </h1>
        </div>

        <div class="content" v-if="transag">
            <div class="dates" v-if="transag.start_date">
                <strong>Effective dates:</strong> <span class="date">{{transag.start_date}}</span> through <span class="date">{{transag.end_date}}</span>
            </div>
            <div class="more">
                <div class="link">
                    <strong>Link: </strong> <a :href="transag.link">{{transag.link}}</a>
                </div>
                <div class="notes" v-if="transag.notes">
                    <strong>Notes: </strong> {{ transag.notes }}
                </div>
                <div class="esac-id">
                    <strong>
                        ESAC ID:
                    </strong>
                    <span class="esac-id-true" v-if="transag.esac_id">
                        <a :href="'http://esac-initiative.org/about/transformative-agreements/agreement-registry/' + transag.esac_id">{{transag.esac_id}}</a>
                    </span>
                    <span class="esac-id-false" v-if="!transag.esac_id">
                        <a href="http://esac-initiative.org/about/transformative-agreements/agreement-registry/">Not listed on ESAC</a>
                    </span>
                </div>

                <div class="download">
                    <strong>Download:</strong>
                    <a href="" @click.prevent="comingSoon" class="csv">CSV</a> or
                    <a :href="'https://api.rickscafe.io/transformative-agreement/' + transag.id" target="_blank" class="json">JSON</a>
                </div>
            </div>


            <div class="parties">
                <div class="institutions party">
                    <h2>{{transag.matches.institutions.length}}
                        Institution<span v-show="transag.matches.institutions.length > 1">s</span> covered
                    </h2>
                    <div class="match institution"
                         v-if="index <= 10 || showAllInstitutions"
                         v-for="(institution, index) in transag.matches.institutions">
                        {{institution.name}}
                    </div>

                    <div class="show-all" v-show="transag.matches.institutions.length > 10 && !showAllInstitutions">
                        ...and {{ transag.matches.institutions.length - 10 }} others
                        <a href="" @click.prevent="showAllInstitutions=true">(show)</a>
                    </div>


                </div>

                <div class="journals party">
                    <h2>{{transag.matches.journals.length}}
                        Journal<span v-show="transag.matches.journals.length > 1">s</span> covered
                    </h2>
                    <div class="match institution"
                         v-if="index <= 10 || showAllJournals"
                         v-for="(journal, index) in transag.matches.journals">
                        {{journal.name}}
                    </div>

                    <div class="show-all" v-show="transag.matches.journals.length > 10 && !showAllJournals">
                        ...and {{ transag.matches.journals.length - 10 }} others
                        <a href="" @click.prevent="showAllJournals=true">(show)</a>
                    </div>


                    <div class="sorry" v-if="!transag.matches.journals.length">
                        Sorry, looks like we're still working on this. We'll have it filled in before our launch in  summer 2019.
                    </div>
                </div>

            </div>

        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    import JournalRow from '../components/JournalRow'
    import {store} from '../store.js'

    export default {
        name: 'TransAg',
        components: {
            JournalRow
        },
        data() {
            return {
                apiUrl: "http://api.rickscafe.io/transformative-agreement/",
                store: store,
                transag: null,
                transagId: null,
                showAllInstitutions: false,
                showAllJournals: false
            };
        },
        methods: {
            fetchTransag() {
                console.log("loading transformative agreement!")
                let url = this.apiUrl + this.$route.params.id
                axios.get(url)
                    .then(resp => {
                        console.log("got this back: ", resp.data)
                        this.transag = resp.data
                    })
                    .catch(e => {
                        console.log("error from server", e)
                    })
            },
            comingSoon(){
                alert("This is not implemented yet.")
            }
        },
        watch: {},
        mounted() {
            this.fetchTransag()
            this.transagId = this.$route.params.id
        }
    }
</script>


<style lang="scss">

    .warning {
        display: flex;
        margin-bottom: 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid #ddd;
        .icon {
            padding-right: 5px;
        }
    }

    .page.transag {
        .heading {
            h2 {
                margin: 0;
            }
            h1 {
                margin: 0;
            }
        }
        .content {
            .parties {
                display: flex;
                .party {
                    flex: 1;
                    .show-all {
                        margin-top: 10px;
                        font-size: 80%;
                    }
                }
            }
        }
    }

</style>
