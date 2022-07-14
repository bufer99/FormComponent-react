import { configureStore } from '@reduxjs/toolkit'
import { progressReducer } from './progress'
import { scoreReducer } from './scoreCount'
import { formStateReducer } from './formState'

export default configureStore({
    reducer: {
        progress: progressReducer,
        score: scoreReducer,
        form: formStateReducer,
    }
})