import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {urlConfig} from '../../config';

function SearchPage() {

    //Task 1: Define state variables for the search query, age range, and search results.
    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [ageRange, setAgeRange] = useState(6);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    //something went wrong
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);


    // Task 2. Fetch search results from the API based on user inputs.
    const handleSearch = async () => {
        try {
            const queryParams = new URLSearchParams({
                ...(searchQuery && { name: searchQuery }),
                ...(category && { category }),
                ...(condition && { condition }),
                ...(ageRange && { age_years: ageRange }),
            });

            const url = `${urlConfig.backendUrl}/api/search?${queryParams.toString()}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error; ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.log('Search error: ' + error.message);
        }
    };

    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
        navigate(`/app/product/${productId}`);
    };




    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category and condition dropdown options.*/}
                            <select className="form-select mb-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <select className="form-select mb-2" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option value="">All Conditions</option>
                                {conditions.map((cond) => (
                                    <option key={cond} value={cond}>{cond}</option>
                                ))}
                            </select>
                            {/* Task 4: Implement an age range slider and display the selected value. */}
                            <label>Max Age (years): {ageRange}</label>
                            <input type="range" className="form-range" min="1" max="20" value={ageRange} onChange={(e) => setAgeRange(e.target.value)} />
                        </div>
                    </div>
                    {/* Task 7: Add text input field for search criteria*/}
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search gifts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Task 8: Implement search button with onClick event to trigger search:*/}
                    <button className="btn btn-primary mb-4" onClick={handleSearch}>Search</button>

                    {/*Task 5: Display search results and handle empty results with a message. */}
                    {searchResults.length > 0 ? (
                        <div className="list-group">
                            {searchResults.map((gift) => (
                                <button
                                    key={gift.id}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => goToDetailsPage(gift.id)}
                                >
                                    {gift.name}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p>No gifts found matching your criteria.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
