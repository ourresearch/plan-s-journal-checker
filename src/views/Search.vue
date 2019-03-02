<template>
    <div class="page search">
        <h1>search</h1>




    </div>


</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Search',
        data: () => ({
        }),
        components: {
            axios
        },
        metaInfo: {
            title: 'Search'
        },
        computed: {

        },
        methods: {
            loadPersons() {
                console.log("loading persons!")
                let url = "https://osat-api.herokuapp.com/persons"
                axios.get(url)
                    .then(resp => {
                        this.persons = resp.data.results
                        this.searchedPersons = this.persons
                        this.isLoadingPersons = false
                        console.log("got this back: ", this.persons)
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.isLoadingPersons = false
                    })
            },
            loadPapers() {
                console.log("loading papers!")
                let url = "https://osat-api.herokuapp.com/papers"
                axios.get(url)
                    .then(resp => {
                        this.papers = resp.data.results
                        this.isLoadingPapers = false
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.isLoadingPapers = false
                    })
            },
            goToPerson(id){
                console.log("go to person", id)
                this.$router.push("/person/" + id)
            }
        },
        mounted() {
        }
    }
</script>


<style scoped lang="scss">

    .page {
        padding-top: 100px;
    }





</style>
