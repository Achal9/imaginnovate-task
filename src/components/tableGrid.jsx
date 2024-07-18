import React, { Fragment } from "react";

export const GridUI = ({ tempData }) => {
    const { temp_min, temp_max, pressure, humidity } = tempData.main;

    const gridReusable = (key1, value1, key2, value2, className) => {
        return (
            <div className={className}>
                <div className="min-temp">
                    <span className="span1">
                        {key1}
                    </span>
                    <span >
                        {value1}
                    </span>

                </div>
                <div className="max-temp">
                    <span className="span1">
                        {key2}
                    </span>
                    <span>
                        {value2}
                    </span>
                </div>
            </div>
        )
    }
    return (
        <Fragment>
            {
                gridReusable('Min', temp_min, 'Max', temp_max, 'temperature temp-color')
            }
            {
                gridReusable('Pressure', 'Humidity', pressure, humidity, 'temperature')
            }

        </Fragment>
    )
}