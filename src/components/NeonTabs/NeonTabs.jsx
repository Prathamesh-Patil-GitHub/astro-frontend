import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './NeonTabs.css'; // Ensure the CSS is imported
import loader from '../../assets/loader.gif'; // Import the loader image

const NeonTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apis = [
    "https://astro-backend-topaz.vercel.app/get-kundali",
    "https://astro-backend-topaz.vercel.app/get-ai-recommendations",
    "https://astro-backend-topaz.vercel.app/get-spiritual-content",
  ];

  // Function to handle tab change and fetch API data
  const fetchTabData = async (tabId) => {
    setLoading(true);
    try {
      const response = await fetch(apis[tabId - 1], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: localStorage.getItem("planets") }),
      });
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when tab changes
  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab]);

  return (
    <div className="neon-container">
      <h1 className="neon-title">Your Horoscope</h1>
      <div className="tabs">
        <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
          Career, Personal Growth and Family
        </div>
        <div className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>
          Gemstones and Pooja
        </div>
        <div className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => setActiveTab(3)}>
          Meditation, Workouts and Sleep Content
        </div>
      </div>

      <div className="tab-content">
        {loading ? (
          <p><img width={"250px"} src={loader}/></p>
        ) : (
          apiData && (
            <ReactMarkdown>{apiData.data}</ReactMarkdown>
          )
        )}
      </div>
    </div>
  );
};

export default NeonTabs;
