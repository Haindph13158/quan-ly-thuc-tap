import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
   async (dataForm) => {
  const { data } = await axios.post('http://localhost:8000/api/login-google',dataForm);
  if(data){
    localStorage.setItem('token',data.token)
  }
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    infoUser: {},
    loading: false,
    messages:"",
  },
  
  extraReducers: (builder) => {
    builder.addCase(loginGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.infoUser = action.payload;
    });
    builder.addCase(loginGoogle.rejected, (state) => {
      state.messages = "Login google fail";
    });
  },
});

export default authSlice.reducer;
