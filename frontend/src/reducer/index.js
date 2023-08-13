import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getWeatherAction = createAsyncThunk("getweather/backend", async () => {
    const response = await fetch('http://localhost:5073/WeatherForecast')
    const json = await response.json();
    return json;
})



export { getWeatherAction }

const reducer = createSlice({
    name: 'test',
    initialState: { counter: 0, weather: [] },
    reducers: {
        increment: (state, action) => {
            return { ...state, counter: state.counter + 1 }
        },
        GET_WEATHER_DATA_SUCCESS: (state, action) => {
            const result = {
                ...state,
                counter: state.counter || 0,
                weather: action.payload
            }
            console.table(result);
            return result;
        }

    },
    extraReducers: builder => {
        builder.addCase(
            getWeatherAction.fulfilled, (state, action) => {
                return { ...state, weather: action.payload }
            });

        builder.addCase(
            'GET_WEATHER_DATA_SUCCESS', (state, action) => {
                const result = {
                    ...state,
                    counter: state.counter || 0,
                    weather: action.weatherData
                }
                console.table(result);
                return result;
            });


    }
})


export const { increment, } = reducer.actions
export default reducer;





