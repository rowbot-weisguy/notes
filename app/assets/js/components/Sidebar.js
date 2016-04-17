import React from 'react';
import autobind from 'autobind-decorator';

import NoteList from './NoteList';
import NoteCount from './NoteCount';

@autobind
export default class Sidebar extends React.Component {

    render() {
        return (
            <nav className={'layout__sidebar sidebar ' + (this.props.sidebar === 'IS_OPEN' ? 'is-open' : '')}>
                <div className='sidebar__main'>
                    <NoteList notes={this.props.notes} selected={this.props.selected} selectNote={this.props.selectNote} />
                </div>
                <div className='sidebar__bottom'>
                    <NoteCount count={this.props.notes.length} notes={this.props.notes} selected= {this.props.selected} selectNote={this.props.selectNote} deleteNote = {this.props.deleteNote} />
                </div>
            </nav>
        )
    }
}
