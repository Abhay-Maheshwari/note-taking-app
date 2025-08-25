import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState } from 'react';
import type { Note, CreateNoteInput, UpdateNoteInput } from '@/types/note';

const NOTES_STORAGE_KEY = 'notes_app_notes';

export const [NotesProvider, useNotes] = createContextHook(() => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Load notes from storage on mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const stored = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
      if (stored) {
        const parsedNotes = JSON.parse(stored).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNotes = async (notesToSave: Note[]) => {
    try {
      await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesToSave));
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  const addNote = (input: CreateNoteInput) => {
    const newNote: Note = {
      id: Date.now().toString(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    return newNote;
  };

  const updateNote = (input: UpdateNoteInput) => {
    const updatedNotes = notes.map(note => 
      note.id === input.id 
        ? { ...note, ...input, updatedAt: new Date() }
        : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(note => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.body.toLowerCase().includes(query)
    );
  });

  return {
    notes: filteredNotes,
    allNotes: notes,
    isLoading,
    searchQuery,
    setSearchQuery,
    addNote,
    updateNote,
    deleteNote,
    getNoteById: (id: string) => notes.find(note => note.id === id),
  };
});