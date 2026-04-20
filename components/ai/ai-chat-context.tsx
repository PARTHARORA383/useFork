
"use client";
import React, { createContext, useContext, useState } from "react";

interface AiChatContextProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  voiceState: "idle" | "listening" | "ready" | "streaming";
  setVoiceState: React.Dispatch<React.SetStateAction<VoiceState>>;
}

type VoiceState = "idle" | "listening" | "ready" | "streaming";

const AiChatContext = createContext<AiChatContextProps | undefined>(undefined);

export function useAiChat() {
  const context = useContext(AiChatContext);
  if (!context) throw new Error("useAiChat must be used inside <AiChatProvider>");
  return context;
}

interface AiChatProviderProps {
  children: React.ReactNode;
  // optionally accept initial/controlled values from outside
  defaultValue?: string;
}


export function AiChatProvider({ children, defaultValue = "" }: AiChatProviderProps) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voiceState, setVoiceState] = useState<VoiceState>('idle')

  return (
    <AiChatContext.Provider value={{ value, setValue, loading, setLoading, error, setError, voiceState, setVoiceState}}>
      {children}
    </AiChatContext.Provider>
  );
}