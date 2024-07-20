import React from "react";
import { useState } from "react";
import axios from 'axios';
import './navBar.css';
import moment from 'moment';
import { GridUI } from "./tableGrid";
import datanotfound from '../../src/assets/datanotfound.png';
export const NavBar = (() => {
    const [city, setCity] = useState('');
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setCity(e.target.value);
        setError(null);
        setLoading(false);
        report.length = 0;
    }
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=15ca787f2d191cf1f09525804a2ce85d&q=${city}`;



    const loadData = async () => {

        try {
            const response = await axios.get(apiUrl);
            setError(null);
            console.log(response, "response")
            setReport(response.data.list);
            setLoading(false);

        } catch (err) {
            setError(err.response.data.message)
            console.log(error, err)
        }
    }
    const handleSave = () => {
        setLoading(true)
        if (city.length > 0) {
            loadData()
        }
        console.log(report, "city")
    }

    const messageFun = ((message, className) => {
        return (
            <div className={className}> {message}...</div>
        )
    })



    return (
        <div className="container-div">
            <div className="dashboard-top">
                <h2 style={{ color: "orange" }}>Weather in your City</h2>
                <div>
                    <input type="text" value={city} onChange={handleChange} />
                    <button onClick={handleSave} >Search</button>
                    {loading && 
                    <div className="spinner"></div>
                    }
                </div>
            </div>
            {loading && error == null && city.length > 0 ? (
                messageFun('loading', 'loading')
            ) : ''}

            {loading && city.length === 0 ? (
                messageFun('please enter city name', 'error')
            ) : ''}

            <div className="weather-container">
                {report && error == null && report.filter((val, index) => index < 5).map((res, index) => {
                    return (
                        <div className="temperature-block" key={index}>
                            <div className="date-table">
                                Date : {moment(res.dt_txt).format("YYYY/MM/DD")};
                            </div>
                            <div className="temp-class temp-color"> Temperature</div>
                            <GridUI tempData={res} />
                        </div>
                    )
                })
                }
                {
                    loading && error !== null ? <div className="error-handling">
                        <img src={datanotfound} alt="alt-text" />
                    </div> : ''
                }
            </div>

        </div>
    )

})