import React from "react"

import iconError from "../assets/images/icon-error.svg"
import iconRetry from "../assets/images/icon-retry.svg"

export default function ApiErrorPage({ setApiError }) {
    function resetLocation() { /* runs weather api fetch effect again */
        setApiError(false)
    }


    return (
        <main className="weather-api-error">

            <figure className="api-error-icon">
                <img src={iconError} alt="error" />
            </figure>
            <h1 className="api-error__heading">
                Something went wrong
            </h1>
            <p className="api-error__message">
                We couldn't connect to the server (API error). Please try again in few moments.
            </p>
            <button onClick={resetLocation}>
                <div className="dropdown-btn api-error__retry-btn">
                    <figure className="units-icon">
                        <img src={iconRetry} alt="" />
                    </figure>
                    <span>Retry</span>
                </div>
            </button>
        </main>
    )
}