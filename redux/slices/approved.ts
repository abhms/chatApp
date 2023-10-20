import { createSlice } from '@reduxjs/toolkit';

export const approved = createSlice({
  name: 'approved', 
  initialState: {
    approve:[],
    
  },
  reducers: {
    setAooroved:(state,action)=>{
      state.approve = action.payload;
    },
    
  },
});

export const {setAooroved} = approved.actions;

export default approved.reducer;
