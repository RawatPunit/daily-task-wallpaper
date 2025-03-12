
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, Edit, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import Header from '@/components/Header';
import NoteCreator from '@/components/NoteCreator';
import { useNotes, Note } from '@/context/NotesContext';
import { cn } from '@/lib/utils';

const NotesPage = () => {
  const { notes, deleteNote, setCurrentNote } = useNotes();
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    setEditingNote(null);
    setIsCreating(true);
  };

  const handleNoteClick = (note: Note) => {
    setCurrentNote(note);
    navigate('/wallpaper');
  };

  const handleEditClick = (e: React.MouseEvent, note: Note) => {
    e.stopPropagation();
    setEditingNote(note);
    setIsCreating(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    deleteNote(noteId);
  };

  const handleSave = () => {
    setIsCreating(false);
    setEditingNote(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Notes</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-4 py-2 rounded-full flex items-center space-x-2"
                onClick={handleCreateClick}
              >
                <PlusCircle size={18} />
                <span>New Note</span>
              </motion.button>
            </div>
            
            <AnimatePresence>
              {isCreating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <NoteCreator 
                    onSave={handleSave}
                    editingNote={editingNote}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {notes.length === 0 && !isCreating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="mb-4 text-ink-light">
                  <FileEmptyIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">You haven't created any notes yet.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-4 py-2 rounded-full flex items-center space-x-2 mx-auto"
                  onClick={handleCreateClick}
                >
                  <PlusCircle size={18} />
                  <span>Create your first note</span>
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note) => (
                  <motion.div
                    key={note.id}
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "rounded-xl overflow-hidden shadow-sm border border-border cursor-pointer",
                      "transition-all duration-300 hover:shadow-md"
                    )}
                    style={{ backgroundColor: note.backgroundColor, color: note.textColor }}
                    onClick={() => handleNoteClick(note)}
                  >
                    <div className="p-4">
                      {note.title && (
                        <h3 className="text-xl font-medium mb-3">{note.title}</h3>
                      )}
                      <ul className="space-y-2">
                        {note.tasks.slice(0, 5).map((task, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <div className="w-4 h-4 mt-1 rounded-full border flex-shrink-0" style={{ borderColor: note.textColor }} />
                            <span className="flex-1 truncate">{task}</span>
                          </li>
                        ))}
                        {note.tasks.length > 5 && (
                          <li className="text-sm opacity-70">+ {note.tasks.length - 5} more tasks</li>
                        )}
                      </ul>
                      
                      <div className="flex justify-end mt-4 space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
                          onClick={(e) => handleEditClick(e, note)}
                        >
                          <Edit size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-destructive"
                          onClick={(e) => handleDeleteClick(e, note.id)}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
                          onClick={() => handleNoteClick(note)}
                        >
                          <Image size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

// Empty file icon component
const FileEmptyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="13" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12" y2="17" />
  </svg>
);

export default NotesPage;
