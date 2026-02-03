import React, { createContext, useContext, useState, useCallback } from 'react';
import { LayoutType, CafeConfig } from '@/types/cafe';
import { cafeConfig as defaultConfig } from '@/data/mockData';

interface LayoutContextType {
  layoutType: LayoutType;
  toggleLayout: () => void;
  setLayoutType: (type: LayoutType) => void;
  config: CafeConfig;
  setConfig: (config: CafeConfig) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutType, setLayoutType] = useState<LayoutType>('elegant');
  const [config, setConfig] = useState<CafeConfig>(defaultConfig);

  const toggleLayout = useCallback(() => {
    setLayoutType((prev) => (prev === 'elegant' ? 'cozy' : 'elegant'));
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        layoutType,
        toggleLayout,
        setLayoutType,
        config,
        setConfig,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
