import { render, fireEvent } from '@testing-library/react';
import UserTable from './UserTable';

// Mock de las funciones fetchData, sortUsers y toggleRowColors
jest.mock('../utils', () => ({
  fetchData: jest.fn(() => Promise.resolve([])),
  sortUsers: jest.fn((users) => users),
  toggleRowColors: jest.fn((colors) => colors),
}));

describe('UserTable', () => {
  beforeEach(() => {
    // Limpia las llamadas a las funciones mock antes de cada prueba
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<UserTable />);
  });

  it('fetches data on mount', async () => {
    render(<UserTable />);
    
    // Espera a que se llame a fetchData
    await expect(require('../utils').fetchData).toHaveBeenCalled();
  });

  it('handles sorting when column header is clicked', () => {
    const { getByText } = render(<UserTable />);
    
    // Simula un clic en el encabezado de la columna de nombre
    fireEvent.click(getByText('Nombre'));
    
    // Verifica que se llame a sortUsers con la columna correspondiente
    expect(require('../utils').sortUsers).toHaveBeenCalledWith([], 'name.first', true);
  });

  it('handles toggling row colors when button is clicked', () => {
    const { getByText } = render(<UserTable />);
    
    // Simula un clic en el botón "Colorear Filas"
    fireEvent.click(getByText('Colorear Filas'));
    
    // Verifica que se llame a toggleRowColors
    expect(require('../utils').toggleRowColors).toHaveBeenCalled();
  });

});
