import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  url = "http://api.openweathermap.org/data/2.5/forecast?q=Campos%20dos%20Goytacazes&units=metric&lang=pt&appid=33c7aa3f2aef038c05d28c3fb0668a73";
  temp:any = [];
  temp_agora:any = null;
  url_agora = "https://api.openweathermap.org/data/2.5/weather?q=Campos%20dos%20Goytacazes&units=metric&lang=pt&appid=33c7aa3f2aef038c05d28c3fb0668a73";

  constructor(public navCtrl: NavController, public http: Http) {
    this.http.get(this.url).map(res => res.json()).subscribe(data => {
        this.carregar(data);
    }, err => {
    });

    this.http.get(this.url_agora).map(res => res.json()).subscribe(data => {
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

    console.log(this.temp_agora);
  }
}
