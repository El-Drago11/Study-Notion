import { createSlice } from "@reduxjs/toolkit";

// fetching item from localStorage
const initialState = {
    signupData:null,
    loading:null,
    token: localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState, //default value fetch from the store
    reducers:{
        setSignupData(state,value){
            state.signupData = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload
        },
        setToken(state,value){
            state.token = value.payload
        },
    }
})

export const {setToken,setLoading,setSignupData} = authSlice.actions
export default authSlice.reducer