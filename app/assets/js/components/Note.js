import React from 'react';
import autobind from 'autobind-decorator';
import config from '../helpers/config';

import Firebase from 'firebase';
const ref = new Firebase('https://rowbot-catch-of-the-day.firebaseio.com/');

@autobind
export default class Note extends React.Component {

    handleChange(event) {
        var note = this.props.notes[this.props.selected];
        this.props.updateNote(this.props.selected, this.refs.title.value, this.refs.body.value);
    }

    render() {
        var note = this.props.selected ? this.props.notes[this.props.selected] : null;
        if (note === null) return (<p className='note'>Loading...</p>);
        return (
            <main className='layout__note note' key={this.props.selected}>
                <button className='note__delete'>
                    <i className='icon-trash'></i><span className='sr-only'>{config.actions.delete}</span>
                </button>
                <span className='note__date'>
                    { 'Last edited at ' + note.date.hours + ':' + note.date.minutes +
                    ' on ' + note.date.month + ' ' + note.date.date + ', ' + note.date.year }
                </span>
                <input type='text' ref='title' className='note__title'
                    value={note.title} placeholder='Enter your title here...' onChange={this.handleChange} />
                <textarea className='note__body' ref='body' value={note.body}
                    placeholder='Enter your note here...' onChange={this.handleChange}></textarea>
            </main>
        )
    }
}
