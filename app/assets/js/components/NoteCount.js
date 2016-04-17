import React from 'react';
import autobind from 'autobind-decorator';
import h from '../helpers';

@autobind
export default class NoteCount extends React.Component {

    findNextNote() {
        if (this.props.notes[this.props.selected - 1] != null) {
            return this.props.selected - 1;
        } else if (this.props.notes[this.props.selected + 1] != null) {
            return this.props.selected + 1;
        } else {
            return 'EMPTY';
        }
    }

    handleDelete(event) {
        this.props.deleteNote(this.props.selected);
        this.props.selectNote(this.findNextNote());
    }

    render() {
        var noteWord = h.pluralize(this.props.count, 'note');
        return (
            <div className='sidebar__bottom-wrapper'>
                <span className='note-preview__count'>{this.props.count + ' ' + noteWord}</span>
                <button className='note__delete note__delete--sidebar' onClick={this.handleDelete} ><i className='icon-trash'></i><span className='sr-only'>Delete Note</span></button>
            </div>
        )
    }
}
