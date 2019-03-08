
export const store = {

    state: {
        institution: null,
        funder: null,
        topic: null,
        text: null,
        journal: null
    },

    setInstitution(id){
        this.state.institution = id
    },
    setFunder(id){
        this.state.funder = id
    },
    setTopic(topic){
        this.text = null
        this.state.topic = topic
    },
    setText(text){
        this.topic = null
        this.state.text = text
    },
    setJournal(issn){
        this.state.journal = issn
    },

    getAsQueryObj(){
        let ret = {}
        Object.entries(this.state)
            .filter(x => {return x[1]}) // remove falsey values
            .forEach(x => {
                ret[x[0] = ret[x[1]]] // make back into an object
            })
        return ret
    },

};

