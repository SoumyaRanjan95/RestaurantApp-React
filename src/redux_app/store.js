import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from './features/authenticate/autheticateSlice'
import staffauthenticateReducer from './features/staffauthenticate/staffauthenticateSlice'
const store = configureStore({
    reducer:{
        authenticate: authenticateReducer,
        staffauthenticate: staffauthenticateReducer,
    }
    
})

export default store