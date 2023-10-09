import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user', 
  initialState: {
    users:[],
    
  },
  reducers: {
    setUsers:(state,action)=>{
      state.users = action.payload.users;
    },
    
  },
});

export const {setUsers} = user.actions;

export default user.reducer;
