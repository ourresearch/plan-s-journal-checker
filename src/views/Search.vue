<template>
    <div class="page search">
        <h1>Find a journal</h1>

        <div class="input">
            <input type="text" id="querybox" v-model="query">
        </div>

        <div class="results">
            <div class="result" v-for="result in results">
                {{result.name}}
            </div>

        </div>



    </div>


</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'


    export default {
        name: "Search",
        data: () => ({
            query: null,
            loading: true,
            results: [],
            apiUrl: "http://api.rickscafe.io/search/journals/title/"
        }),
        computed: {
        },
        methods: {
            getJournals(){
                let that = this

                let getJournalsFromApi = function(){
                    console.log("getting journals")
                    that.loading = true
                    axios.get(that.apiUrl + that.query)
                        .then(resp => {
                            that.results = resp.data.list
                            that.loading = false
                        })
                        .catch(e => {
                            console.log("error from server", e)
                            that.loading = false
                            that.results = []
                        })
                }

                getJournalsFromApi()

            },
        },
        mounted() {
            // this.doQuery()
        },
        watch: {
            query: _.debounce(function(oldVal, newVal){
                console.log("query changed", oldVal, newVal)
                this.getJournals()
            }, 100)

            // "$route"(to, from){
            //     console.log("route change", to, from)
            //     this.doQuery()
            // }
        }
    }
</script>

<style scoped lang="scss">

    #querybox {
        font-size: 30px;
        padding: 10px;
        border-radius: 5px;
        border: 3px solid #ccc;
        width: 100%;
    }


</style>















