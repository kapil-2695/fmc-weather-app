import React from "react"
import "./LocationSearchForm.css"

import LoadingSearch from "./LoadingSearch"
import useDropdownToggle from "../../hooks/useDropdownToggle"

import { fetchSearchResults } from "../../js/fetchData"
import { getLocation } from "../../js/fetchGeolocation"

import iconLocation from "../../assets/images/icon-location.png"


export default function LocationSearchForm({ setLocation, setWeatherData }) {
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [open, toggleResultsBox, searchResultsRef] = useDropdownToggle(true)

    function showResultBox() {
        if (loading || results.length !== 0) toggleResultsBox(true)
    }

    function submitSearch(event) {
        event.preventDefault()
        if (query.length >= 3) {
            setLoading(true)
            toggleResultsBox(true)
            fetchSearchResults(query)
                .then((data) => setResults(data))
                .catch((err) => console.log(err.message))
                .finally(() => setLoading(false))
        } else {
            console.log("enter at least 3 characters.")
        }
    }

    function handleSearchInput(event) {
        setQuery(event.target.value)
        if (open) toggleResultsBox()
    }

    function getCurrentLocation() {
        getLocation()
            .then((data) => {
                setWeatherData(null)
                setLocation(data)
            })
            .catch((error) => console.log(error.message))
    }

    const searchResultComponents = results.map((result) => {
        const data = result.properties
        let locationName = "";
        if (data.result_type === "postcode")
            locationName = `${data.city}, ${data.state} - ${data.country}`
        else if (data.result_type === "state")
            locationName = `${data.state} - ${data.country}`
        else
            locationName = `${data.country}`

        return (
            <button
                key={data.place_id} className="menu-list-item" type="button"
                onClick={() => {
                    setLocation({
                        latitude: data.lat, longitude: data.lon,
                        timezone: data.timezone.name, location: locationName
                    })
                    toggleResultsBox(false)
                }}
            >
                <p>{locationName}</p>
            </button>
        )
    })

    const searchResultsNotFound = (
        <li className="menu-list-item loading">
            <p>No search results. Try again.</p>
        </li>
    )


    return (
        <form
            ref={searchResultsRef}
            className="dropdown-container location-search"
            onSubmit={submitSearch}
        >
            <h2 className="sr-only">Search Section</h2>

            <button type="button" onClick={getCurrentLocation}>
                <figure className="location-search__location-icon">
                    <img src={iconLocation} alt="location icon" />
                </figure>
            </button>

            <div className="location-search__input-wrap" onClick={showResultBox}>
                <input className="location-search__input" type="text"
                    placeholder="Search for a place..."
                    onChange={handleSearchInput} value={query}
                />
                {query && (
                    <button
                        type="button"
                        className="clear-location-input-btn"
                        onClick={() => {
                            setQuery("")
                            setResults([])
                        }}
                    >
                        ×
                    </button>
                )}
            </div>

            <button className="location-search__btn btn" type="submit">
                Search
            </button>

            <menu className={`dropdown-menu location-search-menu ${open && "show"}`}>
                {loading
                    ? <LoadingSearch />
                    : (results.length !== 0
                        ? searchResultComponents
                        : searchResultsNotFound)
                }
            </menu>
        </form>
    )
}