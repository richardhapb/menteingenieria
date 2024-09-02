import { randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export const readJSON = (path) => require(path);

export class Table {
  static columns = [];

  static db;

  id = null;

  static async setDB (db) {
    this.db = readJSON(db);
  }

  static async all () {
    return this.db;
  }

  static async create ({ input }) {
    const newReg = {
      id: randomUUID(),
      ...input
    };

    this.db.push(newReg);

    return newReg;
  }
}
