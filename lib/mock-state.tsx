'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MockState {
  // Government state
  selectedDistrict: string;
  selectedPeriod: string;
  selectedSector: string;
  
  // Trainee state
  selectedTrainee: string | null;
  
  // Employer state
  selectedCandidate: string | null;
  selectedJob: string | null;
  
  // Verification state
  verificationStatus: Record<string, 'pending' | 'verified' | 'failed'>;
  
  // Actions
  setSelectedDistrict: (district: string) => void;
  setSelectedPeriod: (period: string) => void;
  setSelectedSector: (sector: string) => void;
  setSelectedTrainee: (traineeId: string | null) => void;
  setSelectedCandidate: (candidateId: string | null) => void;
  setSelectedJob: (jobId: string | null) => void;
  setVerificationStatus: (id: string, status: 'pending' | 'verified' | 'failed') => void;
}

const MockStateContext = createContext<MockState | undefined>(undefined);

const defaultState = {
  selectedDistrict: 'Pune',
  selectedPeriod: '2026',
  selectedSector: 'Manufacturing',
  selectedTrainee: null as string | null,
  selectedCandidate: null as string | null,
  selectedJob: null as string | null,
  verificationStatus: {} as Record<string, 'pending' | 'verified' | 'failed'>,
};

export function MockStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(defaultState);

  const value: MockState = {
    ...state,
    setSelectedDistrict: (district: string) => setState(prev => ({ ...prev, selectedDistrict: district })),
    setSelectedPeriod: (period: string) => setState(prev => ({ ...prev, selectedPeriod: period })),
    setSelectedSector: (sector: string) => setState(prev => ({ ...prev, selectedSector: sector })),
    setSelectedTrainee: (traineeId: string | null) => setState(prev => ({ ...prev, selectedTrainee: traineeId })),
    setSelectedCandidate: (candidateId: string | null) => setState(prev => ({ ...prev, selectedCandidate: candidateId })),
    setSelectedJob: (jobId: string | null) => setState(prev => ({ ...prev, selectedJob: jobId })),
    setVerificationStatus: (id: string, status: 'pending' | 'verified' | 'failed') => 
      setState(prev => ({ ...prev, verificationStatus: { ...prev.verificationStatus, [id]: status } })),
  };

  return (
    <MockStateContext.Provider value={value}>
      {children}
    </MockStateContext.Provider>
  );
}

export function useMockState() {
  const context = useContext(MockStateContext);
  if (context === undefined) {
    throw new Error('useMockState must be used within a MockStateProvider');
  }
  return context;
}
