import { createSlice, current } from "@reduxjs/toolkit";

export const formStateSlice = createSlice({
    name: "form",
    initialState: {
        tasks: {},
    },
    reducers: {
        setValueById: (state, { payload }) => {
            state.tasks = {
                ...state.tasks,
                [payload.id]: payload
            }
        },
    }
})

export const { setValueById } = formStateSlice.actions;
export const formStateReducer = formStateSlice.reducer;