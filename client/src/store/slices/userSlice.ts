import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

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
    accessToken?: string,
    refreshToken?: string,
    isSignedIn: boolean
}


const initialState: UserState = {
    isSignedIn: false
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUser: (state, { payload }: PayloadAction<UserState>) => {
            state = payload;
        },

        setToken: (state, { payload }: PayloadAction<{ type: "refresh" | "access", value: string }>) => {
            if (payload.type === "access") {
                state = { ...state, accessToken: payload.value }
            }
            else {
                state = { ...state, refreshToken: payload.value }
            }
        },

        setSignedIn: (state) => {
            state = { ...state, isSignedIn: true }
        },

        setSignedOut: (state) => {
            state = { ...state, isSignedIn: false }
        }



    }
})


export const { } = userSlice.actions;
export default userSlice.reducer;