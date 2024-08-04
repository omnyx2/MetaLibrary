'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './TopicSelector.module.css';

const ConfigSelector = ({ configName, currentPage = 'SLAM' }) => {
  const [config, setConfig] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/topics');
        if (!res.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await res.json();
        setConfig(data);
      } catch (error) {
        console.error('Error fetching config:', error);
        // Set a default error state or handle it as needed
      }
    };

    fetchConfig(); // Call fetchConfig
  }, []);

  // Handle loading and errors 
  if (config.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.middle}>
      <select
        className={styles.topicSelector}
        value={currentPage}
        onChange={(e) => {
          // Redirect using Next.js's built-in Link component
          // This will navigate without a full page reload
          // Assuming 'e.target.value' is a valid page path
          window.location.href = e.target.value; // Keeping this for now, but consider using Next.js's Link component
        }}
      >
        {config.config.map((topic) => (
          <option key={topic.path} value={topic.path}>
            {topic.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConfigSelector;