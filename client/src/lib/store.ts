import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

interface FilterState {
    search: string;
    location: string;
    category: string;
}

const initialState: FilterState = {
    search: "",
    location: "",
    category: "",
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
            return { ...state, ...action.payload };
        },
        resetFilters: () => initialState,
    },
});

export const { setFilters, resetFilters } = filterSlice.actions;

export const store = configureStore({
    reducer: {
        filters: filterSlice.reducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
