
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Image } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Header from '@/components/Header';
import { useNotes } from '@/context/NotesContext';

const featureItems = [
  {
    icon: <PlusCircle size={24} className="text-primary" />,
    title: "Create Notes",
    description: "Add your daily tasks with a beautiful and clean interface.",
    action: "/notes",
  },
  {
    icon: <FileText size={24} className="text-primary" />,
    title: "Organize Tasks",
    description: "Keep track of what you need to do in a well-organized list.",
    action: "/notes",
  },
  {
    icon: <Image size={24} className="text-primary" />,
    title: "Set as Wallpaper",
    description: "Export your tasks as a beautiful wallpaper for your phone.",
    action: "/wallpaper",
  }
];

const Index = () => {
  const { notes } = useNotes();
  const hasNotes = notes.length > 0;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 pt-6 pb-20">
          <section className="max-w-2xl mx-auto pt-12 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl font-display font-bold leading-tight">
                Turn Your Tasks Into Your Wallpaper
              </h1>
              <p className="text-lg text-ink-light max-w-lg mx-auto">
                Create beautiful task lists and set them as your phone wallpaper to stay focused throughout the day.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="pt-6"
              >
                <Link 
                  to={hasNotes ? "/wallpaper" : "/notes"}
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-medium shadow-sm hover:bg-primary/90 transition-colors"
                >
                  {hasNotes ? "Set Tasks as Wallpaper" : "Create Your First Note"}
                </Link>
              </motion.div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {featureItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
                >
                  <Link 
                    to={item.action}
                    className="h-full glass-card p-6 rounded-xl flex flex-col hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-ink-light text-sm flex-1">{item.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
};

export default Index;
