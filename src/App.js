import React, { useState, useEffect } from 'react';
import './App.css';

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });
  const [formOpen, setFormOpen] = useState(false);

  // Load notes from localStorage when the app starts
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes array changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() !== '' || newNote.content.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote({ title: '', content: '', tags: '' });
      setFormOpen(false); // Close form after adding
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((note, i) => i !== index));
  };

  const editNote = (index, updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      <header className="header">Notes</header>

      <div className="note-grid">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <div className="note-title">{note.title || 'Untitled'}</div>
            <div className="note-content">{note.content}</div>
            <div className="tags">
              {note.tags.split(',').map((tag, i) => (
                <span className="tag" key={i}>{tag.trim()}</span>
              ))}
            </div>
            <button className="delete" onClick={() => deleteNote(index)}>Delete</button>
            <button
              className="edit"
              onClick={() => editNote(index, {
                ...note,
                title: prompt('Edit Title:', note.title),
                content: prompt('Edit Content:', note.content),
                tags: prompt('Edit Tags:', note.tags)
              })}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {formOpen && (
        <div className="add-note-form">
          <input
            type="text"
            placeholder="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            placeholder="Note Content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={newNote.tags}
            onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
          />
          <button onClick={addNote}>Add Note</button>
        </div>
      )}

      <button className="add-note-btn" onClick={() => setFormOpen(true)}>+</button>
    </div>
  );
}

export default NotesApp;


