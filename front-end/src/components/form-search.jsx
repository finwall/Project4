import { Link, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { SearchOutlined, RightSquareOutlined, RightSquareFilled } from '@ant-design/icons';
import SearchService from '../services/search';

import './form-search.css'

export default function SearchForm(props) {

    const defaultShowCount = 3;
    const showCount = props.showCount || defaultShowCount;
    const preloadResultsNumber = props.preload || showCount;
    
    const linkPath = '/search';
    const searchParam = 'search';

    const navigate = useNavigate();

    // generates the placeholder text in the search bar
    // note: this needs to come before our hooks
    const searchThings = ['locations', 'adventure', 'good food', 'scenery'];
    function generateNewPlaceholder() {
        let rng = Math.floor( Math.random() * searchThings.length );
        return `Search for ${searchThings[rng]}...`;
    }

    // Hooks
    const [input, setInput] = useState(props.children || "");
    const [placeholderText, setPlaceholderText] = useState(generateNewPlaceholder());
    const [goElementReady, setGoElementReady] = useState(false);
    const [searchResultsArray, setSearchResults] = useState([]);
    const [displayIndex, setDisplayIndex] = useState(0);
    
    // Event handlers

    function handleChange(e) {
        let currentFormInput = e.target.value;
        let newInput = currentFormInput.trim();
        setGoElementReady(!!newInput);
        setInput(currentFormInput);

        // TODO: include autofill functionality here
        !!newInput? // remove after testing
        SearchService.query(currentFormInput, preloadResultsNumber)
            .then(handleQueryResults)
            : // remove after testing
            setSearchResults([])

    }

    function handleQueryResults(res) {
        console.log("Result: " + res[0].getName());
        setSearchResults(res);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let inp = input.trim();
        if (inp) {
            let uriString = encodeURIComponent(inp);
            navigate(`${linkPath}?${searchParam}=${uriString}`)
        } 
    }

    let activateButton = null;
    if (useLocation().pathname !== '/search') {
        activateButton = <RightSquareOutlined style={{ fontSize: '30px' }} />
        if (goElementReady) activateButton = (
                <button onClick={handleSubmit}>
                    <RightSquareFilled style={{ fontSize: '30px' }} />
                </button>
        )    
    }

    let resultsJSX = null;
    if (searchResultsArray.length > 0) {
        resultsJSX = (
            <ul className='searchResults'>
                {
                    searchResultsArray
                        .slice(displayIndex, showCount) // for pagination
                        .map((searchResult, index) => {
                        return (
                            <li key={searchResult.getImageURL().slice(-10) + index}>
                                <a href="">
                                    <div className='imgContainer'>
                                        <img src={searchResult.getImageURL()} alt={"Image for " + searchResult.getName()} />
                                    </div>
                                    <div className='textContainer'>
                                        <span className='textContainer-name'>{searchResult.getName()}</span>
                                        <span className='textContainer-location'>{searchResult.getLocation()}</span>
                                    </div>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    return (
        <div className='homepage-search'>
            <form className='homepage-search-bar' onSubmit={handleSubmit}>
                <div className='homepage-search-bar-flex'>
                    <SearchOutlined style={{fontSize: '24px'}} />
                    <input type="text" name="search" value={input} onInput={handleChange} placeholder={placeholderText} autoComplete='off'></input>
                    {activateButton}
                </div>
            </form>
            {resultsJSX}
        </div>
    )
}