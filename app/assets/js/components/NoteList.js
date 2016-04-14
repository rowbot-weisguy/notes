import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import autobind from 'autobind-decorator';

@autobind
export default class NoteList extends React.Component {

    renderNote(key) {
        let note = this.props.notes[key];

        return (
            <li key={key} className={'note-preview' + (key === this.props.selected ? ' is-selected' : '')} onClick={this.props.selectNote.bind(null, key)}>
                <p className='note-preview__title'>{note.title.length > 0 ? note.title : 'Untitled Note'}</p>
                <p className='note-preview__date'>{note.date.month + ' ' + note.date.date + ', ' + note.date.year}</p>
                {note.body.length > 0 ? <p className='note-preview__excerpt'>{note.body}</p> : ''}
            </li>
        )
    }

    render() {
        return (
            <CSSTransitionGroup
                className='sidebar__main note-preview__list'
                component='ul'
                transitionName='note-preview'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {Object.keys(this.props.notes).map(this.renderNote)}
            </CSSTransitionGroup>
        )
    }
}
