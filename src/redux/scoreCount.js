import { createSlice } from "@reduxjs/toolkit";

export const scoreCountSlice = createSlice({
    name: "scoreCount",
    initialState:{
        count: 0,
        form: null
    },
    reducers: {
        init: (state, {payload: form}) => {
            //összeszámolni a pontokat
            console.log(form)
            Object.values(form).forEach((task) => {
                const value = task.formValue ? Object.values(task.formValue)[0] : 0;
                console.log(value)
                state.count += value*1
                console.log("ADDED: ",value*1)
                console.log("VALUE: ",state.count)
            })
        },
        increase: (state, {payload: number}) => {
            state.count += number;
        },
        decrease: (state, {payload: number}) => {
            state.count -= number;
        }
    }
})

export const { increase, decrease, init } = scoreCountSlice.actions;
export const scoreReducer = scoreCountSlice.reducer;