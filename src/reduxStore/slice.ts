import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  picturePath?: string;
}
interface AuthState {
  user: User | null;
  token: string | null;
  allUsers: User[];
  admin: User | null; 
}
interface SetLoginPayload {
  user: User;
  token: string;
}
interface GetUsersPayload {
  users: User[];
}
interface AuthCheckPayload {
  admin: User; 
}
// interface UserEditPayload {
//   _id: string;
//   allUsers: any[];
//   updatedUser : any[];
// }
const initialState: AuthState = {
  user: null,
  token: null,
  allUsers: [],
  admin: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<SetLoginPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    getUsers: (state, action: PayloadAction<GetUsersPayload>) => {
      state.allUsers = action.payload.users;
    },
    authCheck: (state, action: PayloadAction<AuthCheckPayload>) => {
      state.admin = action.payload.admin;
    },
    adminLogout: (state) => {
      state.admin = null;
    },
    // userEdit: (state, action: PayloadAction<UserEditPayload>) => {
    //   const updatedUser = action.payload;
    //   state.allUsers = state.allUsers.map(user =>
    //     user._id === updatedUser._id ? updatedUser : user
    //   );
    // },
  },
});

export const {
  setLogin,
  setLogout,
  updateProfile,
  getUsers,
  authCheck,
  adminLogout,
//   userEdit,
} = authSlice.actions;

export default authSlice.reducer;
