import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface DashboardState {
    showCustomerFilters: boolean,
    customerShownId: number | string | null
}



const initialState: DashboardState = {
    showCustomerFilters: false,
    customerShownId: null
}

const DashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        customersFilterToggler: (state, { payload }: PayloadAction<"show" | "hide">) => {
            state.showCustomerFilters = payload === "show";
        },

        setShownCustomerID: (state, { payload: customerId  }: PayloadAction<number | string | null >) => {
            state.customerShownId = customerId;
        }
    }
})


export const { customersFilterToggler, setShownCustomerID } = DashboardSlice.actions;
export default DashboardSlice.reducer;
