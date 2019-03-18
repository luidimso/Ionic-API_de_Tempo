import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClienteProvider, Cliente } from '../../providers/cliente/cliente'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  cliente:Cliente;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private clienteProvider: ClienteProvider,) {
    this.cliente = new Cliente()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  private cadastrar(nome:string, cidade:string, senha:string){
    this.cliente.nome = nome;
    this.cliente.cidade = cidade;
    this.cliente.senha = senha;

    this.clienteProvider.insert(this.cliente);
  }
}
