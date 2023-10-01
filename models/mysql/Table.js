import mysql from 'mysql2/promise.js';

const conn = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306,
  database: 'mente_db'
}).catch((err) => {
  console.error(err.code + ' - No. de error: ' + err.errno);
});

conn.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Conexión esitosa');
  }
});

export class Table {
  static table = '';
  static columns = [];

  id = null;

  static async all () {
    return await conn.query('SELECT * FROM ' + this.table);
  }

  static async search (column, value) {
    let query = 'SELECT * FROM ' + this.table + ' ';
    query += `WHERE ${column}='${value}'`;
    const results = conn.query(query);

    return results;
  }

  static async create ({ input }) {
    const [k, v] = this.sanitize(input);

    let query = 'INSERT INTO ' + this.table + ' ';
    query += '(' + k.join(', ') + ') ';
    query += 'VALUES (' + v.join(', ') + ')';

    const result = await conn.query(query);

    return result;
  }

  static sanitize (data) {
    const k = [];
    const v = [];

    Object.keys(data).forEach(element => {
      k.push(element);
    });
    Object.values(data).forEach(element => {
      v.push(mysql.escape(element));
    });

    return [k, v];
  }

  static async update ({ id, input }, replaceNulls = false) {
    const values = this.sanitize(input);
    let queryValues = '';
    for (let i = 0; i < values[0].length; i++) {
      const k = values[0][i];
      const v = values[1][i];
      if (this.columns.includes(k)) {
        if (v || replaceNulls) {
          queryValues += k + '=' + v + ', ';
        }
      }
    }
    if (values) {
      queryValues = queryValues.substring(0, queryValues.length - 2);
    }

    let query = 'UPDATE ' + this.table + ' ';
    query += 'SET ' + queryValues + ' ';
    query += 'WHERE id = ' + id;

    const result = await conn.query(query);

    return result;
  }
}
