
import React, { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search chat history..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={() => onSearch(query)}
        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
