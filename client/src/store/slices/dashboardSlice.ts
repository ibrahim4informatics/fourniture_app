import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface DashboardState {
    showCustomerFilters: boolean
    customerShownId: number | string | null
    editingCustomerId: number | string | null
}



const initialState: DashboardState = {
    showCustomerFilters: false,
    customerShownId: null,
    editingCustomerId: null
}

const DashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        customersFilterToggler: (state, { payload }: PayloadAction<"show" | "hide">) => {
            state.showCustomerFilters = payload === "show";
        },

        setShownCustomerID: (state, { payload: customerId }: PayloadAction<number | string | null>) => {
            state.customerShownId = customerId;
        },

        setEditingCustomerId: (state, { payload }: PayloadAction<number | string | null>) => {
            state.editingCustomerId = payload
        }
    }
})


export const { customersFilterToggler, setShownCustomerID, setEditingCustomerId } = DashboardSlice.actions;
export default DashboardSlice.reducer;
