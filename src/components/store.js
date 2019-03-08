import axios from 'axios'
export const store = {


    baseEndpoint: "https://rickscafe-api.herokuapp.com/",
    endpoints: {
        topic: "topic/",
        text: "search/journals/",
        journal: "journal/",
        institution: "institution/",
        funder: "funder/",
    },

    state: {
        institution: null,
        funder: null,
        topic: null,
        text: null,
        journal: null,
        journalInputDisplayStr: "",
    },

    isLoading: false,
    showJournalZoom: false,
    server: {
        institution: {},
        funder: {},
        journalList: {},
        journalZoom: {}

    },

    fetchJournalList(searchType, searchTerm){
        if (!searchTerm){
            this.state[searchType] = null
            this.server.journalList = {}
            return
        }


        let url = this.baseEndpoint
        url += this.endpoints[searchType] + searchTerm
        url += "?institution=" + this.state.institution
        url += "&funder=" + this.state.funder

        console.log("store.getJournalList() getting this url", url)
        this.isLoading = true
        axios.get(url)
            .then(response => {
                console.log("store.getJournalList() got response: ", response.data)
                this.server.journalList = response.data
                this.isLoading = false
            })
            .catch(e => {
                this.isLoading = false
                this.server.journalList = {}
            })
    },


    setInstitution(id) {
        this.state.institution = id
        if (!id){
            this.server.institution = {}
            return
        }
        let url = this.baseEndpoint + this.endpoints.institution + id
        console.log("store.getInstitution() getting this url", url)
        this.isLoading = true
        axios.get(url)
            .then(response => {
                console.log("store.getJournalZoom() got response: ", response.data)
                this.server.institution = response.data
                this.isLoading = false
            })
            .catch(e => {
                this.isLoading = false
                this.server.institution = {}
            })
    },
    setFunder(id) {
        this.state.funder = id
        if (!id){
            this.server.funder = {}
            return
        }

        let url = this.baseEndpoint + this.endpoints.funder  + id
        console.log("store.getFunder() getting this url", url)
        this.isLoading = true
        axios.get(url)
            .then(response => {
                console.log("store.getFunder() got response: ", response.data)
                this.server.funder = response.data
                this.isLoading = false
            })
            .catch(e => {
                this.isLoading = false
                this.server.funder = {}
            })
    },

    setTopic(topic) {
        // clear out everything that's not topic
        this.state.text = null
        this.state.journal = null
        this.server.journalZoom = {}

        // get the list from the server
        this.state.topic = topic
        this.fetchJournalList("topic", topic)


    },
    setText(text) {
        // clear out everything that's not text
        this.state.topic = null
        this.state.journal = null
        this.server.journalZoom = {}

        // get the list from the server
        this.state.text = text
        this.fetchJournalList("text", text)
    },

    setJournal(issn) {
        this.state.journal = issn
        this.showJournalZoom = true
        this.state.journalInputDisplayStr = "NEW JOURNAL!"

        if (!issn){
            this.server.journalZoom = {}
            this.showJournalZoom = false
            return
        }

        let url = this.baseEndpoint
        url += this.endpoints["journal"] + issn
        url += "?institution=" + this.state.institution
        url += "&funder=" + this.state.funder

        console.log("store.getJournalZoom() getting this url", url)
        this.isLoading = true
        axios.get(url)
            .then(response => {
                console.log("store.getJournalZoom() got response: ", response.data)
                this.server.journalZoom = response.data
                this.isLoading = false
            })
            .catch(e => {
                this.isLoading = false
                this.server.journalZoom = {}
            })
    },

    getAsQueryObj() {
        let ret = {}
        Object.entries(this.state)
            .filter(x => {
                return x[1]
            }) // remove falsey values
            .forEach(x => {
                ret[x[0] = ret[x[1]]] // make back into an object
            })
        return ret
    },

};

