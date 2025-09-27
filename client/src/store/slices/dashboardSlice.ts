import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface DashboardState {

    // product management global state
    showProductFilters: boolean,
    productShownId: number | string | null,
    productEditingId: number | string | null,
    showCreateProductForm: boolean

    // order management global state
    showOrderFilters: boolean,

    // category management global state
    showCategoryFilters: boolean,

    // wilaya management global state
    showWilayaFilters: boolean,

    // customers management global state
    showCustomerFilters: boolean,
    customerShownId: number | string | null
    editingCustomerId: number | string | null
}



const initialState: DashboardState = {
    showCustomerFilters: false,
    customerShownId: null,
    editingCustomerId: null,

    showProductFilters: false,
    productEditingId: null,
    productShownId: null,
    showCreateProductForm:false,

    showCategoryFilters: false,
    showOrderFilters: false,
    showWilayaFilters: false
}

const DashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        // Customers Actions
        customersFilterToggler: (state, { payload }: PayloadAction<"show" | "hide">) => {
            state.showCustomerFilters = payload === "show";
        },



        setShownCustomerID: (state, { payload: customerId }: PayloadAction<number | string | null>) => {
            state.customerShownId = customerId;
        },

        setEditingCustomerId: (state, { payload }: PayloadAction<number | string | null>) => {
            state.editingCustomerId = payload
        },


        // Products Actions
        productFilterToggler: (state, { payload }: PayloadAction<"show" | "hide">) => {
            state.showProductFilters = payload === "show";
        },


        setShownProductID: (state, { payload }: PayloadAction<number | string | null>) => {
            state.productShownId = payload;
        },

        setEditingProductId: (state, { payload }: PayloadAction<number | string | null>) => {
            state.productEditingId = payload
        },

        toggleCreateProductForm: (state, { payload }: PayloadAction<"show" | "hide">) => {
            state.showCreateProductForm = payload === 'show';
        }




    }
})


export const {
    customersFilterToggler, setShownCustomerID, setEditingCustomerId,
    productFilterToggler, setShownProductID, setEditingProductId, toggleCreateProductForm
} = DashboardSlice.actions;
export default DashboardSlice.reducer;
