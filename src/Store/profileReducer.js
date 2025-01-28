import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading : false,
    isSideBarOpen : false
}

const profileSlice = createSlice({
    name:'profile',
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoginLoading(state,value) {
            state.loading = value.payload
        },
        setSideBarOpen(state){
            state.isSideBarOpen = !(state.isSideBarOpen)
        }
    }
})

export const {setUser,setLoginLoading,setSideBarOpen} = profileSlice.actions
export default profileSlice.reducer