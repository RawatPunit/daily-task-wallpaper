
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useNotes, Note, BackgroundType } from '@/context/NotesContext';
import TaskItem from './TaskItem';
import ColorPicker from './ColorPicker';
import { cn } from '@/lib/utils';

interface NoteCreatorProps {
  onSave?: (note: Note) => void;
  editingNote?: Note | null;
  className?: string;
}

const NoteCreator: React.FC<NoteCreatorProps> = ({
  onSave,
  editingNote = null,
  className,
}) => {
  const { addNote, updateNote } = useNotes();
  
  const [title, setTitle] = useState(editingNote?.title || '');
  const [tasks, setTasks] = useState<string[]>(editingNote?.tasks || []);
  const [backgroundColor, setBackgroundColor] = useState(editingNote?.backgroundColor || '#FFFFFF');
  const [textColor, setTextColor] = useState(editingNote?.textColor || '#333333');
  const [backgroundType, setBackgroundType] = useState<BackgroundType>(editingNote?.backgroundType || 'color');
  
  const backgroundColors = [
    { value: '#FFFFFF', label: 'White' },
    { value: '#F8F9FA', label: 'Light Gray' },
    { value: '#FFF8E1', label: 'Cream' },
    { value: '#E3F2FD', label: 'Light Blue' },
    { value: '#E8F5E9', label: 'Light Green' },
    { value: '#F3E5F5', label: 'Light Purple' },
    { value: '#FFF3E0', label: 'Light Orange' },
    { value: '#111111', label: 'Black' },
  ];
  
  const textColors = [
    { value: '#000000', label: 'Black' },
    { value: '#333333', label: 'Dark Gray' },
    { value: '#0D47A1', label: 'Blue' },
    { value: '#1B5E20', label: 'Green' },
    { value: '#4A148C', label: 'Purple' },
    { value: '#E65100', label: 'Orange' },
    { value: '#B71C1C', label: 'Red' },
    { value: '#FFFFFF', label: 'White' },
  ];

  const addTask = () => {
    setTasks([...tasks, '']);
  };

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (title.trim() === '' && tasks.filter(t => t.trim() !== '').length === 0) {
      return; // Don't save empty notes
    }
    
    const filteredTasks = tasks.filter(task => task.trim() !== '');
    
    const noteData = {
      title,
      tasks: filteredTasks,
      backgroundColor,
      textColor,
      backgroundType,
    };
    
    let savedNote;
    if (editingNote) {
      updateNote(editingNote.id, noteData);
      savedNote = { ...editingNote, ...noteData };
    } else {
      savedNote = addNote(noteData);
    }
    
    if (onSave) {
      onSave(savedNote);
    }
    
    // Reset form if not editing
    if (!editingNote) {
      setTitle('');
      setTasks([]);
      setBackgroundColor('#FFFFFF');
      setTextColor('#333333');
      setBackgroundType('color');
    }
  };
  
  const previewStyle = {
    backgroundColor,
    color: textColor,
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl overflow-hidden shadow-sm border border-border",
        className
      )}
      style={previewStyle}
    >
      <div className="px-4 py-3 bg-white/10 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">
            {editingNote ? 'Edit Note' : 'Create Note'}
          </h3>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-primary bg-primary/10 px-3 py-1 rounded-full text-sm font-medium"
              onClick={handleSave}
            >
              Save
            </motion.button>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <ColorPicker
            label="Background"
            value={backgroundColor}
            onChange={setBackgroundColor}
            colors={backgroundColors}
            className="flex-1"
          />
          <ColorPicker
            label="Text"
            value={textColor}
            onChange={setTextColor}
            colors={textColors}
            className="flex-1"
          />
        </div>
      </div>
      
      <div className="p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full text-xl font-medium bg-transparent border-none outline-none mb-4"
          style={{ color: textColor }}
        />
        
        <div className="space-y-1">
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
              onDelete={() => deleteTask(index)}
              onChange={(value) => updateTask(index, value)}
              textColor={textColor}
            />
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full flex items-center justify-center py-2 rounded-lg border-2 border-dashed border-opacity-30 transition-colors duration-200"
          style={{ borderColor: textColor }}
          onClick={addTask}
        >
          <Plus size={16} className="mr-2" />
          <span className="text-sm font-medium">Add Task</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NoteCreator;
