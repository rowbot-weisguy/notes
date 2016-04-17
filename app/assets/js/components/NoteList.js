import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import autobind from 'autobind-decorator';

@autobind
export default class NoteList extends React.Component {

    renderNote(note, key) {
        return (
            <li key={key} className={'note-preview' + (key === this.props.selected ? ' is-selected' : '')} onClick={this.props.selectNote.bind(null, key)}>
                <p className='note-preview__date'>{note.date.month + ' ' + note.date.date + ', ' + note.date.year}</p>
                <p className='note-preview__title'>{note.title.length > 0 ? note.title : 'Untitled Note'}</p>
            </li>
        )
    }

    render() {
        return (
            <CSSTransitionGroup
                className='note-preview__list layout__sidebar-scroll'
                component='ul'
                transitionName='note-preview'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {this.props.notes.map(this.renderNote).reverse()}
            </CSSTransitionGroup>
        )
    }
}
