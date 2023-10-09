import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchData, sortUsers, toggleRowColors } from '../utils'; 
import { User } from '../types/user';

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [rowColors, setRowColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortByCountry, setSortByCountry] = useState(false);

  useEffect(() => {
    const fetchDataAndInitialize = async () => {
      const userData = await fetchData();
      setUsers(userData);
      setSortedUsers(userData);
      setRowColors(new Array(userData.length).fill('#000000'));
    };

    fetchDataAndInitialize();
  }, []);

  const handleSort = (column: string) => {
    const ascending = column === sortBy ? !sortAscending : true;
    const sorted = sortUsers(sortedUsers, column, ascending);

    setSortedUsers(sorted);
    setSortAscending(ascending);
    setSortBy(column);
  };

  const handleToggleColors = () => {
    const newColors = toggleRowColors(rowColors);
    setRowColors(newColors);
  };

  const handleReset = () => {
    setSortedUsers(users);
    setSortAscending(true);
    setSortBy(null);
    setSearchText('');
    setRowColors(new Array(users.length).fill('#000000'));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);

    const filteredUsers = users.filter((user) =>
      user.location.country.toLowerCase().includes(searchText)
    );

    setSortedUsers(filteredUsers);
    setSortBy(null);
  };

  const handleDelete = (index: number) => {
    const updatedUsers = [...sortedUsers];
    updatedUsers.splice(index, 1);
    setSortedUsers(updatedUsers);
  };

  const handleSortByCountry = () => {
    // Alternar el estado sortByCountry al hacer clic en el botón
    setSortByCountry(!sortByCountry);

    if (!sortByCountry) {
      // Si sortByCountry es falso, ordenar por país
      handleSort('location.country');
    } else {
      // Si sortByCountry es verdadero, restaurar el orden original
      setSortedUsers(users);
      setSortBy(null);
    }
  };

  return (
    <div>
      <h1>Prueba Técnica</h1>
      <div className="button-container">
        <button onClick={handleToggleColors}>Colorear Filas</button>
        <button onClick={handleSortByCountry}>
          {sortByCountry ? 'No ordenar por País' : 'Ordenar por País'} 
        </button>
        <button onClick={handleReset}>Resetear Estado</button>
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
              <tr key={index} style={{ backgroundColor: rowColors[index] }}>
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
};

export default UserTable;
