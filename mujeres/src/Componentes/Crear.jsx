import React, { useState } from 'react';

const Crear = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWoman = { name, lastName, nationality, bio, photo };

    fetch("https://647dd4d6af984710854a6fcc.mockapi.io/mujeres", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWoman),
    })
    .then(response => response.json())
    .then(data => {
      console.log('New woman added:', data);
     
      setName('');
      setLastName('');
      setNationality('');
      setBio('');
      setPhoto('');
    })
    .catch(error => console.error('Error adding data:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      <input type="text" placeholder="Nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} required />
      <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} required></textarea>
      <input type="text" placeholder="Photo URL" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
      <button type="submit">Add Woman</button>
    </form>
  );
};

export default Crear;
