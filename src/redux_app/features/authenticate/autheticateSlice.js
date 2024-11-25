import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const staffauthenticateThunk = createAsyncThunk('authenticate/staffauthenticateThunk',async (details, {rejectWithValue}) => {
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

export const authenticateUserThunk = createAsyncThunk('authenticate/authenticateUserThunk', async (authDetails, {rejectWithValue}) => {
    try{

        const config = {
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
            },

        }
        const response = await axios.post("http://localhost:8001/api/login",authDetails, config)
        return response
    }catch(error){
            // return custom error message from backend if present
            console.log(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

})


export const reserveUserThunk = createAsyncThunk('authenticate/reserveUserThunk', async (reserveDetails, {rejectWithValue}) => {

    try{

        const config = {
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }

        }
        const response = await axios.post("http://localhost:8001/api/reserve",reserveDetails, config)
        return response
    }catch(error){
            // return custom error message from backend if present
            console.log(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

})

export const logoutUserThunk = createAsyncThunk('authenticate/logoutUserThunk', async ({}, {rejectWithValue}) => {

    try{

        const config = {
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),

            }

        }
        const response = await axios.post("http://localhost:8001/api/logout", {},config)
        return response
    }catch(error){
            // return custom error message from backend if present
            console.log(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

})


const initialState = {
    isAuthenticated: false,
    mobile: '',
    fullname:'',
    email: '',
    reservations:[],
};


const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(authenticateUserThunk.fulfilled,(state, action) => {
            
            if(action.payload.data['status'] == 'success'){
                state.isAuthenticated = action.payload.data['data']['isAuthenticated']
                state.mobile = action.payload.data['data']['mobile']
                state.email = action.payload.data['data']['email']
                state.reservations = action.payload.data['data']['reservations']
                state.fullname = action.payload.data['data']['fullname']

            }

           
        })

        builder.addCase(reserveUserThunk.fulfilled,(state, action) => {
            console.log(action.payload.data)
            if(action.payload.data['status'] == 'success'){
            state.reservations = action.payload.data['data']['reservations']
            }
       
    })

        builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = false
        })

    },
    

})



export default authenticateSlice.reducer;