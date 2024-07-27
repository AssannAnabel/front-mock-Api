import React, { useState, useEffect } from 'react';

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
    <div>
      <h1>Mujeres Bellas y Famosas</h1>
      
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={handleReset}>Volver</button>
      
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={newWoman.name}
          onChange={(e) => setNewWoman({ ...newWoman, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={newWoman.lastName}
          onChange={(e) => setNewWoman({ ...newWoman, lastName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nacionalidad"
          value={newWoman.nationality}
          onChange={(e) => setNewWoman({ ...newWoman, nationality: e.target.value })}
        />
        <input
          type="text"
          placeholder="Historia"
          value={newWoman.bio}
          onChange={(e) => setNewWoman({ ...newWoman, bio: e.target.value })}
        />
        <input
          type="text"
          placeholder="Foto URL"
          value={newWoman.photo}
          onChange={(e) => setNewWoman({ ...newWoman, photo: e.target.value })}
        />
        <button onClick={handleCreate}>Crear</button>
      </div>

      <ul>
        {filteredWomen.map(woman => (
          <li key={woman.id}>
            <h2>{woman.name} {woman.lastName}</h2>
            <p>{woman.nationality}</p>
            <p>{woman.bio}</p>
            <img src={woman.photo} alt={`${woman.name}`} />
            <button onClick={() => handleDelete(woman.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MujeresList;
