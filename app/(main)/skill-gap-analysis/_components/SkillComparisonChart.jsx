'use client';

import { useState } from 'react';

export default function SkillComparisonChart() {
  const [userSkills, setUserSkills] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnalysis('');
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/skill-gap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userSkills: userSkills.split(',').map(skill => skill.trim()),
          targetRole,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // Clean the response from markdown symbols (*) and emojis
      const cleanResponse = data.analysis
  .replace(/[\*_`#~]/g, '') // remove markdown symbols
  .replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g, '');
      setAnalysis(cleanResponse);
    } catch (err) {
      setError(`Failed to load skill gap analysis: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Your Skills (comma separated)</label>
          <input
            type="text"
            value={userSkills}
            onChange={(e) => setUserSkills(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g. JavaScript, React, Node.js"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Target Role</label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g. Full Stack Developer"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Analyze Skill Gap
        </button>
      </form>

      {loading && <p className="mt-4 text-blue-500">Analyzing skills, please wait...</p>}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {analysis && !loading && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Analysis:</h3>
          <pre className="whitespace-pre-wrap">{analysis}</pre>
        </div>
      )}
    </div>
  );
}
