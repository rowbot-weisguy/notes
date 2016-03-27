// Notes
// ---
// display selected note
// make note
// update note
// delete note
// get list of notes (and automatically select the first one)
// save to localStorage

var testNotes = [
    {
        'id': '73',
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    },
    {
        'id': '74',
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    },
    {
        'id': '75',
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    },
    {
        'id': '76',
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    },
    {
        'id': '77',
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    }
];

var Notes = (function() {

    var notes = testNotes;
    var currentNote;
    console.log(notes);

    saveNotes: function() {

    },

    return {
        addNote: function() {

        },
        updateNote: function(title, date, body) {

        },
        deleteNote: function(id) {

        },
        getNote: function(id) {

        },
        getAllNotes: function() {

        }
    };
}());


// Notes UI
// ---
// render notes
// render list
// handle 'select note' clicks
// handle 'create note' clicks
// handle 'delete note' clicks
// handle 'updates' to notes

var NotesUI = (function() {
    return {
        renderNote: function(id) {

        },
        renderList: function() {

        },
        selectHandler: function() {

        },
        createHandler: function() {

        },
        deleteHandler: function() {

        },
        updateHandler: function() {

        }
    };
}());
