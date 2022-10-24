import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface State {
  isShowLoginModal?: boolean;
  isShowWriteModal?: boolean;
  user: {
    role: string;
    banned: boolean;
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
    username: string;
    image: string;
    isActived: boolean;
  };
  writeModalState: {
    postId?: number;
    visible?: boolean;
  };
}

// Define the initial state using that type
const initialState: State = {
  user: null as any,
  isShowLoginModal: false,
  isShowWriteModal: false,
  writeModalState: {
    postId: 0,
    visible: false,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    showLoginModal(state, action: PayloadAction<any>) {
      state.isShowLoginModal = action.payload;
    },
    setWriteModalState(state, action: PayloadAction<{ visible?: boolean; postId?: number }>) {
      state.writeModalState = { ...state.writeModalState, postId: 0, ...action.payload };
    },
  },
});

export const { setUser, showLoginModal, setWriteModalState } = appSlice.actions;

export default appSlice.reducer;
