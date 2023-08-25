import React, { useImperativeHandle } from 'react';
import { connect, useSelector } from "react-redux";
import { increment, getWeatherAction } from '../reducer';

const Main = (props, ref) => {

    const state = useSelector(state => {
        return state;
    })

    useImperativeHandle(props.api, () => {
        return { getWeatherData: getWeatherData }
    })



    const weather = state.sampleReducer.weather || props.sampleReducer.weather;
    const counter = state.sampleReducer.counter || props.sampleReducer.counter;

    function getWeatherData() {
        return weather;
    }

    return <div style={{ border: "3px dashed black", padding: "10px 10px" }}>
        <h1>This is main</h1>
        Enter name: <input type="text" ref={props.textButtonRef} />
        <pre>{JSON.stringify(state)}</pre>
        <button onClick={() => {
            props.dispatch(props.getWeatherAction())
        }}>Get Weather Report</button>
        <button onClick={() => {
            props.dispatch({ type: 'GET_WEATHER_DATA' })

        }}>Get Weather Report From Saga</button>
        <button onClick={() => {
            props.dispatch(props.increment())
        }}>Increment - {counter} </button>

        {(weather || []).map(d => {
            return <div>
                <h2>{d.date} = {d.temperatureC}</h2>
                <p>{d.summary}</p>
            </div>
        })}

    </div>
};

const mapStateToProps = (state) => {
    return { ...state }
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch, increment, getWeatherAction }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.forwardRef(Main));