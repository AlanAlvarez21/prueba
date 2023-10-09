import { User } from '../types/user';

export const fetchData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const { results: userData } = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  export const sortUsers = (
    users: User[],
    column: string,
    sortAscending: boolean
  ) => {
    return [...users].sort((a, b) => {
      const aValue = column === 'location.country'
        ? a.location.country.toLowerCase()
        : column === 'name.first'
          ? a.name.first.toLowerCase()
          : a.name.last.toLowerCase();
  
      const bValue = column === 'location.country'
        ? b.location.country.toLowerCase()
        : column === 'name.first'
          ? b.name.first.toLowerCase()
          : b.name.last.toLowerCase();
  
      return sortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  };
  
  export const toggleRowColors = (rowColors: string[]) => {
    return rowColors.map((_, index) =>
      index % 2 === 0 ? '#808080' : '#D3D3D3'
    );
  };
  