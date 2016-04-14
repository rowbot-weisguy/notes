import React from 'react';
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import h from '../helpers';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://rowbot-notes.firebaseio.com/');

import Header from './Header';
import Sidebar from './Sidebar';
import Note from './Note';

@autobind
export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            notes: {},
            sidebar: 'IS_CLOSED',
            selected: null
        }
    }

    componentDidMount() {
        base.syncState('notes', {
            context: this,
            state: 'notes'
        });

        base.syncState('selected', {
            context: this,
            state: 'selected'
        });
    }

    createNote(event) {
        event.preventDefault();
        var note = {
            title: '',
            date: h.formatDate(new Date()),
            body: ''
        }
        this.addNote(note);
    }

    addNote(note) {
        var timestamp = (new Date()).getTime();
        this.state.notes['note-' + timestamp] = note;
        this.setState({ notes: this.state.notes });
    }

    selectNote(key) {
        this.state.selected = key;
        this.setState({ selected: this.state.selected })
        this.closeSidebar();
    }

    updateNote(key, title, body) {
        this.state.notes[key].title = title;
        this.state.notes[key].body = body;
        this.setState({ notes: this.state.notes });
    }

    deleteNote(key) {
        this.state.notes[key] = null;
        this.state({ notes: this.state.notes });
    }

    openSidebar() {
        this.state.sidebar = 'IS_OPEN';
        this.setState({ sidebar: this.state.sidebar });
    }

    closeSidebar() {
        this.state.sidebar = 'IS_CLOSED';
        this.setState({ sidebar: this.state.sidebar });
    }

    render() {
        return (
            <div className="layout app">
                <Header sidebar={this.state.sidebar} openSidebar={this.openSidebar} closeSidebar={this.closeSidebar} createNote={this.createNote} />
                <div className="layout__body">
                    <Sidebar sidebar={this.state.sidebar} notes={this.state.notes} selected={this.state.selected} selectNote={this.selectNote} deleteNote={this.deleteNote} />
                    <Note notes={this.state.notes} selected={this.state.selected} updateNote={this.updateNote} deleteNote={this.deleteNote} />
                </div>
            </div>
        )
    }
}
