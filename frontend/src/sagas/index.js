import React from 'react';
import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
export const actions = {
    GET_WEATHER_DATA: 'GET_WEATHER_DATA',
    GET_WEATHER_DATA_SUCCESS: 'GET_WEATHER_DATA_SUCCESS',
    GET_WEATHER_DATA_FAIL: 'GET_WEATHER_DATA_FAIL'
};

function* getWeatherDataSaga(action) {
    console.log({ actionInSaga: action })
    try {
        const weatherData = yield call(Api().getWeatherData);
        yield put({ type: actions.GET_WEATHER_DATA_SUCCESS, weatherData });
    } catch (e) {
        debugger;
        yield put({ type: actions.GET_WEATHER_DATA_FAIL, error: e })
    }
}

function* watchGetWeatherDataSaga() {
    yield takeEvery(actions.GET_WEATHER_DATA, getWeatherDataSaga)
}

export function* rootSaga() {
    yield all([fork(watchGetWeatherDataSaga)])
}

function Api() {
    return {
        getWeatherData: async () => {
            const response = await fetch('http://localhost:5073/WeatherForecast')
            const json = await response.json();
            return json;
        }
    }
}