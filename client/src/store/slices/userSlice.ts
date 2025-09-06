import { createSlice } from "@reduxjs/toolkit"

interface UserState {
    id?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string,
    isAdmin?: boolean,
    createdAt?: string,
    updatedAt?: string,
    avatarUrl?: string,
    token?: string,
    isSignedIn: boolean
}


const initialState: UserState = {
    isSignedIn: false
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    }
})


export const {} = userSlice.actions;
export default userSlice.reducer;