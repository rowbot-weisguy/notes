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
        entering: 'is-entering',
        selected: 'is-selected',
        leaving: 'is-leaving',
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
        titleEl.focus();
    }

    function renderList() {
        var notes = Notes.getNotes();
        var list = document.querySelector(hooks.list);
        list.innerHTML = '';

        notes.forEach(function(note, index) {
            var noteEl = generateNote(note);
            list.insertBefore(noteEl, list.firstChild);
        });

        renderCount();
    }

    function renderCount() {
        var count = document.querySelector(hooks.count);
        count.innerHTML = Notes.getNotes().length + ' notes';
    }

    function generateNote(note) {
        var noteEl = document.createElement('li');
        noteEl.classList.add('note-preview', 'js-note-item');
        noteEl.setAttribute('data-note-id', note.id);

        var dateEl = document.createElement('span');
        dateEl.classList.add('note-preview__date');
        dateEl.textContent = note.date.month + ' ' + note.date.date + ', ' + note.date.year;

        var titleEl = document.createElement('p');
        titleEl.classList.add('note-preview__title');
        titleEl.textContent = note.title.length > 0 ? note.title : 'Untitled Note';

        var bodyEl = document.createElement('p');
        bodyEl.classList.add('note-preview__excerpt');
        bodyEl.textContent = note.body;

        noteEl.appendChild(dateEl);
        noteEl.appendChild(titleEl);
        // noteEl.appendChild(bodyEl);

        return noteEl;
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

    function createHandler(e) {
        e.preventDefault();
        var createButtons = document.querySelectorAll(hooks.create);
        for (var i = 0; i < createButtons.length; i++) {
            createButtons[i].removeEventListener('click', createHandler);
        }
        var newId = Notes.addNote();
        var note = Notes.getNote(newId);
        var noteEl = generateNote(note);
        var list = document.querySelector(hooks.list);
        list.insertBefore(noteEl, list.firstChild);
        noteEl.click();
        noteEl.classList.add(states.entering);
        noteEl.addEventListener(whichTransitionEvent(), function() {
            noteEl.classList.remove(states.entering);
            for (var i = 0; i < createButtons.length; i++) {
                createButtons[i].addEventListener('click', createHandler);
            }
            renderCount();
        });
    }

    function deleteHandler(e) {
        e.preventDefault();
        var deleteButtons = document.querySelectorAll(hooks.destroy);
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].removeEventListener('click', deleteHandler);
        }
        var selectedEl = getSelectedElement();
        var selectedId = getSelectedId();

        selectedEl.classList.add(states.leaving);
        selectedEl.addEventListener(whichTransitionEvent(), function() {
            selectedEl.parentNode.removeChild(selectedEl);
            Notes.deleteNote(selectedId);

            document.querySelector(hooks.date).innerHTML = '';
            document.querySelector(hooks.title).value = '';
            document.querySelector(hooks.body).value = '';

            if (document.querySelector(hooks.item) != null) {
                document.querySelector(hooks.item).click();
            } else {
                (document.querySelector(hooks.note).classList.add(states.empty));
            }
            for (var i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener('click', deleteHandler);
            }
            renderCount();
        });
    }

    function updateHandler(e) {
        var id = getSelectedId();
        var title = document.querySelector(hooks.title).value;
        var body = document.querySelector(hooks.body).value;

        Notes.updateNote(id, title, body);
        renderList();
        document.querySelector('[data-note-id="' + id + '"]').classList.add(states.selected);
    }

    function getSelectedElement() {
        return document.querySelector(hooks.selected);
    }

    function getSelectedId() {
        var selected = getSelectedElement();
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
            var createButtons = document.querySelectorAll(hooks.create);
            var deleteButtons = document.querySelectorAll(hooks.destroy);
            noteList.addEventListener('click', selectHandler);
            noteTitle.addEventListener('keyup', updateHandler);
            noteBody.addEventListener('keyup', updateHandler);
            for (var i = 0; i < createButtons.length; i++) {
                createButtons[i].addEventListener('click', createHandler);
            }
            for (var i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener('click', deleteHandler);
            }
        }
    };
}());

NotesUI.init();
