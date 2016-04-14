import React from 'react';
import autobind from 'autobind-decorator';

import NoteList from './NoteList';
import NoteCount from './NoteCount';

@autobind
export default class Sidebar extends React.Component {

    render() {
        return (
            <nav className={'layout__sidebar sidebar ' + (this.props.sidebar === 'IS_OPEN' ? 'is-open' : '')}>
                <NoteList notes={this.props.notes} selected={this.props.selected} selectNote={this.props.selectNote} />
                <NoteCount notes={this.props.notes} deleteNote = {this.props.deleteNote} />
            </nav>
        )
    }
}
