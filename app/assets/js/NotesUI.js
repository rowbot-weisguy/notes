var NotesUI = (function() {
    var hooks = {
        create: '.js-create-note',
        destroy: '.js-delete-note',
        note: '.js-note',
        date: '.js-note-date',
        title: '.js-note-title',
        body: '.js-note-body',
        list: '.js-note-list',
        count: '.js-note-count',
        item: '.js-note-item',
        selected: '.is-selected'
    };

    var states = {
        selected: 'is-selected',
        empty: 'is-empty'
    };

    function renderNote(id) {
        var note = Notes.getNote(id);
        var dateEl = document.querySelector(hooks.date);
        var titleEl = document.querySelector(hooks.title);
        var bodyEl = document.querySelector(hooks.body);
        dateEl.innerHTML = 'Last edited at ' +
            note.date.hours + ':' + note.date.minutes + ' on ' +
            note.date.month + ' ' + note.date.date + ', ' +
            note.date.year;
        titleEl.value = note.title;
        bodyEl.value = note.body;
    }

    function renderList() {
        var notes = Notes.getNotes();
        var payload = '';
        var target = document.querySelector(hooks.list);
        var count = document.querySelector(hooks.count);

        notes.forEach(function(note, index) {
            payload = generatePreviewMarkup(note) + payload;
        });

        target.innerHTML = payload;
        count.innerHTML = notes.length + ' notes';
    }

    function generatePreviewMarkup(note) {
        var payload = '<li class="note-preview js-note-item" data-note-id=' + note.id + '>' +
        '<span class="note-preview__date">' + note.date.month + ' ' + note.date.date + ', ' + note.date.year + '</span>' +
        '<p class="note-preview__title">';
        if (note.title.length > 0) {
            payload += note.title;
        } else {
            payload += 'Untitled Note';
        }
        payload += '</p>';
        if (note.body.length > 0) {
            payload += '<p class="note-preview__excerpt">' + note.body + '</p>';
        }
        payload += '</li>';

        return payload;
    }

    function selectHandler(e) {
        var selected = document.querySelector(hooks.selected);
        var newSelection;

        if (e.target.matches(hooks.item)) {
            newSelection = e.target;
        } else {
            newSelection = e.target.closest(hooks.item);
        }

        if (selected) {
            selected.classList.remove(states.selected);
        }
        newSelection.classList.add(states.selected);
        document.querySelector(hooks.note).classList.remove(states.empty);
        renderNote(parseInt(newSelection.dataset.noteId));
    }

    function createHandler() {
        var newId = Notes.addNote();
        var newNote = Notes.getNote(newId);
        renderList();
        document.querySelector('[data-note-id="' + newId + '"]').click();
    }

    function deleteHandler() {
        var selectedId = getSelectedId();
        var nextId = selectedId - 1;
        Notes.deleteNote(selectedId);
        renderList();
        document.querySelector(hooks.date).innerHTML = '';
        document.querySelector(hooks.title).value = '';
        document.querySelector(hooks.body).value = '';
        if (document.querySelector(hooks.item) != null) {
            document.querySelector(hooks.item).click();
        } else {
            (document.querySelector(hooks.note).classList.add(states.empty));
        }
    }

    function updateHandler() {
        var id = getSelectedId();
        var title = document.querySelector(hooks.title).value;
        var body = document.querySelector(hooks.body).value;

        Notes.updateNote(id, title, body);
        renderList();
        document.querySelector('[data-note-id="' + id + '"]').classList.add(states.selected);
    }

    function getSelectedId() {
        var selected = document.querySelector(hooks.selected);
        if (selected != null) {
            return parseInt(selected.dataset.noteId);
        }
    }

    return {
        init: function() {
            if (Notes.getNotes().length > 0) {
                renderList();
                var initialNote = document.querySelector(hooks.item);
                var initialId = parseInt(initialNote.dataset.noteId);
                initialNote.classList.add(states.selected);
                renderNote(initialId);
            } else {
                document.querySelector(hooks.note).classList.add(states.empty);
            }

            var noteList = document.querySelector(hooks.list);
            var noteTitle = document.querySelector(hooks.title);
            var noteBody = document.querySelector(hooks.body);
            var createButton = document.querySelector(hooks.create);
            var deleteButton = document.querySelector(hooks.destroy);
            noteList.addEventListener('click', selectHandler);
            noteTitle.addEventListener('keyup', updateHandler);
            noteBody.addEventListener('keyup', updateHandler);
            createButton.addEventListener('click', createHandler);
            deleteButton.addEventListener('click', deleteHandler);
        }
    };
}());

NotesUI.init();
