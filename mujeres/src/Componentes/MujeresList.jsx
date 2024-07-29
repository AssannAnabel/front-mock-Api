import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Swal from 'sweetalert2';
import '../Styles/MujeresList.css';

const MujeresList = () => {
  const [women, setWomen] = useState([]);
  const [filteredWomen, setFilteredWomen] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newWoman, setNewWoman] = useState({ name: '', lastName: '', nationality: '', bio: '', photo: '' });
  const [editingWoman, setEditingWoman] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setNewWoman({ name: '', lastName: '', nationality: '', bio: '', photo: '' });
      })
      .catch(error => console.error('Error creating data:', error));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://647dd4d6af984710854a6fcc.mockapi.io/mujeres/${id}`, {
          method: 'DELETE',
        })
          .then(() => {
            const updatedWomen = women.filter(woman => woman.id !== id);
            setWomen(updatedWomen);
            setFilteredWomen(updatedWomen);
            Swal.fire('Deleted!', 'The entry has been deleted.', 'success');
          })
          .catch(error => {
            console.error('Error deleting data:', error);
            Swal.fire('Error!', 'There was an error deleting the entry.', 'error');
          });
      }
    });
  };

  const handleEdit = (woman) => {
    setEditingWoman(woman);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    fetch(`https://647dd4d6af984710854a6fcc.mockapi.io/mujeres/${editingWoman.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingWoman),
    })
      .then(response => response.json())
      .then(data => {
        const updatedWomen = women.map(woman => (woman.id === data.id ? data : woman));
        setWomen(updatedWomen);
        setFilteredWomen(updatedWomen);
        setEditingWoman(null);
        setIsModalOpen(false);
      })
      .catch(error => console.error('Error updating data:', error));
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
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Woman</h2>
            <input
              type="text"
              placeholder="Name"
              value={editingWoman.name}
              onChange={(e) => setEditingWoman({ ...editingWoman, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="LastName"
              value={editingWoman.lastName}
              onChange={(e) => setEditingWoman({ ...editingWoman, lastName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nationality"
              value={editingWoman.nationality}
              onChange={(e) => setEditingWoman({ ...editingWoman, nationality: e.target.value })}
            />
            <input
              type="text"
              placeholder="Bio"
              value={editingWoman.bio}
              onChange={(e) => setEditingWoman({ ...editingWoman, bio: e.target.value })}
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={editingWoman.photo}
              onChange={(e) => setEditingWoman({ ...editingWoman, photo: e.target.value })}
            />
            <button onClick={handleUpdate}>Ok</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="card-grid">
        {filteredWomen.map(woman => (
          <div className="card" key={woman.id}>
            <img src={woman.photo} alt={`${woman.name}`} />
            <h2>{woman.name} {woman.lastName}</h2>
            <p>{woman.nationality}</p>
            <p>{woman.bio}</p>
            <button onClick={() => handleEdit(woman)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(woman.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MujeresList;
