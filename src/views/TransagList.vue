<template>


    <div class="page transag">
        <div class="heading">
            <h1>
                Transformative agreements
            </h1>
        </div>

        <div class="content">
            <div class="warning">
                <div class="icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="msg">
                    <strong>Pre-release:</strong>
                    Data is preliminary, subject to verification, and included here mostly for demonstration purposes. We'll be verifying these and adding a few dozen more before release.
                </div>
            </div>
            <div class="warning">
                <div class="icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="msg">
                    <strong>Plan S status is still evolving:</strong>
                    We'll continue to monitor Plan S guidelines to see which of these agreements meet current compliance standards.
                </div>
            </div>

            <div class="download">
                <strong>Download raw data:</strong>
                <a href="" @click.prevent="comingSoon" class="csv">CSV</a> or
                <a href="https://api.rickscafe.io/transformative-agreements" target="_blank" class="json">JSON</a>
            </div>

        <md-table v-model="transags">


              <md-table-row slot="md-table-row" slot-scope="{ item }" @click="visitTransag(item.id)">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Subscriber" md-sort-by="subscriber">{{ item.subscriber }}</md-table-cell>
                <md-table-cell md-label="Vendor" md-sort-by="content_owner">{{ item.content_owner }}</md-table-cell>
              </md-table-row>
            </md-table>
        </div>




    </div>
</template>

<script>
    import axios from 'axios'
    import {store} from '../store.js'

    export default {
        name: 'TransagList',
        components: {
        },
        data() {
            return {
                apiUrl: "https://api.rickscafe.io/transformative-agreements",
                transags: [],
                store: store
            };
        },
        computed: {

        },
        methods: {
            fetchTransagList() {
                console.log("loading transformative agreements list!")
                this.store.isLoading = true
                axios.get(this.apiUrl)
                    .then(resp => {
                        console.log("got this back: ", resp.data)
                        this.transags = resp.data.list
                        this.store.isLoading = false
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.store.isLoading = false
                    })
            },
            visitTransag(id){
                this.$router.push("/transformative-agreement/" + id)
            },
            comingSoon(){
                alert("Sorry, CSV download isn't ready yet...there's only JSON for now.")
            }
        },
        watch: {},
        mounted() {
            this.fetchTransagList()
        }
    }
</script>


<style lang="scss">
    .warning {
        display: flex;
        .icon {
            padding-right: 5px;
        }
    }

    .md-table {
        margin-top: 30px;
        .md-table-cell {
            font-size: 18px;
            cursor: pointer;
        }
    }

</style>
