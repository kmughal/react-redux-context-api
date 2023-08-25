import React, { useContext, useState, useRef } from 'react';
import reactDom from 'react-dom/client';
import { Main2 } from './component/Main2';
import { Provider } from 'react-redux';
import { store } from './store';
import Main from './component'
import { createContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const elThatUsesContextApi = document.getElementById('root-context');
const elThatUsesReduxApi = document.getElementById('root-redux');

const App = () => {
    const ref = useRef(null);
    const apiRef = useRef(null);

    return <Provider store={store}>
        <h1>This is using React Redux toolkit</h1>
        <button onClick={() => {
            ref.current.focus();
        }}>Forward Reference:</button>
        <button onClick={() => {
            console.log(apiRef.current.getWeatherData());
        }}>useImperativeHandler hook:</button>
        <Main textButtonRef={ref} api={apiRef} />
    </Provider>
}

const reduxApiRoot = reactDom.createRoot(elThatUsesReduxApi)
reduxApiRoot.render(<App />)

const defaultValue = {
    counter: 0,
    weatherData: []
}
const SampleProvider = createContext({
    counter: 0,
    weatherData: []
}
)
export const useSampleContext = () => {
    const ctx = useContext(SampleProvider)
    if (!ctx) throw new Error("ctx is null")
    return ctx
}
const queryClient = new QueryClient()
const App2 = () => {
    const [data, setData] = useState(defaultValue);
    return <SampleProvider.Provider value={{ setData, data }}>
        <QueryClientProvider client={queryClient}>
            <h1>This is using Context Api</h1>
            <Main2 />
        </QueryClientProvider>
    </SampleProvider.Provider>
}

const contextApiRoot = reactDom.createRoot(elThatUsesContextApi)
contextApiRoot.render(<App2 />)