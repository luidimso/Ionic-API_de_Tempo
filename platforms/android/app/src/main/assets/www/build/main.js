webpackJsonp([1],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, sqlite, toast, http, alertCtrl, loadingController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.toast = toast;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingController = loadingController;
        this.url = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=pt&appid=33c7aa3f2aef038c05d28c3fb0668a73&q=";
        this.criarBanco();
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.criarBanco = function () {
        this.sqlite.create({
            name: 'weather.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY, login TEXT, cidade TEXT, senha TEXT)', []).then(function (res) { return console.log('Executed SQL'); }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    LoginPage.prototype.entrar = function (login, senha) {
        var _this = this;
        var loading = this.loadingController.create({ content: "Entrando" });
        loading.present();
        this.sqlite.create({
            name: 'weather.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM usuario', []).then(function (res) {
                var autenticado = false;
                var cidade;
                var i;
                for (i = 0; i < res.rows.length; i++) {
                    if (res.rows.item(i).login == login && res.rows.item(i).senha == senha) {
                        autenticado = true;
                        cidade = res.rows.item(i).cidade;
                    }
                }
                if (autenticado) {
                    loading.dismiss();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */], { cidade: cidade });
                }
                else {
                    loading.dismiss();
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Não autenticado',
                        subTitle: 'Verifique o login e senha e tente novamente',
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
            }).catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    LoginPage.prototype.cadastrar = function (username, cidade, senha) {
        var _this = this;
        var loading = this.loadingController.create({ content: "Cadastrando" });
        loading.present();
        var jaCadastrado = false;
        this.sqlite.create({
            name: 'weather.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM usuario', []).then(function (res) {
                var i;
                for (i = 0; i < res.rows.length; i++) {
                    if (res.rows.item(i).login == username) {
                        jaCadastrado = true;
                    }
                }
                if (jaCadastrado) {
                    loading.dismiss();
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Username já sendo usado',
                        subTitle: 'Tente outro',
                        buttons: ['OK']
                    });
                    alert_2.present();
                }
                else {
                    _this.http.get(_this.url + encodeURI(cidade)).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.sqlite.create({
                            name: 'weather.db',
                            location: 'default'
                        }).then(function (db) {
                            db.executeSql('INSERT INTO usuario VALUES(NULL,?,?,?)', [username, cidade, senha]).then(function (res) {
                                loading.dismiss();
                                var alert = _this.alertCtrl.create({
                                    title: 'Cadastro realizado com sucesso',
                                    subTitle: 'Agora você pode realizar o login',
                                    buttons: ['OK']
                                });
                                alert.present();
                            }).catch(function (e) {
                                console.log(e);
                            });
                        }).catch(function (e) {
                            console.log(e);
                        });
                    }, function (err) {
                        loading.dismiss();
                        if (err.status === 404) {
                            var alert_3 = _this.alertCtrl.create({
                                title: 'Cidade não encontrada',
                                subTitle: 'Verifique e tente novamente',
                                buttons: ['OK']
                            });
                            alert_3.present();
                        }
                        else {
                            var alert_4 = _this.alertCtrl.create({
                                title: 'Erro de conexão',
                                subTitle: 'Verifique a conexão com a internet',
                                buttons: ['OK']
                            });
                            alert_4.present();
                        }
                    });
                }
            }).catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/luidi/Desktop/Ionic-API_de_Tempo/src/pages/login/login.html"*/'<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-4>\n        <ion-item>\n          <ion-label floating>Login</ion-label>\n          <ion-input type="text" #login></ion-input>\n        </ion-item>\n      </ion-col>\n\n      <ion-col col-4>\n        <ion-item>\n          <ion-label floating>Senha</ion-label>\n          <ion-input type="password" #senha_login></ion-input>\n        </ion-item>\n      </ion-col>\n\n      <ion-col col-4>\n        <br><br> <button ion-button (click)="entrar(login.value, senha_login.value)">Entrar</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <h1 text-center>Cadastro</h1>\n\n  <ion-item>\n    <ion-label>Nome de usuário</ion-label>\n    <ion-input type="text" #username></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Cidade</ion-label>\n    <ion-input type="text" #cidade></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Senha</ion-label>\n    <ion-input type="password" #senha></ion-input>\n  </ion-item><br><br>\n\n  <button ion-button block (click)="cadastrar(username.value, cidade.value, senha.value)">Cadastrar</button>\n</ion-content>\n'/*ion-inline-end:"/home/luidi/Desktop/Ionic-API_de_Tempo/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		273,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 153;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=pt&appid=33c7aa3f2aef038c05d28c3fb0668a73&q=";
        this.temp = [];
        this.temp_agora = null;
        this.url_agora = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt&appid=33c7aa3f2aef038c05d28c3fb0668a73&q=";
        this.cidade = this.navParams.get('cidade');
        this.http.get(this.url + encodeURI(this.cidade)).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.carregar(data);
        }, function (err) {
        });
        this.http.get(this.url_agora + encodeURI(this.cidade)).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.carregarAgora(data);
        }, function (err) {
        });
    }
    HomePage.prototype.carregar = function (data) {
        var i;
        for (i = 0; i < 3; i++) {
            this.temp[i] = data.list[i];
            this.temp[i].main.temp = parseInt(this.temp[i].main.temp);
        }
        console.log(this.temp);
    };
    HomePage.prototype.carregarAgora = function (data) {
        this.temp_agora = data;
        this.temp_agora.main.temp = parseInt(this.temp_agora.main.temp);
        console.log(this.temp_agora);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/luidi/Desktop/Ionic-API_de_Tempo/src/pages/home/home.html"*/'<ion-header padding *ngIf="temp.length > 0 && temp_agora != null">\n  <div>\n    <h2>{{temp_agora.name}}</h2>\n    <h1 style="float: left">{{temp_agora.main.temp}}°C</h1> <img src="{{\'http://openweathermap.org/img/w/\'+temp_agora.weather[0].icon+\'.png\'}}" style="height: auto; width: 75px;">\n    <h3>{{temp_agora.weather[0].description}}</h3>\n  </div>\n</ion-header>\n\n<ion-content *ngIf="temp.length > 0 && temp_agora != null" style="margin-top: 175px">\n  <ion-card>\n    <ion-card-header>\n      <h1>Amanhã</h1>\n      <h2>{{cidade}}</h2>\n      <h3>{{temp[0].weather[0].description}}</h3>\n    </ion-card-header>\n\n    <ion-card-content>\n      <img src="{{\'http://openweathermap.org/img/w/\'+temp[0].weather[0].icon+\'.png\'}}" style="height: 25%; width: 25%;float: left;">\n      <h1 style="float: right; margin-top: 20px">{{temp[0].main.temp}}°C</h1>\n    </ion-card-content>\n  </ion-card>\n\n\n  <ion-card>\n    <ion-card-header>\n      <h1>Depois de amanhã</h1>\n      <h2>{{cidade}}</h2>\n      <h3>{{temp[1].weather[0].description}}</h3>\n    </ion-card-header>\n\n    <ion-card-content>\n      <img src="{{\'http://openweathermap.org/img/w/\'+temp[1].weather[0].icon+\'.png\'}}" style="height: 25%; width: 25%;float: left;">\n      <h1 style="float: right; margin-top: 20px">{{temp[1].main.temp}}°C</h1>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/luidi/Desktop/Ionic-API_de_Tempo/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_sqlite__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__["a" /* Toast */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/luidi/Desktop/Ionic-API_de_Tempo/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/luidi/Desktop/Ionic-API_de_Tempo/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map