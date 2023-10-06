import React, { useState, useEffect } from 'react';
import './App.css';

interface User {
  name: {
    first: string;
    last: string;
  };
  location: {
    country: string;
  };
  picture: {
    thumbnail: string;
  };
  [key: string]: any; // Firma de índice que permite acceder a propiedades usando cadenas
}


function App() {
  const initialUsers: User[] = [];
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [sortedUsers, setSortedUsers] = useState<User[]>(initialUsers);
  const [sortAscending, setSortAscending] = useState(true);
  const [sortByCountry, setSortByCountry] = useState(false); // Nuevo estado para rastrear si el ordenamiento por país está activo
  const [searchText, setSearchText] = useState('');
  const [rowColors, setRowColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null); // Columna por la que se ordena
  const [_, setFilterBy] = useState<string | null>(null); // Columna por la que se filtra

  const fetchData = () => {
    fetch('https://randomuser.me/api/?results=100')
      .then(response => response.json())
      .then(data => {
        const userData = data.results as User[];
        setUsers(userData);
        setSortedUsers(userData);
        setRowColors(new Array(userData.length).fill('#000000'));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (index: number) => {
    const updatedUsers = [...sortedUsers];
    updatedUsers.splice(index, 1);
    setSortedUsers(updatedUsers);
  };

  const handleSort = (column: string) => {
    const ascending = column === sortBy ? !sortAscending : true;
  
    const sorted = [...sortedUsers].sort((a, b) => {
      if (column === 'location.country') {
        return ascending
          ? a.location.country.localeCompare(b.location.country)
          : b.location.country.localeCompare(a.location.country);
      } else if (column === 'name.first') {
        const aValue = a.name.first.toLowerCase();
        const bValue = b.name.first.toLowerCase();
        return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (column === 'name.last') {
        const aValue = a.name.last.toLowerCase();
        const bValue = b.name.last.toLowerCase();
        return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
  
      const aValue = a[column].toLowerCase();
      const bValue = b[column].toLowerCase();
      return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  
    setSortedUsers(sorted);
    setSortAscending(ascending);
    setSortBy(column);
  };
  
  
  
  const handleSortByCountry = () => {
    handleSort('location.country');
    setSortByCountry(!sortByCountry); 
  };



  const handleReset = () => {
    fetchData();
    setSortAscending(true);
    setSortBy(null);
    setFilterBy(null);
    setRowColors(new Array(users.length).fill('#000000'));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);

    const filteredUsers = users.filter(user =>
      user.location.country.toLowerCase().includes(searchText)
    );

    setSortedUsers(filteredUsers);
    setFilterBy('location.country');
  };

  const handleToggleColors = () => {
    const newColors = [...rowColors].map((_, index) => {
      return index % 2 === 0 ? '#808080' : '#D3D3D3';
    });

    setRowColors(newColors);
  };

  return (
    <div>
      <h1>Prueba Técnica</h1>
      <div className="button-container">
        <button onClick={handleToggleColors}>
          Colorear Filas
        </button>
        <button onClick={handleSortByCountry}>
          {sortByCountry ? 'No ordenar por País' : 'Ordenar por País'} 
        </button>
        <button onClick={handleReset}>
          Resetear Estado
        </button>
        <input
          type="text"
          placeholder="Buscar por país"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="table-container">
        <table className="full-width-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th onClick={() => handleSort('name.first')}>Nombre</th>
              <th onClick={() => handleSort('name.last')}>Apellido</th>
              <th onClick={() => handleSort('location.country')}>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr
                key={index}
                style={{ backgroundColor: rowColors[index] }}
              >
                <td>
                  <img
                    src={user.picture.thumbnail}
                    alt={`${user.name.first} ${user.name.last}`}
                  />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
