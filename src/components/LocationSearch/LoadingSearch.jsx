import React from "react"
import "./LoadingSearch.css"

import iconLoading from "../../assets/images/icon-loading.svg"


export default function LoadingSearch() {
    return (
        <li className="menu-list-item loading">
            <figure className="loading-search-icon">
                <img src={iconLoading} alt="loading" />
            </figure>
            <p>Loading search results...</p>
        </li>
    )
}