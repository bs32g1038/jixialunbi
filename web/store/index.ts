import { configureStore } from '@reduxjs/toolkit';
import { commonSplitApi } from '../apis';
import app from './app';
import { createWrapper } from 'next-redux-wrapper';
import { create } from 'zustand';

export const makeStore = () =>
  configureStore({
    reducer: {
      app,
      [commonSplitApi.reducerPath]: commonSplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonSplitApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV === 'development' });

interface State {
  isShowLoginModal?: boolean;
  user: {
    role: string;
    banned: boolean;
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
    username: string;
    account: string;
    image: string;
    isActived: boolean;
  };
  isShowWriteModal?: {
    postId?: number;
    visible?: boolean;
  };
  setUser: (user) => void;
  showLoginModal: (show: boolean) => void;
  showWriteModal: (postId: null | number, visible: boolean) => void;
}

export const useAppStore = create<State>((set) => ({
  user: null as any,
  isShowLoginModal: false,
  isShowWriteModal: false,
  writeModalState: {
    postId: 0,
    visible: false,
  },
  setUser: (user) => {
    set({ user });
  },
  showLoginModal: (show = true) => {
    set({ isShowLoginModal: show });
  },
  showWriteModal: (postId = null, visible = false) => {
    set({
      isShowWriteModal: {
        postId,
        visible,
      },
    });
  },
}));
