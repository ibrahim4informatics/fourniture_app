import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface DashboardState {
    showCustomerFilters: boolean
}



const initialState: DashboardState = {
    showCustomerFilters: false
}

const DashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        customersFilterToggler: (state, { payload }: PayloadAction<"show" | "hide">) => {
            state.showCustomerFilters =  payload === "show";
        }
    }
})


export const { customersFilterToggler } = DashboardSlice.actions;
export default DashboardSlice.reducer;
