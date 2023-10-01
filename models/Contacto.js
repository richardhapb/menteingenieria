import { Table } from './mysql/Table.js';

export class Contacto extends Table {
  static table = 'tblContactos';
  static columns = ['nombre', 'email', 'telefono', 'empresa'];

  nombre = '';
  email = '';
  telefono = '';
  empresa = '';
  fechaHora = null;
}
