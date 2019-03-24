<template>


    <div class="transag">
        <div class="heading">
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
                apiUrl: "http://api.rickscafe.io/transformative-agreement/73840bfe",
                store: store,
                transag: {},
                transagId: null
            };
        },
        methods: {
            fetchTransag() {
                console.log("loading transformative agreement!")
                let url = this.apiUrl
                axios.get(url)
                    .then(resp => {
                        console.log("got this back: ", resp.data)
                        this.transag = resp.data
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        this.isLoadingPersons = false
                    })
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

    .journal-zoom {

    }

</style>
