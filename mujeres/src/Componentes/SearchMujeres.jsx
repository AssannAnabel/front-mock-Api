import React, { useState } from 'react';

const SearchMujeres = ({ women }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWomen, setFilteredWomen] = useState(women);

  const handleSearch = () => {
    const results = women.filter(woman =>
      `${woman.name} ${woman.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWomen(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {filteredWomen.map(woman => (
          <li key={woman.id}>
            <h2>{woman.name} {woman.lastName}</h2>
            <p>{woman.nationality}</p>
            <p>{woman.bio}</p>
            <img src={woman.photo} alt={`${woman.name}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMujeres;
