

export const store = {
    state: {
        journal: {},
        topic: "",
        institution: {}

    },
    setJournal(journalObj) {
        this.state.journal = journalObj
    },
    setInstitution(institutionObj){
        this.state.institution = institutionObj
    }
};

