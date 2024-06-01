import React, { useState, useEffect } from 'react';

// Define the Cards component
const Cards = () => {
    // State to hold the news articles
    const [mynews, setMynews] = useState([]);

    // Function to fetch news data from the News API
    const fetchData = async () => {
        try {
            // Make a request to the News API to fetch top headlines
            let response = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=6c9134d5813b40c7a249140740ebc5d9");

            // Check if the response is not OK (status code other than 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON data from the response
            let data = await response.json();
            // Update the state with the fetched news articles
            setMynews(data.articles);
        } catch (error) {
            // Show an alert message if the API request fails
            alert('Failed to fetch news. Please try again later.');
            // Log the error to the console for debugging
            console.error('Fetch error:', error);
        }
    };

    // Use useEffect to call fetchData once when the component mounts
    useEffect(() => { fetchData(); }, []);

    return (
        <div className="flex flex-wrap gap-x-12 px-16">
            {
                // Map over the news articles and render each one as a card
                mynews.map((elem, index) => {
                    return (
                        <div key={index} className="m-4 h-auto w-96 rounded overflow-hidden shadow-lg">
                            {/* Display the article image or display placeholder image if the image is null */}
                            <img className="w-full" src={elem.urlToImage == null ? "https://pbs.twimg.com/media/C2cyM1FWEAA2Oib.jpg" : elem.urlToImage} alt="News" />
                            <div className="px-6 py-4">
                                {/* Display the author of the article */}
                                <div className="text-gray-700 font-bold text-xl mb-2 hover:text-gray-600 cursor-pointer">{elem.author}</div>
                                {/* Display the publication date, formatted to remove 'T' and 'Z' */}
                                <div className="text-gray-700 font-bold text-sm mb-2 hover:text-gray-600 cursor-pointer">Published At: {elem.publishedAt.replace("T", " ").replace("Z", " ")}</div>
                                {/* Display the title of the article */}
                                <p className="text-black text-base mb-4">
                                    {elem.title}
                                </p>
                                {/* Link to the full article the link will open in new tab*/}
                                <a href={elem.url} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Read More
                                </a>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

// Export the Cards component as the default export
export default Cards;
