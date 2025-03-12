
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import Header from '@/components/Header';
import WallpaperPreview from '@/components/WallpaperPreview';
import { useNotes } from '@/context/NotesContext';

const WallpaperPage = () => {
  const { notes, currentNote, setCurrentNote } = useNotes();
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (notes.length === 0) {
      navigate('/notes');
      return;
    }
    
    // If there's a current note, find its index
    if (currentNote) {
      const index = notes.findIndex(note => note.id === currentNote.id);
      if (index !== -1) {
        setSelectedNoteIndex(index);
      }
    }
  }, [notes, currentNote, navigate]);

  const handlePrevNote = () => {
    if (selectedNoteIndex > 0) {
      setSelectedNoteIndex(selectedNoteIndex - 1);
      setCurrentNote(notes[selectedNoteIndex - 1]);
    }
  };

  const handleNextNote = () => {
    if (selectedNoteIndex < notes.length - 1) {
      setSelectedNoteIndex(selectedNoteIndex + 1);
      setCurrentNote(notes[selectedNoteIndex + 1]);
    }
  };

  if (notes.length === 0) {
    return null; // Redirect handled in useEffect
  }

  const selectedNote = notes[selectedNoteIndex];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Wallpaper Preview</h1>
              <div className="text-sm text-ink-light">
                {selectedNoteIndex + 1} of {notes.length}
              </div>
            </div>
            
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-secondary flex-shrink-0"
                onClick={handlePrevNote}
                disabled={selectedNoteIndex === 0}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: selectedNoteIndex > 0 ? 1 : 0.4 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              
              <div className="flex-1 px-4">
                <WallpaperPreview note={selectedNote} />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-secondary flex-shrink-0"
                onClick={handleNextNote}
                disabled={selectedNoteIndex === notes.length - 1}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: selectedNoteIndex < notes.length - 1 ? 1 : 0.4 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-ink-light mb-2">Click "Set as Wallpaper" to download and set this note as your phone wallpaper.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-primary"
                onClick={() => navigate('/notes')}
              >
                Edit your notes
              </motion.button>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default WallpaperPage;
