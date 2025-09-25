import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface DashboardState {
    showCustomerFilters: boolean,
    showProductFilters:boolean,
    showOrderFilters:boolean,
    showCategoryFilters:boolean,
    showWilayaFilters:boolean,
    customerShownId: number | string | null
    editingCustomerId: number | string | null
}



const initialState: DashboardState = {
    showCustomerFilters: false,
    customerShownId: null,
    editingCustomerId: null,
    showCategoryFilters:false,
    showOrderFilters:false,
    showProductFilters:false,
    showWilayaFilters:false
}

const DashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        customersFilterToggler: (state, { payload }: PayloadAction<"show" | "hide">) => {
            state.showCustomerFilters = payload === "show";
        },

        productFilterToggler:(state, {payload}:PayloadAction<"show" | "hide" >)=>{
            state.showProductFilters = payload === "show";
        },

        setShownCustomerID: (state, { payload: customerId }: PayloadAction<number | string | null>) => {
            state.customerShownId = customerId;
        },

        setEditingCustomerId: (state, { payload }: PayloadAction<number | string | null>) => {
            state.editingCustomerId = payload
        }



    }
})


export const { customersFilterToggler, setShownCustomerID, setEditingCustomerId, productFilterToggler } = DashboardSlice.actions;
export default DashboardSlice.reducer;
