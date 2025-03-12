
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: string;
  index: number;
  onDelete: () => void;
  onChange: (value: string) => void;
  textColor?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onDelete,
  onChange,
  textColor = '#333333',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  useEffect(() => {
    setValue(task);
  }, [task]);

  const handleSubmit = () => {
    if (value.trim() !== '') {
      onChange(value);
      setIsEditing(false);
    } else {
      onDelete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setValue(task);
      setIsEditing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="group flex items-center rounded-lg overflow-hidden"
    >
      <div className="flex-1 flex items-center min-h-[44px] overflow-hidden">
        <div className="p-2 opacity-0 group-hover:opacity-70 transition-opacity">
          <GripVertical size={16} className="text-ink-light" />
        </div>
        
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className={cn(
              "flex-1 bg-transparent px-2 py-1 outline-none border-b-2 border-primary/30 focus:border-primary transition-colors duration-200",
            )}
            style={{ color: textColor }}
            placeholder="Enter a task..."
          />
        ) : (
          <div 
            onClick={() => setIsEditing(true)}
            className={cn(
              "flex-1 px-2 py-2 cursor-text overflow-ellipsis overflow-hidden whitespace-nowrap",
            )}
            style={{ color: textColor }}
          >
            {task}
          </div>
        )}
      </div>
      
      <motion.button
        onClick={onDelete}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 opacity-0 group-hover:opacity-70 transition-opacity hover:text-destructive"
      >
        <Trash2 size={16} />
      </motion.button>
    </motion.div>
  );
};

export default TaskItem;
