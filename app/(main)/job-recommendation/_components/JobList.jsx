'use client';

import { useEffect, useState } from 'react';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [userProfile, setUserProfile] = useState({
    experience: '',
    domain: '',
    skills: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('/api/recommend-jobs', {
      method: 'POST',
      body: JSON.stringify(userProfile),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : { recommendations: [] };
    
    console.log("Response:", data);
    
    setJobs(Array.isArray(data.recommendations) ? data.recommendations : []);
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    setJobs([]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🚀 AI-Powered Job Recommendations</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="experience"
          value={userProfile.experience}
          onChange={handleChange}
          placeholder="Your experience (e.g., 3 years)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="domain"
          value={userProfile.domain}
          onChange={handleChange}
          placeholder="Your domain (e.g., Data Science)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="skills"
          value={userProfile.skills}
          onChange={handleChange}
          placeholder="Your skills (e.g., Python, SQL)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-60"
        >
          {loading ? 'Finding Jobs...' : 'Get Recommendations'}
        </button>
      </form>

      {loading && (
        <p className="mt-4 text-blue-600 text-center animate-pulse">Fetching job recommendations...</p>
      )}

      {jobs.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">🎯 Recommended Jobs:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {jobs.map((job, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-md">
                {job}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading && (
          <p className="mt-6 text-center text-gray-500">
            No job recommendations available. Fill in your details to get started.
          </p>
        )
      )}
    </div>
  );
}
