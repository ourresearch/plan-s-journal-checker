<template>
    <div class="page journal">
        <h2>Journal Name</h2>


    </div>
</template>

<script>
    import axios from 'axios'

    const toLower = text => {
        return text.toString().toLowerCase()
    }

    const searchByName = (items, term) => {
        if (term) {
            return items.filter(item => toLower(item.name).includes(toLower(term)))
        }

        return items
    }

    export default {
        name: 'Journal',
        data: () => ({
            isLoading: true,
            papers: [],
            search: null,
            searchedPapers: [],
            name: {},
            webpage: null
        }),
        components: {
            axios
        },
        metaInfo() {
            return {
                title: this.fullName
            }
        },
        computed: {
            fullName() {
                if (this.name){
                    return this.name.given + " "
                        + this.name.middle + " "
                        + this.name.family
                }
                else {
                    return "Unknown name"
                }
            },
            personId() {
                return this.$route.params.id
            }
        },
        methods: {
            viewPaper(pmid){
                let paperUrl = "/person/" + this.$route.params.id +  "/paper/" + pmid
                this.$router.push(paperUrl)
            },
            loadPapers() {
                let url = "https://osat-api.herokuapp.com/person/" + this.personId
                axios.get(url)
                    .then(resp => {
                        console.log("loading papers!", resp.data)


                        this.name = resp.data.name
                        this.webpage = resp.data.nih_webpage
                        this.searchedPapers = resp.data.papers
                        this.loading = false
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.loading = false
                    })
            }
        },
        mounted() {
            this.loadPapers()
        }
    }
</script>


<style scoped lang="scss">

    .page-header {
        h2 {
            margin: 0;
        }
        border-bottom: 1px solid #333;
        margin-bottom: 60px;
    }
    .section-header {
        display: flex;
        margin-bottom: 20px;
        align-items: flex-end;
        margin-top: 10px;
        border-bottom: 1px solid #eee;
        h3 {
            margin: 0;
        }
        p {
            margin: 0;
            font-size: 12px;
        }
        .content {

        }
        .spacer {
          flex: 1;
        }
        .controls {
          font-size: 12px;
          margin-bottom: 3px;
          a {
            padding: 3px 5px;
          }
        }
    }

    .fa-times {
        opacity: .5;
        color: red;
    }
    .fa-check {
        color: green;
    }
    .fa-hourglass-half {
        color: gold;
    }

    td {
        cursor: pointer
    }



</style>
