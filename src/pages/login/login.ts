import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toast: Toast) {
    this.criarBanco();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  criarBanco() {
    this.sqlite.create({
      name: 'weather.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY, login TEXT, cidade TEXT, senha TEXT)', []).then(res => console.log('Executed SQL')).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  cadastrar(nome:string, cidade:string, senha:string) {
    this.sqlite.create({
      name: 'weather.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO usuario VALUES(NULL,?,?,?)',[login, cidade, senha]).then(res => {
        console.log(res);
      }).catch(e => {
        console.log(e);
      });
    }).catch(e => {
      console.log(e);
    });
  }
}
