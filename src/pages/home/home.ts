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
  temp = [];

  constructor(public navCtrl: NavController, public http: Http) {
    this.http.get(this.url).map(res => res.json()).subscribe(data => {
        this.carregar(data);
    }, err => {
    });
  }

  carregar(data){
    let i;

    for(i=0; i<3; i++){
      this.temp[i] = data.list[i];
      this.temp[i].main.temp = parseInt(this.temp[i].main.temp)
    }

    console.log(this.temp);
  }
}
