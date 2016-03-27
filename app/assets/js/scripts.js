
var testNotes = [
    {
        'id': 73,
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    },
    {
        'id': 74,
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    },
    {
        'id': 75,
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    },
    {
        'id': 76,
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    },
    {
        'id': 77,
        'date': 'March 27th',
        'title': 'Test note',
        'body': 'Test content...'
    }
];

// Notes
// ---
// display selected note
// make note
// update note
// delete note
// get list of notes (and automatically select the first one)
// save to localStorage

var Notes = (function() {
    return {
        notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : testNotes,

        getLargestId: function() {
            var largestId = 0;
            Notes.notes.forEach(function(note) {
                if (note.id > largestId) {
                    largestId = note.id;
                }
            });
            return largestId;
        },

        saveNotes: function() {
            localStorage.setItem('notes', JSON.stringify(notes));
        },

        addNote: function() {
            var newNote = {
                id: (Notes.getLargestId() + 1),
                date: Date.now(),
                title: '',
                body: ''
            };

            Notes.notes.push(newNote);
            saveNotes();
            return newNote.id;
        },

        updateNote: function(id, title, body) {
            Notes.notes.forEach(function(note) {
                if (note.id === id) {

                }
            });
            saveNotes();
        },
        deleteNote: function(id) {

            saveNotes();
        },
        getNote: function(id) {
            var chosenNote;
            Notes.notes.forEach(function(note, ) {
                if (note.id === id) {
                    chosenNote = note;
                }
            });
            return chosenNote;
        },
        getAllNotes: function() {
            return Notes.notes;
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

// var NotesUI = (function() {
//     return {
//         renderNote: function(id) {

//         },
//         renderList: function() {

//         },
//         selectHandler: function() {

//         },
//         createHandler: function() {
//             var newNote = Notes.addNote();
//         },
//         deleteHandler: function() {

//         },
//         updateHandler: function() {

//         }
//     };
// }());
