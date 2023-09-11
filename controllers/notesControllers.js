// IMPORT MODELS

const notesByUsername = async (req, res) => {
    /* GET ALL NOTES FOR A USER
    
    reqs = {
        params: username
        body: [searched string?]
    }
    */
}

const createNote = async (req, res) => {
    /* POSTS NEW NOTES TO DB
    
    reqs = {
        params: username
        body: [searched string?]
    }
    */
}

const updateNote = async (req, res) => {
    /* UPDATES A NOTE IN DB
    
    reqs = {
        params: username
        body: [searched string?]
    }
    */
}



const noteByTitle = async (req, res) => {
    /* GET ONE NOTE BASED ON TITLE
    
    reqs = {
        params: username
        body: [searched string?]
    }
    */
}

const notesByTag = async (req, res) => {
    /* GET ALL NOTES BASED ON TAG && USER

    reqs = {
        params: username
        body: [searched string?]
    }
    */
}

const deleteById = async (req, res) => {
    /* DELETE A NOTE DOCUMENT BASED ON ID

    reqs = {
        params: username
        body: [searched string?]
    }
    */
}

// If users can search based on notes content
// const NotesByContent = async (req, res) => {
//     /* 
//     reqs = {
//         params: username
//         body: [searched string?]
//     }
//     */
// }

module.exports = {
    notesByUsername,
    createNote,
    updateNote,
    noteByTitle,
    notesByTag,
    deleteById
}
