<template>


    <div class="trans-ag">
        <div class="heading">
            <h2 class="label">transformative agreement #42:</h2>
            <h1>MIT and Royal Society</h1>
        </div>




    </div>
</template>

<script>
    import JournalRow from '../components/JournalRow'
    import {store} from '../store.js'

    export default {
        name: 'TransAg',
        components: {
            JournalRow
        },
        data() {
            return {
                store: store
            };
        },
        methods: {
        },
        watch: {}
    }
</script>


<style lang="scss">

    .journal-zoom {

    }

</style>
