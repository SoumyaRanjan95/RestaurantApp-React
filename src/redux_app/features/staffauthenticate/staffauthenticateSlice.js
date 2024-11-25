import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const staffauthenticateThunk = createAsyncThunk('staffauthenticate/staffauthenticateThunk',async (details, {rejectWithValue}) => {
    try{
        const config = {
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
            },

        };
        const response = await axios.post("http://localhost:8001/staff/",details, config)
        return response
    }catch(error){
        console.log(error)
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
          } else {
            return rejectWithValue(error.message)
          }
    }
})

const initialState = {
    staffisAuthenticated:'',
}

export const staffauthenticateSlice = createSlice({
    name: 'staffauthenticate',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(staffauthenticateThunk.fulfilled,(state, action) => {
            


           
        })
    },
})


export default staffauthenticateSlice.reducer

