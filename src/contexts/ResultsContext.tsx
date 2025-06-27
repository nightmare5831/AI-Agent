'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AgentResult {
  agentId: string;
  agentTitle: string;
  agentIcon: string;
  result: any;
  timestamp: Date;
}

interface ResultsContextType {
  results: AgentResult[];
  addResult: (agentId: string, agentTitle: string, agentIcon: string, result: any) => void;
  clearResults: () => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<AgentResult[]>([]);

  const addResult = (agentId: string, agentTitle: string, agentIcon: string, result: any) => {
    const newResult: AgentResult = {
      agentId,
      agentTitle,
      agentIcon,
      result,
      timestamp: new Date()
    };
    
    setResults(prev => {
      const filtered = prev.filter(r => r.agentId !== agentId);
      return [...filtered, newResult];
    });
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <ResultsContext.Provider value={{ results, addResult, clearResults }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
};
