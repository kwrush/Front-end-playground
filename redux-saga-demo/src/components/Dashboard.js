import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ title, user, data = {} }) => {
    const {departure, flight, forecast} = data;

    const name = (typeof user === 'object' && user.hasOwnProperty('username')) ? 
        user.username : null;

    const email = (typeof user === 'object' && user.hasOwnProperty('email')) ? 
        user.email : null;

    const flightNo = (typeof departure === 'object' && departure.hasOwnProperty('flightID')) ? 
        departure.flightID : null;

    const date = (typeof departure === 'object' && departure.hasOwnProperty('date')) ? 
        departure.date : null;

    const fromPlace = (typeof departure === 'object' && departure.hasOwnProperty('from')) ? 
        departure.from : null;

    const toPlace = (typeof departure === 'object' && departure.hasOwnProperty('to')) ? 
        departure.to : null;

    const weather = (typeof forecast === 'object' && forecast.hasOwnProperty('weather')) ? 
        forecast.weather : null;

    return (
        <div className="dashboard panel">
            <div className="panel-heading">
                <h3>{title}</h3>
            </div>
            <div className="panel-body">
                <p>Here is the record</p>
                <ul className="info-list">
                    <li className="item username">
                        <span className="item-title">Name: </span>{name}
                    </li>
                    <li className="item depart-time">
                        <span className="item-title">Departure Time: </span>{date}
                    </li>
                    <li className="item depart-from">
                        <span className="item-title">From: </span>{fromPlace}
                    </li>
                    <li className="item depart-to">
                        <span className="item-title">To: </span>{toPlace}
                    </li>
                    <li className="item flight">
                        <span className="item-title">Flight: </span>{flightNo}
                    </li>
                    <li className="item weather">
                        <span className="item-title">Weather: </span>{weather}
                    </li> 
                </ul>
            </div>
        </div>
    );
};