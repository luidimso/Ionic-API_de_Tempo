import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient, private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  public getDB() {
    return this.sqlite.create({
      name: 'weather.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB().then((db: SQLiteObject) => {
      this.createTables(db);
    }).catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS usuario (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)']
    ]).then(() => console.log('Tabelas criadas')).catch(e => console.error('Erro ao criar as tabelas', e));
  }
}
