import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  url = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=pt&appid=33c7aa3f2aef038c05d28c3fb0668a73&q="

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toast: Toast, public http: Http, public alertCtrl: AlertController, public loadingController: LoadingController) {
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

  entrar(login:string, senha:string){
    let loading = this.loadingController.create({ content: "Entrando" });
    loading.present();

    this.sqlite.create({
      name: 'weather.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM usuario',[]).then(res => {
        let autenticado = false;
        let cidade;
        let i;
        for(i=0; i<res.rows.length; i++){
          if(res.rows.item(i).login == login && res.rows.item(i).senha == senha){
            autenticado = true;
            cidade = res.rows.item(i).cidade;
          }
        }

        if(autenticado){
          loading.dismiss()

          this.navCtrl.setRoot(HomePage, {cidade: cidade})
        } else {
          loading.dismiss();

          let alert = this.alertCtrl.create({
            title: 'Não autenticado',
            subTitle: 'Verifique o login e senha e tente novamente',
            buttons: ['OK']
          });
          alert.present();
        }
      }).catch(e => {
        console.log(e);
      });
    }).catch(e => {
      console.log(e);
    });
  }

  cadastrar(username:string, cidade:string, senha:string) {
    let loading = this.loadingController.create({ content: "Cadastrando" });
    loading.present();

    let jaCadastrado = false;
    this.sqlite.create({
      name: 'weather.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM usuario',[]).then(res => {
        let i;
        for(i=0; i<res.rows.length; i++){
          if(res.rows.item(i).login == username){
            jaCadastrado = true;
          }
        }

        if(jaCadastrado){
          loading.dismiss();

          let alert = this.alertCtrl.create({
            title: 'Username já sendo usado',
            subTitle: 'Tente outro',
            buttons: ['OK']
          });
          alert.present();
        } else {
          this.http.get(this.url+encodeURI(cidade)).map(res => res.json()).subscribe(data => {
            this.sqlite.create({
              name: 'weather.db',
              location: 'default'
            }).then((db: SQLiteObject) => {
              db.executeSql('INSERT INTO usuario VALUES(NULL,?,?,?)',[username, cidade, senha]).then(res => {
                loading.dismiss();

                let alert = this.alertCtrl.create({
                  title: 'Cadastro realizado com sucesso',
                  subTitle: 'Agora você pode realizar o login',
                  buttons: ['OK']
                });
                alert.present();
              }).catch(e => {
                console.log(e);
              });
            }).catch(e => {
              console.log(e);
            });
          }, err => {
            loading.dismiss();

            if(err.status === 404){
              let alert = this.alertCtrl.create({
                title: 'Cidade não encontrada',
                subTitle: 'Verifique e tente novamente',
                buttons: ['OK']
              });
              alert.present();
            } else {
              let alert = this.alertCtrl.create({
                title: 'Erro de conexão',
                subTitle: 'Verifique a conexão com a internet',
                buttons: ['OK']
              });
              alert.present();
            }
          });
        }
      }).catch(e => {
        console.log(e);
      });
    }).catch(e => {
      console.log(e);
    });
  }
}
