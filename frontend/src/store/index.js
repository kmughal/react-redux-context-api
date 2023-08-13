import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducer";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas'
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: { sampleReducer: reducer.reducer },
    middleware: defaultMiddleware => [...defaultMiddleware({ thunk: false }), sagaMiddleware]
})

// Run your root saga
sagaMiddleware.run(rootSaga);