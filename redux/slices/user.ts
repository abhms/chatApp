import { createSlice } from '@reduxjs/toolkit';

export const order = createSlice({
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

export const {setUsers} = order.actions;

export default order.reducer;
