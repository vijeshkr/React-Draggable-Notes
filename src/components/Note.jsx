import React, { useRef } from 'react'

const Note = ({ note, onDragEnd }) => {
    // Reference to the note DOM element
    const noteRef = useRef(null);
    // Reference to store the initial offset
    const offsetXref = useRef(0);
    const offsetYref = useRef(0);

    // Function to handle mose down event
    const handleMouseDown = (e) => {
        const noteElem = noteRef.current;
        const rect = noteElem.getBoundingClientRect();

        // Calculate the offset between the mouse position and the top,left
        offsetXref.current = e.clientX - rect.left;
        offsetYref.current = e.clientY - rect.top;

        e.preventDefault();

        // Function to handle mouse move event to update note's position
        const handleMouseMove = (e) => {
            // Calculate new postions based on mouse movement
            const newX = e.clientX - offsetXref.current + 'px';
            const newY = e.clientY - offsetYref.current + 'px';

            // Update the note's position
            noteElem.style.left = newX;
            noteElem.style.top = newY;
        }

        const handleMouseUp = () => {
            // Remove event listeners to stop tracking mouse movement
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            // Update the note's position in the parent state
            onDragEnd(note.id, noteElem.style.left, noteElem.style.top);
        }

        // Attach event listeners to the document
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    return (
        <div
            ref={noteRef}
            className='absolute bg-yellow-200 p-4 rounded shadow-lg cursor-move select-none max-w-sm'
            style={{ left: note.x, top: note.y }}
            onMouseDown={handleMouseDown}
        >
            <span className='text-xl'>📝</span>
            <span className='ml-2 font-semibold'>{note.content}</span>
        </div>
    )
}

export default Note