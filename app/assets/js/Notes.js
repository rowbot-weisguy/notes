var Notes = (function() {
    var notes;
    var LOCAL_STORAGE_KEY = 'notes';

    function loadNotes() {
        if (localStorage.getItem(LOCAL_STORAGE_KEY) != null) {
            notes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        } else {
            notes = [];
        }
    }

    function saveNotes() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    }

    function generateId() {
        var largestId = 0;
        notes.forEach(function(note) {
            if (note.id > largestId) {
                largestId = note.id;
            }
        });
        return largestId + 1;
    }

    function getLowestId() {
        var lowestId = 0;
        notes.forEach(function(note) {
            if (note.id < lowestId) {
                lowestId = note.id;
            }
        });
        return lowestId;
    }

    function formatDate(d) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        return {
            year: d.getFullYear(),
            month: monthNames[d.getMonth()],
            date: d.getDate(),
            hours: d.getHours(),
            minutes: d.getMinutes()
        };
    }

    return {
        init: function() {
            loadNotes();
        },

        getNotes: function() {
            return notes;
        },

        getNote: function(id) {
            var theNote;
            notes.forEach(function(note, index) {
                if (note.id === id) {
                    theNote = note;
                }
            });
            return theNote;
        },

        addNote: function() {
            var newNote = {
                id: generateId(),
                date: formatDate(new Date()),
                title: '',
                body: ''
            };

            notes.push(newNote);
            saveNotes();
            return newNote.id;
        },

        deleteNote: function(id) {
            notes.forEach(function(note, index) {
                if (note.id === id) {
                    notes.splice(index, 1);
                }
            });
            notes.length;
            saveNotes();
        },

        updateNote: function(id, title, body) {
            notes.forEach(function(note) {
                if (note.id === id) {
                    note.date = formatDate(new Date());
                    note.title = title;
                    note.body = body;
                }
            });
            saveNotes();
        }

    };
}());

Notes.init();
