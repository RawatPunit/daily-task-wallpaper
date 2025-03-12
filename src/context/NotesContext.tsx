
import React, { createContext, useContext, useState, useEffect } from 'react';

export type BackgroundType = 'color' | 'gradient' | 'image';

export interface Note {
  id: string;
  title: string;
  tasks: string[];
  backgroundColor: string;
  textColor: string;
  backgroundType: BackgroundType;
  createdAt: string;
  updatedAt: string;
}

interface NotesContextType {
  notes: Note[];
  currentNote: Note | null;
  setCurrentNote: (note: Note | null) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const defaultNote: Note = {
  id: '',
  title: '',
  tasks: [],
  backgroundColor: '#FFFFFF',
  textColor: '#333333',
  backgroundType: 'color',
  createdAt: '',
  updatedAt: '',
};

const NotesContext = createContext<NotesContextType>({
  notes: [],
  currentNote: null,
  setCurrentNote: () => {},
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  getNote: () => undefined,
});

export const useNotes = () => useContext(NotesContext);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Failed to parse saved notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    
    setNotes(prevNotes => [...prevNotes, newNote]);
    return newNote;
  };

  const updateNote = (id: string, noteUpdate: Partial<Note>) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, ...noteUpdate, updatedAt: new Date().toISOString() } 
          : note
      )
    );
    
    if (currentNote?.id === id) {
      setCurrentNote(prev => 
        prev ? { ...prev, ...noteUpdate, updatedAt: new Date().toISOString() } : null
      );
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    
    if (currentNote?.id === id) {
      setCurrentNote(null);
    }
  };

  const getNote = (id: string) => {
    return notes.find(note => note.id === id);
  };

  const value = {
    notes,
    currentNote,
    setCurrentNote,
    addNote,
    updateNote,
    deleteNote,
    getNote,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};
