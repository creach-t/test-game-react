import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameForm from './components/GameForm';
import Header from './components/Header';
import Statistics from './components/Statistics';
import LoadingScreen from './components/LoadingScreen';
import { useGameState } from './hooks/useGameState';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { gameState, updateGameState, resetGame } = useGameState();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          gameState={gameState}
          onReset={resetGame}
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key="game-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8"
          >
            <div className="lg:col-span-2">
              <GameForm 
                gameState={gameState}
                onUpdateGameState={updateGameState}
                isDarkMode={isDarkMode}
              />
            </div>
            
            <div className="lg:col-span-1">
              <Statistics 
                gameState={gameState}
                isDarkMode={isDarkMode}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;