import React, { useState } from 'react';
import Note from './Note';

const NoteBoard = () => {
    const initialNotes = [
        { id: 1, content: 'The best way to get started is to quit talking and begin doing.', x: '50px', y: '50px' },
        { id: 2, content: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', x: '150px', y: '150px' },
        { id: 3, content: 'Believe you can and you\'re halfway there.', x: '250px', y: '250px' }
    ];

    // State to manage the notes arrya, It starts with the initialNotes array.
    const [notes, setNotes] = useState(initialNotes);

    // Function to update the position of a note after dragging
    const handleDragEnd = (id, x, y) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) => (
                (note.id === id ? { ...note, x, y } : note)
            )))
    }
    return (
        <div className='relative w-full h-screen'>
            {
                notes.map((note) => (
                    <Note key={note.id} note={note} onDragEnd={handleDragEnd} />
                ))
            }
        </div>
    )
}

export default NoteBoard;