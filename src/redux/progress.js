import { createSlice, current } from "@reduxjs/toolkit";

export const progressSlice = createSlice({
    name: "progress",
    initialState: {
        errors: {},
        results: {}
    },
    reducers: {
        addErrorById: (state, { payload: action }) => {

            const { text, id } = action
            //console.log(current(state).errors[id])
            state.errors = {
                ...state.errors,
                [id]: [
                    text
                ]
            }
        },
        deleteErrorById: (state, { payload: id }) => {
            delete state.errors[id]
        },
        createResult: (state, { payload }) => {
            const { id, type, required } = payload
            state.results = {
                ...state.results,
                [id]: {
                    "id": id,
                    "value": (type === 'boolean' || required === false) ? 0 : null
                }
            }
        },
        addResult: (state, { payload }) => {
            const { formValue, id, type } = payload

            let value = null;

            if (type === 'list') {
                const { good, bad } = formValue;
                good ? value = good : value = bad;
            } else {
                value = formValue * 1
            }

            state.results = {
                ...state.results,
                [id]: {
                    "id": id,
                    "value": value
                }
            }
        }
    }
})

export const { addErrorById, deleteErrorById, addResult, createResult } = progressSlice.actions;
export const progressReducer = progressSlice.reducer;
