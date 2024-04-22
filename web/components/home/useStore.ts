import { create } from 'zustand';

export const useStore = create(() => ({
  user: null,
}));
