import React from 'react';
import autobind from 'autobind-decorator';

@autobind
export default class NoteCount extends React.Component {

    render() {
        var count = Object.keys(this.props.notes).length;
        var countText = (count > 0 ? (count === 1 ? count + ' note' : count + ' notes') : 'No notes :(');
        return (
            <div className='sidebar__bottom'>
                <span className='note-preview__count'>{countText}</span>
                <a className='note__delete note__delete--sidebar js-delete-note' href='#'><i class='icon-trash'></i><span class='sr-only'>Delete Note</span></a>
            </div>
        )
    }
}
