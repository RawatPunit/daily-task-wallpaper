
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Check } from 'lucide-react';
import { Note } from '@/context/NotesContext';
import { cn } from '@/lib/utils';
import { generateWallpaper } from '@/utils/wallpaperGenerator';
import { toast } from '@/hooks/use-toast';

interface WallpaperPreviewProps {
  note: Note;
  className?: string;
}

const WallpaperPreview: React.FC<WallpaperPreviewProps> = ({
  note,
  className,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleGenerateWallpaper = async () => {
    if (!previewRef.current) {
      toast({
        title: "Error",
        description: "Could not find preview element to capture.",
        variant: "destructive"
      });
      return;
    }
    
    if (isGenerating) return; // Prevent multiple clicks
    
    setIsGenerating(true);
    
    try {
      await generateWallpaper(previewRef.current, note);
      setIsSuccess(true);
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to generate wallpaper:', error);
      toast({
        title: "Error",
        description: "Failed to generate wallpaper. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <motion.div 
        ref={previewRef}
        className="w-full aspect-[9/19.5] rounded-3xl overflow-hidden shadow-lg mx-auto"
        style={{ 
          backgroundColor: note.backgroundColor,
          color: note.textColor,
          maxWidth: '320px',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1 flex flex-col">
            {note.title && (
              <h2 className="text-2xl font-bold mb-6">{note.title}</h2>
            )}
            <div className="space-y-4">
              {note.tasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 rounded-full border-2 flex-shrink-0" style={{ borderColor: note.textColor }} />
                  <p className="text-lg flex-1">{task}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-6 text-center opacity-60 text-sm">
            <p>NoteWall · Daily Tasks</p>
          </div>
        </div>
      </motion.div>
      
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "px-4 py-2 rounded-full flex items-center space-x-2",
            "bg-primary text-primary-foreground",
            isGenerating && "opacity-70 cursor-not-allowed"
          )}
          onClick={handleGenerateWallpaper}
          disabled={isGenerating}
        >
          {isSuccess ? (
            <>
              <Check size={18} />
              <span>Saved!</span>
            </>
          ) : isGenerating ? (
            <>
              <span className="animate-pulse">Processing...</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Set as Wallpaper</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default WallpaperPreview;
