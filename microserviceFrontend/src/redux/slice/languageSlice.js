import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
    name: 'language',
    initialState: 'es',
    reducers: {
        updateLanguage: (state, action)=>{
            return action.payload
        }
    }
})

export const {updateLanguage} = languageSlice.actions
export default languageSlice.reducer