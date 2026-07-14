import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';


function AppContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
    return (
      <div className="app-container">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <Navbar />

          </div>
      </div>
      );
  }

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
