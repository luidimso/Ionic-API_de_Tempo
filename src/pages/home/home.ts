import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cidade:string;
  url = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=pt&appid=33c7aa3f2aef038c05d28c3fb0668a73&q=";
  temp:any = [];
  temp_agora:any = null;
  url_agora = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt&appid=33c7aa3f2aef038c05d28c3fb0668a73&q=";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.cidade = this.navParams.get('cidade');

    this.http.get(this.url+encodeURI(this.cidade)).map(res => res.json()).subscribe(data => {
        this.carregar(data);
    }, err => {
    });

    this.http.get(this.url_agora+encodeURI(this.cidade)).map(res => res.json()).subscribe(data => {
        this.carregarAgora(data);
    }, err => {
    });
  }

  carregar(data){
    let i;

    for(i=0; i<3; i++){
      this.temp[i] = data.list[i];
      this.temp[i].main.temp = parseInt(this.temp[i].main.temp);
    }

    console.log(this.temp);
  }

  carregarAgora(data){
    this.temp_agora = data;
    this.temp_agora.main.temp = parseInt(this.temp_agora.main.temp);

    console.log(this.temp_agora);
  }
}
