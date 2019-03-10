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


    getAsQueryObj(){
        let query = {}
        Object.entries(this.state)
            .forEach(x => {
                let k = x[0]
                let v = x[1]

                if (v){
                    query[k] = v
                }
            })

        return query
    },


    // setters
    // **************************************
    // **************************************


    setJournal(id){
      this.setState("journal", id)
    },
    setTopic(id){
      this.setState("topic", id)
    },
    setText(id){
      this.setState("text", id)
    },
    setFunder(id){
      this.setState("funder", id)
    },
    setInstitution(id){
      this.setState("institution", id)
    },

    setState(k, v){
        // setting a topic or text search effects other stuff too
        if (v && k === "topic") {
            this.state.text = null
            this.state.journal = null
        }
        else if (v && k === "text") {
            this.state.topic = null
            this.state.journal = null
        }

        this.state[k] = v
    },

    setFromQueryObj(obj){
        console.log("settign from query", obj)
        let that = this // dunno if this is needed, no time to test
        Object.entries(this.state).forEach(x => {
            let k = x[0]
            let newVal = obj[k]
            that.state[k] = newVal
            that.setState(k, newVal)
        })
    },









    // fetchers
    // **************************************
    // **************************************

    fetchAll(){
        this.fetchInstitution()
        this.fetchFunder()
        this.fetchJournalList()
        this.fetchJournalZoom()
    },


    fetchInstitution() {
        if (!this.state.institution){
            this.server.institution = {}
            return
        }
        let url = this.baseEndpoint + this.endpoints.institution + store.institution
        this.isLoading = true
        axios.get(url)
            .then(response => {
                this.server.institution = response.data
                this.isLoading = false
            })
            .catch(e => {
                this.isLoading = false
                this.server.institution = {}
            })
    },
    fetchFunder() {
        if (!this.state.funder){
            this.server.funder = {}
            return
        }
        let url = this.baseEndpoint + this.endpoints.funder  + store.funder
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

    fetchJournalList(){
        let q
        let searchType

        if (this.state.topic){
            q = this.state.topic
            searchType = "topic"
        }
        else if (this.state.text){
            q = this.state.text
            searchType = "text"
        }
        else {
            this.server.journalList = {}
            return
        }

        let url = this.baseEndpoint
        url += this.endpoints[searchType] + q
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

    fetchJournalZoom() {
        if (!this.state.journal){
            this.server.journalZoom = {}
            return
        }

        let url = this.baseEndpoint
        url += this.endpoints["journal"] + this.state.journal
        url += "?institution=" + this.state.institution
        url += "&funder=" + this.state.funder

        this.isLoading = true
        axios.get(url)
            .then(response => {
                console.log("store.getJournalZoom() got response: ", response.data)
                this.server.journalZoom = response.data
                this.isLoading = false
            })
            .catch(e => {
                console.log("store.getJournalZoom() had an error", e)
                this.isLoading = false
                this.server.journalZoom = {}
            })
    },


};

