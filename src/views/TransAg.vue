<template>


    <div class="trans-ag">




    </div>
</template>

<script>
    import JournalRow from '../components/JournalRow'
    import {store} from '../store.js'

    export default {
        name: 'JournalZoom',
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
        directives: {
            ImgFallback
        },
        watch: {}
    }
</script>


<style lang="scss">

    .journal-zoom {

    }

</style>
