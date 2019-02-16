<template>
    <div class="page search">
        <h1>Find a journal</h1>


    </div>


</template>

<script>
    import axios from 'axios'

    export default {
        name: "Search",
        data: () => ({
            loading: true,
            results: [],
            queryElapsed: 0.0
        }),
        computed: {
            apiUrl(){
                let searchTerm = this.$route.params.q
                let url = "https://api.unpaywall.org/search/" + searchTerm
                return url
            },
            cleanResults() {
                let ret
                ret = this.results.map(result => {
                    if (result.title === result.title.toUpperCase()) {
                        result.title = _.capitalize(result.title)
                    }
                    return result
                })

                ret = ret.filter(myResult => {
                    // example: http://localhost:8080/search/heart_disease
                    return myResult.title.length < 450
                })

                ret = ret.map(r => {
                    if (r.abstracts.length){
                        let abs = r.abstracts[0].abstract
                        r.displayAbstract = _.truncate(
                            r.abstracts[0].abstract,
                            {
                                length: 250,
                                separator: /,? +/
                            }
                        )
                    }
                    return r
                })

                ret = ret.map(r => {
                    let numAuths = r.author_lastnames.length
                    if (numAuths > 5){
                        let numHidden = numAuths - 5
                        r.displayAuthors = r.author_lastnames.slice(0, 5).join(", ") + `, and ${numHidden} others`
                    }
                    else {
                        r.displayAuthors = r.author_lastnames.join(", ")
                    }
                    return r
                })

                ret = ret.sort((a, b) => {
                    if (a.displayAbstract) {
                        return -1
                    }
                    else {
                        return 1
                    }
                })

                return ret



            }
        },
        methods: {
            doQuery(){
                console.log("doing query")
                this.loading = true
                axios.get(this.apiUrl)
                    .then(resp => {
                        this.results = resp.data.results
                        this.queryElapsed = resp.data.elapsed_seconds
                        this.loading = false
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.loading = false
                        this.queryElapsed = resp.data.elapsed_seconds
                    })
            }
        },
        mounted() {
            this.doQuery()
        },
        watch: {
            "$route"(to, from){
                console.log("route change", to, from)
                this.doQuery()
            }
        }
    }
</script>

<style scoped lang="scss">


</style>















