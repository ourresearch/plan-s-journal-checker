<template>



    <div class="journal-zoom" v-if="server.journalZoom.id">

        <!--<pre>-->
            <!--journal.id: {{journal.id}}-->
            <!--server.journalZoom.id: {{server.journalZoom.id}}-->
            <!--store.server.journalZoom.id: {{store.server.journalZoom.id}}-->
        <!--</pre>-->


        <div class="top">
            <div class="main-col">
                <div class="image">
                    <img :src="'http://images.serialssolutions.com/ulrichs/' + server.journalZoom.id.replace('-', '') + '.gif'" alt="">
                </div>
                <div class="text">
                    <h1>
                        {{server.journalZoom.name}}
                        <small class="issn">
                            {{server.journalZoom.id}}
                        </small>
                    </h1>
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

        <div>
            <h2>similar journals</h2>
            <div class="similar" v-for="myJournal in server.journalZoom.similar_journals">
                <journal-row :journal="myJournal"></journal-row>

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
                server: store.server
            };
        },
        methods: {
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
                h1 {
                    margin: 0;
                    small {
                        font-size: 50%;
                        font-weight: normal;
                    }
                }
            }
        }

    }

</style>
