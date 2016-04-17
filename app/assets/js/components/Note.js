import React from 'react';
import autobind from 'autobind-decorator';
import config from '../helpers/config';

import Firebase from 'firebase';
const ref = new Firebase('https://rowbot-catch-of-the-day.firebaseio.com/');

@autobind
export default class Note extends React.Component {

    handleChange(event) {
        if (this.props.notes[this.props.selected]) {
            this.props.updateNote(this.props.selected, this.refs.title.value, this.refs.body.value);
        }
    }

    handleDelete(event) {
        this.props.deleteNote(this.props.selected);
    }

    getDateString(date) {
        let string = 'Last edited at ';
        string += (date.hours <= 12 ? date.hours : date.hours - 12);
        string += ':' + (date.minutes > 9 ? date.minutes : '0' + date.minutes);
        string += (date.hours > 11 ? 'pm' : 'am');
        string += ' on ' + date.month + ' ' + date.date + ', ' + date.year;

        return string;
    }

    render() {
        var note = this.props.notes[this.props.selected] ? this.props.notes[this.props.selected] : null;
        if (note === null) return (<p className='note'>Loading...</p>);

        return (
            <main className='layout__note note' key={this.props.selected}>
                <button className='note__delete' onClick={this.handleDelete}>
                    <i className='icon-trash'></i><span className='sr-only'>{config.actions.delete}</span>
                </button>
                <span className='note__date'>{this.getDateString(note.date)}</span>
                <input type='text' ref='title' className='note__title'
                    value={note.title} placeholder='Enter your title here...' onChange={this.handleChange} />
                <textarea className='note__body' ref='body' value={note.body}
                    placeholder='Enter your note here...' onChange={this.handleChange}></textarea>
            </main>
        )
    }
}
