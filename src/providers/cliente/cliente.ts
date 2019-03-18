import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ClienteProvider {

  constructor(public http: HttpClient, private dbProvider: DatabaseProvider) {
    console.log('Hello ClienteProvider Provider');
  }

  public insert(cliente:Cliente) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'insert into cliente (nome, cidade, senha) values (?, ?, ?)';
      let data = [cliente.nome, cliente.cidade, cliente.senha];

      return db.executeSql(sql, data).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }

  public get(id:number) {
    return this.dbProvider.getDB().then((db: SQLiteObject) => {
      let sql = 'select * from cliente where id = ?';
      let data = [id];

      return db.executeSql(sql, data).then((data: any) => {
          if (data.rows.length > 0) {
            let item = data.rows.item(0);
            let cliente = new Cliente();

            cliente.id = item.id;
            cliente.nome = item.nome;
            cliente.cidade = item.cidade;

            return cliente;
          }
          return null;
        }).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }
}

export class Cliente {
  id:number;
  nome:string;
  cidade: string;
  senha: string;
}
