import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../Styles/MujeresList.css';

const MujeresList = () => {
  const [women, setWomen] = useState([]);
  const [filteredWomen, setFilteredWomen] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newWoman, setNewWoman] = useState({ name: '', lastName: '', nationality: '', bio: '', photo: '' });

  useEffect(() => {
    fetch('https://647dd4d6af984710854a6fcc.mockapi.io/mujeres')
      .then(response => response.json())
      .then(data => {
        setWomen(data);
        setFilteredWomen(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = () => {
    const results = women.filter(woman =>
      `${woman.name} ${woman.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWomen(results);
    setSearchTerm('');
  };

  const handleReset = () => {
    setFilteredWomen(women); 
    setSearchTerm(''); 
  };

  const handleCreate = () => {
    fetch('https://647dd4d6af984710854a6fcc.mockapi.io/mujeres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWoman),
    })
      .then(response => response.json())
      .then(data => {
        const updatedWomen = [...women, data];
        setWomen(updatedWomen);
        setFilteredWomen(updatedWomen);
        setNewWoman({ name: '', lastName: '', nationality: '', bio: '', photo: '' }); // Restablecer inputs
      })
      .catch(error => console.error('Error creating data:', error));
  };

  const handleDelete = (id) => {
    fetch(`https://647dd4d6af984710854a6fcc.mockapi.io/mujeres/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedWomen = women.filter(woman => woman.id !== id);
        setWomen(updatedWomen);
        setFilteredWomen(updatedWomen);
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1>Women who made history</h1>
      </div>
      <div className="tabs-container">
        <Tabs>
          <TabList>
            <Tab>Search</Tab>
            <Tab>Create</Tab>
          </TabList>

          <TabPanel>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
              <button onClick={handleReset}>Return</button>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="create-container">
              <input
                type="text"
                placeholder="Name"
                value={newWoman.name}
                onChange={(e) => setNewWoman({ ...newWoman, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="LastName"
                value={newWoman.lastName}
                onChange={(e) => setNewWoman({ ...newWoman, lastName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nationality"
                value={newWoman.nationality}
                onChange={(e) => setNewWoman({ ...newWoman, nationality: e.target.value })}
              />
              <input
                type="text"
                placeholder="Bio"
                value={newWoman.bio}
                onChange={(e) => setNewWoman({ ...newWoman, bio: e.target.value })}
              />
              <input
                type="text"
                placeholder="Photo URL"
                value={newWoman.photo}
                onChange={(e) => setNewWoman({ ...newWoman, photo: e.target.value })}
              />
              <button onClick={handleCreate}>Create</button>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <div className="card-grid">
        {filteredWomen.map(woman => (
          <div className="card" key={woman.id}>
            <img src={woman.photo} alt={`${woman.name}`} />
            <h2>{woman.name} {woman.lastName}</h2>
            <p>{woman.nationality}</p>
            <p>{woman.bio}</p>
            <button onClick={() => handleDelete(woman.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MujeresList;
