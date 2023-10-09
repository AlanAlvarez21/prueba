import { User } from '../types/user';
import { fetchData, sortUsers, toggleRowColors } from './index';

describe('fetchData', () => {
  it('should fetch user data', async () => {
    // Mock de datos de usuario ficticios
    const mockUserData: User[] = [
        {
          name: {
            first: 'John',
            last: 'Doe',
          },
          location: {
            country: 'USA',
          },
          picture: {
            thumbnail: 'https://example.com/john.jpg',
          },
        },
      ] as User[]; 
      
    
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: mockUserData }),
    });

    const userData = await fetchData();

    expect(userData).toEqual(mockUserData);
  });
});

describe('sortUsers', () => {
  it('should sort users by name first in ascending order', () => {
    const users: User[] = [
      {
        name: {
          first: 'John',
          last: 'Doe',
        },
        location: {
          country: 'USA',
        },
        picture: {
          thumbnail: 'https://example.com/john.jpg',
        },
      },
      {
        name: {
          first: 'Alice',
          last: 'Smith',
        },
        location: {
          country: 'Canada',
        },
        picture: {
          thumbnail: 'https://example.com/alice.jpg',
        },
      },
    ];

    // Ordena los usuarios por nombre en orden ascendente
    const sortedUsers = sortUsers(users, 'name.first', true);

    // Verifica que los usuarios estén ordenados correctamente por nombre
    expect(sortedUsers[0].name.first).toBe('Alice');
    expect(sortedUsers[1].name.first).toBe('John');
  });
});

describe('toggleRowColors', () => {
  it('should toggle row colors correctly', () => {
    const rowColors: string[] = ['#808080', '#D3D3D3', '#808080'];

    // Aplica la función para alternar colores
    const newColors = toggleRowColors(rowColors);

    // Verifica que los colores se alternen correctamente
    expect(newColors[0]).toBe('#808080');
    expect(newColors[1]).toBe('#D3D3D3');
    expect(newColors[2]).toBe('#808080');
  });
});
