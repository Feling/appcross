(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!******************************************!*\
  !*** multi ./apps/app-cross/src/main.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\igor.korchagin\WebstormProjects\appcross\apps\app-cross\src\main.ts */"8W3b");


/***/ }),

/***/ "1RMo":
/*!************************************************************!*\
  !*** ./apps/app-cross/src/app/services/payment.service.ts ***!
  \************************************************************/
/*! exports provided: BankMap, currencyPerCountry, bankNameToBIC, bankNameToIBAN, BankRates, PaymentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankMap", function() { return BankMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyPerCountry", function() { return currencyPerCountry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bankNameToBIC", function() { return bankNameToBIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bankNameToIBAN", function() { return bankNameToIBAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankRates", function() { return BankRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentService", function() { return PaymentService; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "4USb");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");






const BankMap = {
    CITIUS33: {
        currency: {
            EUR: 'DEUTDEFF',
            GBR: 'CITIGB2L',
            CAD: 'CITICATTBCH'
        }
    },
    AGRIFRPP: {
        currency: {
            USD: 'CHASUS33'
        }
    }
};
const currencyPerCountry = {
    France: 'EUR',
    Israel: 'ILS',
    Moldova: 'EURO'
};
const bankNameToBIC = {
    DEUTDEFF: 'DEUTDEFFXXX',
    AGRIFRPP: 'AGRIFRPP881'
};
const bankNameToIBAN = {
    DEUTDEFF: 'DE89370400440532013000',
    AGRIFRPP: 'FR7611206000150002052067096'
};
const BankRates = {
    DEUTDEFF: 0.8400,
    AGRIFRPP: 0.8554
};
class PaymentService {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.paymentObj = {
            settlementInstructions: {
                bank: '',
                correspondent: '',
                currency: ''
            },
            country: '',
            currency: '',
            bank: '',
            amount: '',
            creditorName: '',
            remittanceInformationUnstructured: ''
        };
        this.createQueryString = (data) => {
            return Object.keys(data).map(key => {
                let val = data[key];
                if (val !== null && typeof val === 'object')
                    val = this.createQueryString(val);
                return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`;
            }).join('&');
        };
    }
    setProperty(prop, value) {
        this.paymentObj[prop] = value;
    }
    setSettlement(prop, value) {
        this.paymentObj.settlementInstructions[prop] = value;
    }
    setBank(value) {
        this.paymentObj.bank = value;
    }
    setCurrency(value) {
        if (value === 'local') {
            this.paymentObj.currency = currencyPerCountry[this.paymentObj.country];
        }
        else {
            this.paymentObj.currency = value;
        }
    }
    getCorrespondent() {
        if (this.paymentObj.currency === 'local') {
            this.paymentObj.currency = currencyPerCountry[this.paymentObj.country];
        }
        else {
            this.paymentObj.currency = 'USD';
        }
        let corrsBank = BankMap[this.paymentObj.settlementInstructions.bank].currency[this.paymentObj.currency];
        if (corrsBank) {
            this.paymentObj.settlementInstructions.correspondent = corrsBank;
        }
        this.paymentObj.settlementInstructions.currency = this.paymentObj.currency;
        console.log(this.paymentObj);
    }
    preprareJSON() {
        let jsonSaltEdge = {
            creditorAccount: { bic: '', iban: '' },
            creditorName: '',
            endToEndIdentification: '',
            instructedAmount: { amount: '', currency: '' },
            remittanceInformationUnstructured: ''
        };
        if (this.paymentObj.currency === 'EUR') {
            jsonSaltEdge.creditorName = this.paymentObj.creditorName;
            jsonSaltEdge.instructedAmount.currency = this.paymentObj.currency;
            jsonSaltEdge.endToEndIdentification = Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])();
            jsonSaltEdge.remittanceInformationUnstructured = this.paymentObj.remittanceInformationUnstructured;
            jsonSaltEdge.creditorAccount.iban = bankNameToIBAN[BankMap[this.paymentObj.settlementInstructions.bank].currency[this.paymentObj.currency]];
            jsonSaltEdge.creditorAccount.bic = bankNameToBIC[BankMap[this.paymentObj.settlementInstructions.bank].currency[this.paymentObj.currency]];
            jsonSaltEdge.instructedAmount.amount = (Number(BankRates[BankMap[this.paymentObj.settlementInstructions.bank].currency[this.paymentObj.currency]]) * Number(this.paymentObj.amount)).toString();
        }
        if (this.paymentObj.currency === 'USD') {
            jsonSaltEdge.creditorName = this.paymentObj.creditorName;
            jsonSaltEdge.instructedAmount.amount = this.paymentObj.amount;
            jsonSaltEdge.instructedAmount.currency = 'EUR';
            jsonSaltEdge.endToEndIdentification = Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])();
            jsonSaltEdge.remittanceInformationUnstructured = this.paymentObj.remittanceInformationUnstructured;
            jsonSaltEdge.creditorAccount.iban = bankNameToIBAN[this.paymentObj.bank];
            jsonSaltEdge.creditorAccount.bic = bankNameToBIC[this.paymentObj.bank];
            jsonSaltEdge.instructedAmount.amount = (Number(BankRates[this.paymentObj.bank]) * Number(this.paymentObj.amount)).toString();
        }
        console.log(jsonSaltEdge);
        this.paymentJson = jsonSaltEdge;
    }
    getPaymentData() {
        return this.paymentJson;
    }
    calculateLocalAndUsd() {
        return {
            EUR: (Number(BankRates[BankMap[this.paymentObj.settlementInstructions.bank].currency['EUR']]) * Number(this.paymentObj.amount)).toString(),
            USD: (Number(BankRates[this.paymentObj.bank]) * Number(this.paymentObj.amount)).toString()
        };
    }
    flushData() {
        this.paymentJson = {};
    }
    createQueryParams() {
        let obj = { creditor_name: this.paymentJson.creditorName,
            instructed_amount: this.paymentJson.instructedAmount.amount,
            instructed_currency: this.paymentJson.instructedAmount.currency,
            remittance_information_unstructured: this.paymentJson.remittanceInformationUnstructured,
            end_to_end_identification: this.paymentJson.endToEndIdentification,
            creditor_account_iban: this.paymentJson.creditorAccount.iban };
        let query = this.createQueryString(obj);
        window.location.href = `https://finastra-hkt.herokuapp.com/?${query}`;
    }
}
PaymentService.ɵfac = function PaymentService_Factory(t) { return new (t || PaymentService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
PaymentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: PaymentService, factory: PaymentService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "8O69":
/*!************************************************************************!*\
  !*** ./apps/app-cross/src/app/components/payment/payment.component.ts ***!
  \************************************************************************/
/*! exports provided: PaymentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentComponent", function() { return PaymentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_payment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/payment.service */ "1RMo");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _country_select_country_select_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../country-select/country-select.component */ "msk9");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _courency_select_currency_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../courency-select/currency-select.component */ "XRE9");









function PaymentComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "app-currency-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("currencySelected", function PaymentComponent_div_4_Template_app_currency_select_currencySelected_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.currencySelected($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class PaymentComponent {
    constructor(paymentService, activatedroute, router) {
        this.paymentService = paymentService;
        this.activatedroute = activatedroute;
        this.router = router;
        this.isConsent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pickCurr = true;
        this.isBankSelected = false;
        this.isCurrencySelect = false;
    }
    ngOnInit() {
        this.activatedroute.queryParams.subscribe((data) => {
            console.log(data);
            this.merchData = data;
            this.paymentService.setSettlement('bank', data['bank']);
            this.paymentService.setProperty('creditorName', data['creditorName']);
            this.paymentService.setProperty('amount', data['amount']);
            this.paymentService.setProperty('remittanceInformationUnstructured', data['remittanceInformationUnstructured']);
        });
    }
    bankSelected(bool) {
        this.isBankSelected = bool;
        this.isCurrencySelect = true;
    }
    currencySelected(event) {
        this.paymentService.preprareJSON();
        this.isCurrencySelect = false;
        // this.isConsent.emit(true);
        this.paymentService.createQueryParams();
    }
}
PaymentComponent.ɵfac = function PaymentComponent_Factory(t) { return new (t || PaymentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_payment_service__WEBPACK_IMPORTED_MODULE_1__["PaymentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
PaymentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PaymentComponent, selectors: [["app-payment"]], outputs: { isConsent: "isConsent" }, decls: 5, vars: 1, consts: [[1, "title"], [1, "country-select"], [3, "bankSelected"], ["class", "currency-select", 4, "ngIf"], [1, "currency-select"], [3, "currencySelected"]], template: function PaymentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Please select:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-country-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("bankSelected", function PaymentComponent_Template_app_country_select_bankSelected_3_listener($event) { return ctx.bankSelected($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PaymentComponent_div_4_Template, 2, 0, "div", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isCurrencySelect);
    } }, directives: [_country_select_country_select_component__WEBPACK_IMPORTED_MODULE_3__["CountrySelectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _courency_select_currency_select_component__WEBPACK_IMPORTED_MODULE_5__["CurrencySelectComponent"]], styles: [".buttons[_ngcontent-%COMP%] {\n  padding: 25px;\n  display: flex;\n  flex-direction: column;\n}\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 30px;\n}\n\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwYXltZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtBQUNGIiwiZmlsZSI6InBheW1lbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnV0dG9ucyB7XHJcbiAgcGFkZGluZzogMjVweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi50aXRsZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMzBweDtcclxufVxyXG5cclxuaDIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "8W3b":
/*!************************************!*\
  !*** ./apps/app-cross/src/main.ts ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "o7l7");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "Dw1X");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch((err) => console.error(err));


/***/ }),

/***/ "APzi":
/*!*************************************************!*\
  !*** ./apps/app-cross/src/app/app.component.ts ***!
  \*************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");


class AppComponent {
    constructor() {
        this.title = 'Cross Border Payments!';
    }
    ngOnInit() {
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["appcross-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "Dw1X":
/*!********************************************************!*\
  !*** ./apps/app-cross/src/environments/environment.ts ***!
  \********************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "HAPT":
/*!************************************************************************!*\
  !*** ./apps/app-cross/src/app/components/consent/consent.component.ts ***!
  \************************************************************************/
/*! exports provided: ConsentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsentComponent", function() { return ConsentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_payment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/payment.service */ "1RMo");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/grid-list */ "40+f");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "Dxy4");






class ConsentComponent {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.buttonClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        this.paymentData = this.paymentService.getPaymentData();
    }
    cancelButton() {
        this.paymentService.flushData();
        this.buttonClicked.emit('cancel');
    }
    submitButton() {
        this.paymentService.createQueryParams();
    }
}
ConsentComponent.ɵfac = function ConsentComponent_Factory(t) { return new (t || ConsentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_payment_service__WEBPACK_IMPORTED_MODULE_1__["PaymentService"])); };
ConsentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ConsentComponent, selectors: [["app-consent"]], outputs: { buttonClicked: "buttonClicked" }, decls: 31, vars: 20, consts: [[1, "container"], [1, "title"], [1, "main"], [1, "payment-data"], ["cols", "4", "rowHeight", "40px"], [3, "colspan", "rowspan"], [1, "buttons"], ["mat-stroked-button", "", "color", "primary", 1, "custom-button", 3, "click"]], template: function ConsentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Consent");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Almost done,");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "We will need you to pay now from your bank. We will need you to provide a consent to SaltEdge Pay application. These are the details that we will share with Salt Edge Pay:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-grid-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-grid-tile", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Payee ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-grid-tile", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-grid-tile", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "IBAN ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-grid-tile", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-grid-tile", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Reference ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-grid-tile", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "mat-grid-tile", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Amount ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-grid-tile", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsentComponent_Template_button_click_27_listener() { return ctx.cancelButton(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConsentComponent_Template_button_click_29_listener() { return ctx.submitButton(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Confirm");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("colspan", 1)("rowspan", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("colspan", 3)("rowspan", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.paymentData.creditorAccount.bic);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("colspan", 1)("rowspan", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("colspan", 3)("rowspan", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.paymentData.creditorAccount.iban);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("colspan", 1)("rowspan", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("colspan", 3)("rowspan", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.paymentData.creditorAccount.bic);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("colspan", 1)("rowspan", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("colspan", 3)("rowspan", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.paymentData.instructedAmount.amount, " EUR");
    } }, directives: [_angular_material_grid_list__WEBPACK_IMPORTED_MODULE_2__["MatGridList"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_2__["MatGridTile"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"]], styles: [".buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  padding-top: 34px;\n}\n\n.custom-button[_ngcontent-%COMP%] {\n  width: 170px !important;\n  min-width: unset !important;\n  height: 58px !important;\n}\n\n.title[_ngcontent-%COMP%] {\n  padding-top: 27px;\n  font-size: 33px;\n  padding-left: 10px;\n}\n\n.main[_ngcontent-%COMP%] {\n  padding-top: 26px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n.mat-button.mat-primary[_ngcontent-%COMP%], .mat-icon-button.mat-primary[_ngcontent-%COMP%], .mat-stroked-button.mat-primary[_ngcontent-%COMP%] {\n  color: #0D93F8 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjb25zZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFHQTtFQUNFLHVCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtBQUFGOztBQUdBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFBRjs7QUFHQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUFGOztBQU9BO0VBQ0UseUJBQUE7QUFKRiIsImZpbGUiOiJjb25zZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ1dHRvbnMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgcGFkZGluZy10b3A6IDM0cHg7XHJcbn1cclxuXHJcblxyXG4uY3VzdG9tLWJ1dHRvbiB7XHJcbiAgd2lkdGg6IDE3MHB4IWltcG9ydGFudDtcclxuICBtaW4td2lkdGg6IHVuc2V0IWltcG9ydGFudDtcclxuICBoZWlnaHQ6IDU4cHghaW1wb3J0YW50O1xyXG59XHJcblxyXG4udGl0bGUge1xyXG4gIHBhZGRpbmctdG9wOiAyN3B4O1xyXG4gIGZvbnQtc2l6ZTogMzNweDtcclxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbn1cclxuXHJcbi5tYWluIHtcclxuICBwYWRkaW5nLXRvcDogMjZweDtcclxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTBweDtcclxufVxyXG5cclxuLnBheW1lbnQtZGF0YSB7XHJcblxyXG59XHJcblxyXG4ubWF0LWJ1dHRvbi5tYXQtcHJpbWFyeSwgLm1hdC1pY29uLWJ1dHRvbi5tYXQtcHJpbWFyeSwgLm1hdC1zdHJva2VkLWJ1dHRvbi5tYXQtcHJpbWFyeSB7XHJcbiAgY29sb3I6ICMwRDkzRjggIWltcG9ydGFudDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "XRE9":
/*!****************************************************************************************!*\
  !*** ./apps/app-cross/src/app/components/courency-select/currency-select.component.ts ***!
  \****************************************************************************************/
/*! exports provided: CurrencySelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencySelectComponent", function() { return CurrencySelectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_payment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/payment.service */ "1RMo");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/grid-list */ "40+f");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "Dxy4");






class CurrencySelectComponent {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.currencySelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    pickCurrency(type) {
        this.paymentService.setCurrency(type);
        this.currencySelected.emit(true);
    }
    ngOnInit() {
        this.amountPerCurr = this.paymentService.calculateLocalAndUsd();
    }
}
CurrencySelectComponent.ɵfac = function CurrencySelectComponent_Factory(t) { return new (t || CurrencySelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_payment_service__WEBPACK_IMPORTED_MODULE_1__["PaymentService"])); };
CurrencySelectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CurrencySelectComponent, selectors: [["app-currency-select"]], outputs: { currencySelected: "currencySelected" }, decls: 11, vars: 2, consts: [[1, "title-currency"], [1, "excenge-rates"], ["cols", "1", "rowHeight", "40px"], ["mat-stroked-button", "", "color", "primary", 1, "custom-button", 3, "click"]], template: function CurrencySelectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "What currency you want to pay?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-grid-list", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-grid-tile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CurrencySelectComponent_Template_button_click_6_listener() { return ctx.pickCurrency("local"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-grid-tile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CurrencySelectComponent_Template_button_click_9_listener() { return ctx.pickCurrency("USD"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("EUR: ", ctx.amountPerCurr.EUR, " EUR ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("USD: ", ctx.amountPerCurr.USD, " EUR ");
    } }, directives: [_angular_material_grid_list__WEBPACK_IMPORTED_MODULE_2__["MatGridList"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_2__["MatGridTile"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"]], styles: [".buttons[_ngcontent-%COMP%] {\n  padding: 25px;\n  display: flex;\n  flex-direction: column;\n}\n\n.custom-button[_ngcontent-%COMP%] {\n  width: 222px !important;\n  min-width: unset !important;\n}\n\n.mat-button.mat-primary[_ngcontent-%COMP%], .mat-icon-button.mat-primary[_ngcontent-%COMP%], .mat-stroked-button.mat-primary[_ngcontent-%COMP%] {\n  color: #0D93F8 !important;\n}\n\n.excenge-rates[_ngcontent-%COMP%] {\n  padding-top: 22px;\n}\n\n.title-currency[_ngcontent-%COMP%] {\n  padding-top: 13px;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjdXJyZW5jeS1zZWxlY3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx1QkFBQTtFQUNBLDJCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSx5QkFBQTtBQUVGOztBQUVBO0VBQ0UsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7QUFDRiIsImZpbGUiOiJjdXJyZW5jeS1zZWxlY3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnV0dG9ucyB7XHJcbiAgcGFkZGluZzogMjVweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5jdXN0b20tYnV0dG9uIHtcclxuICB3aWR0aDogMjIycHghaW1wb3J0YW50O1xyXG4gIG1pbi13aWR0aDogdW5zZXQhaW1wb3J0YW50O1xyXG59XHJcbi5tYXQtYnV0dG9uLm1hdC1wcmltYXJ5LCAubWF0LWljb24tYnV0dG9uLm1hdC1wcmltYXJ5LCAubWF0LXN0cm9rZWQtYnV0dG9uLm1hdC1wcmltYXJ5IHtcclxuICBjb2xvcjogIzBEOTNGOCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5cclxuLmV4Y2VuZ2UtcmF0ZXMge1xyXG4gIHBhZGRpbmctdG9wOiAyMnB4O1xyXG59XHJcblxyXG4udGl0bGUtY3VycmVuY3kge1xyXG4gIHBhZGRpbmctdG9wOiAxM3B4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "Zs0b":
/*!******************************************************!*\
  !*** ./apps/app-cross/src/app/app-routing.module.ts ***!
  \******************************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _components_container_container_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/container/container.component */ "iGlx");
/* harmony import */ var _components_calllback_callback_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/calllback/callback.component */ "wvW7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");





const routes = [
    { path: 'bill', component: _components_container_container_component__WEBPACK_IMPORTED_MODULE_1__["ContainerComponent"] },
    { path: 'callback', component: _components_calllback_callback_component__WEBPACK_IMPORTED_MODULE_2__["CallbackComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "iGlx":
/*!****************************************************************************!*\
  !*** ./apps/app-cross/src/app/components/container/container.component.ts ***!
  \****************************************************************************/
/*! exports provided: ContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContainerComponent", function() { return ContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _payment_payment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../payment/payment.component */ "8O69");



function ContainerComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "By paying directly from your bank account we guaranty the best foreign exchange rates. Just few questions to find the best rate.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "app-payment", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("isConsent", function ContainerComponent_div_4_Template_app_payment_isConsent_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.setConsentView(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class ContainerComponent {
    constructor() {
        this.isConsent = false;
        this.title = 'BB Bistro Rapid Pay';
    }
    setConsentView() {
        this.isConsent = true;
    }
}
ContainerComponent.ɵfac = function ContainerComponent_Factory(t) { return new (t || ContainerComponent)(); };
ContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContainerComponent, selectors: [["app-container"]], decls: 5, vars: 2, consts: [[1, "flex"], ["alt", "Nx logo", "width", "75", "src", "https://nx.dev/assets/images/nx-logo-white.svg"], [4, "ngIf"], [1, "main-text"], [1, "flex", "github-star-container"], [3, "isConsent"]], template: function ContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ContainerComponent_div_4_Template, 5, 0, "div", 2);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.title, "!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isConsent);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _payment_payment_component__WEBPACK_IMPORTED_MODULE_2__["PaymentComponent"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n  font-family: sans-serif;\n  min-width: 300px;\n  max-width: 600px;\n  margin: 5px auto;\n}\n.main-text[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 15px;\n  padding: 27px;\n  font-weight: bold;\n  line-height: 32px;\n}\n.gutter-left[_ngcontent-%COMP%] {\n  margin-left: 9px;\n}\n.col-span-2[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.flex[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\nheader[_ngcontent-%COMP%] {\n  background-color: #0D93F8;\n  color: white;\n  padding: 5px;\n  border-radius: 3px;\n}\nmain[_ngcontent-%COMP%] {\n  padding: 0 36px;\n}\np[_ngcontent-%COMP%] {\n  text-align: center;\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-left: 18px;\n  font-size: 24px;\n}\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 20px;\n  margin: 40px 0 10px 0;\n}\nh3[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.resources[_ngcontent-%COMP%] {\n  text-align: center;\n  list-style: none;\n  padding: 0;\n  display: grid;\n  grid-gap: 9px;\n  grid-template-columns: 1fr 1fr;\n}\n.resource[_ngcontent-%COMP%] {\n  color: #0094ba;\n  height: 36px;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-radius: 4px;\n  padding: 3px 9px;\n  text-decoration: none;\n}\n.resource[_ngcontent-%COMP%]:hover {\n  background-color: rgba(68, 138, 255, 0.04);\n}\npre[_ngcontent-%COMP%] {\n  padding: 9px;\n  border-radius: 4px;\n  background-color: black;\n  color: #eee;\n}\ndetails[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  color: #333;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  padding: 3px 9px;\n  margin-bottom: 9px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n  height: 36px;\n  line-height: 36px;\n}\n.github-star-container[_ngcontent-%COMP%] {\n  line-height: 20px;\n}\n.github-star-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-decoration: none;\n  color: #333;\n}\n.github-star-badge[_ngcontent-%COMP%] {\n  color: #24292e;\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  padding: 3px 10px;\n  border: 1px solid rgba(27, 31, 35, 0.2);\n  border-radius: 3px;\n  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n  margin-left: 4px;\n  font-weight: 600;\n}\n.github-star-badge[_ngcontent-%COMP%]:hover {\n  background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);\n  border-color: rgba(27, 31, 35, 0.35);\n  background-position: -0.5em;\n}\n.github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  height: 16px;\n  width: 16px;\n  margin-right: 4px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjb250YWluZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBQUE7QUFHQTtFQUNFLGNBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQUNGO0FBR0E7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQUFGO0FBR0E7RUFDRSxnQkFBQTtBQUFGO0FBR0E7RUFDRSxtQkFBQTtBQUFGO0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUFGO0FBR0E7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFBRjtBQUdBO0VBQ0UsZUFBQTtBQUFGO0FBR0E7RUFDRSxrQkFBQTtBQUFGO0FBR0E7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQUFGO0FBR0E7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxxQkFBQTtBQUFGO0FBR0E7RUFDRSxrQkFBQTtBQUFGO0FBR0E7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7QUFBRjtBQUdBO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSxrQ0FBQTtFQUNBLHFDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBQUY7QUFHQTtFQUNFLDBDQUFBO0FBQUY7QUFHQTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtBQUFGO0FBR0E7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxrQ0FBQTtFQUNBLHFDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUFGO0FBR0E7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUFGO0FBR0E7RUFDRSxpQkFBQTtBQUFGO0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7QUFBRjtBQUdBO0VBQ0UsY0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHVDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnRUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFBRjtBQUdBO0VBQ0UsZ0VBQUE7RUFDQSxvQ0FBQTtFQUNBLDJCQUFBO0FBQUY7QUFFQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUFDRiIsImZpbGUiOiJjb250YWluZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBSZW1vdmUgdGVtcGxhdGUgY29kZSBiZWxvd1xyXG4gKi9cclxuOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xyXG4gIG1pbi13aWR0aDogMzAwcHg7XHJcbiAgbWF4LXdpZHRoOiA2MDBweDtcclxuICBtYXJnaW46IDVweCBhdXRvO1xyXG59XHJcblxyXG5cclxuLm1haW4tdGV4dCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBwYWRkaW5nOiAyN3B4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xyXG59XHJcblxyXG4uZ3V0dGVyLWxlZnQge1xyXG4gIG1hcmdpbi1sZWZ0OiA5cHg7XHJcbn1cclxuXHJcbi5jb2wtc3Bhbi0yIHtcclxuICBncmlkLWNvbHVtbjogc3BhbiAyO1xyXG59XHJcblxyXG4uZmxleCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG5oZWFkZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwRDkzRjg7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbn1cclxuXHJcbm1haW4ge1xyXG4gIHBhZGRpbmc6IDAgMzZweDtcclxufVxyXG5cclxucCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5oMSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi1sZWZ0OiAxOHB4O1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxufVxyXG5cclxuaDIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgbWFyZ2luOiA0MHB4IDAgMTBweCAwO1xyXG59XHJcblxyXG5oMyB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ucmVzb3VyY2VzIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC1nYXA6IDlweDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbn1cclxuXHJcbi5yZXNvdXJjZSB7XHJcbiAgY29sb3I6ICMwMDk0YmE7XHJcbiAgaGVpZ2h0OiAzNnB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEyKTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgcGFkZGluZzogM3B4IDlweDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuXHJcbi5yZXNvdXJjZTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2OCwgMTM4LCAyNTUsIDAuMDQpO1xyXG59XHJcblxyXG5wcmUge1xyXG4gIHBhZGRpbmc6IDlweDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgY29sb3I6ICNlZWU7XHJcbn1cclxuXHJcbmRldGFpbHMge1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBjb2xvcjogIzMzMztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMik7XHJcbiAgcGFkZGluZzogM3B4IDlweDtcclxuICBtYXJnaW4tYm90dG9tOiA5cHg7XHJcbn1cclxuXHJcbnN1bW1hcnkge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGhlaWdodDogMzZweDtcclxuICBsaW5lLWhlaWdodDogMzZweDtcclxufVxyXG5cclxuLmdpdGh1Yi1zdGFyLWNvbnRhaW5lciB7XHJcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbn1cclxuXHJcbi5naXRodWItc3Rhci1jb250YWluZXIgYSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBjb2xvcjogIzMzMztcclxufVxyXG5cclxuLmdpdGh1Yi1zdGFyLWJhZGdlIHtcclxuICBjb2xvcjogIzI0MjkyZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDNweCAxMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjcsIDMxLCAzNSwgMC4yKTtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KC0xODBkZWcsICNmYWZiZmMsICNlZmYzZjYgOTAlKTtcclxuICBtYXJnaW4tbGVmdDogNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5naXRodWItc3Rhci1iYWRnZTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KC0xODBkZWcsICNmMGYzZjYsICNlNmViZjEgOTAlKTtcclxuICBib3JkZXItY29sb3I6IHJnYmEoMjcsIDMxLCAzNSwgMC4zNSk7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTAuNWVtO1xyXG59XHJcbi5naXRodWItc3Rhci1iYWRnZSAubWF0ZXJpYWwtaWNvbnMge1xyXG4gIGhlaWdodDogMTZweDtcclxuICB3aWR0aDogMTZweDtcclxuICBtYXJnaW4tcmlnaHQ6IDRweDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "msk9":
/*!**************************************************************************************!*\
  !*** ./apps/app-cross/src/app/components/country-select/country-select.component.ts ***!
  \**************************************************************************************/
/*! exports provided: CountrySelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountrySelectComponent", function() { return CountrySelectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_payment_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/payment.service */ "1RMo");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "Q2Ze");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ "ZTz/");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ "UhP/");









function CountrySelectComponent_mat_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const country_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", country_r2.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", country_r2.viewValue, " ");
} }
function CountrySelectComponent_mat_form_field_8_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const bank_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", bank_r4.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", bank_r4.viewValue, " ");
} }
function CountrySelectComponent_mat_form_field_8_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Bank name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-select", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CountrySelectComponent_mat_form_field_8_Template_mat_select_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.selectedValue = $event; })("selectionChange", function CountrySelectComponent_mat_form_field_8_Template_mat_select_selectionChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.selectedBankChange($event.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CountrySelectComponent_mat_form_field_8_mat_option_4_Template, 2, 2, "mat-option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r1.selectedValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.banks);
} }
class CountrySelectComponent {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.isSelectBank = false;
        this.bankSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.countries = [
            { value: 'France', viewValue: 'France', currency: 'ERU' },
            { value: 'Moldova', viewValue: 'Moldova', currency: 'ERU' },
            { value: 'Israel', viewValue: 'Israel', currency: 'ERU' }
        ];
        this.banks = [
            { value: 'AGRIFRPP', viewValue: 'Fake Bank', currency: 'ERU' }
        ];
    }
    selectedCountryChange(value) {
        this.paymentService.setProperty('country', value);
        this.isSelectBank = true;
        // this.paymentService.getCorrespondent();
    }
    selectedBankChange(value) {
        this.paymentService.setBank(value);
        this.bankSelected.emit(true);
    }
}
CountrySelectComponent.ɵfac = function CountrySelectComponent_Factory(t) { return new (t || CountrySelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_payment_service__WEBPACK_IMPORTED_MODULE_1__["PaymentService"])); };
CountrySelectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CountrySelectComponent, selectors: [["app-country-select"]], outputs: { bankSelected: "bankSelected" }, decls: 9, vars: 3, consts: [[1, "title"], ["action", "", 1, "country-selections"], ["name", "food", 3, "ngModel", "ngModelChange", "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "value"]], template: function CountrySelectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Where are you from?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Country");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CountrySelectComponent_Template_mat_select_ngModelChange_6_listener($event) { return ctx.selectedValue = $event; })("selectionChange", function CountrySelectComponent_Template_mat_select_selectionChange_6_listener($event) { return ctx.selectedCountryChange($event.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, CountrySelectComponent_mat_option_7_Template, 2, 2, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, CountrySelectComponent_mat_form_field_8_Template, 5, 2, "mat-form-field", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.selectedValue);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.countries);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isSelectBank);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_4__["MatSelect"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_core__WEBPACK_IMPORTED_MODULE_6__["MatOption"]], styles: [".country-selections[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding-top: 30px;\n}\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: bold;\n  font-size: 28px;\n  padding-top: 27px;\n}\n\nmat-form-field[_ngcontent-%COMP%] {\n  width: 317px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjb3VudHJ5LXNlbGVjdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx1QkFBQTtBQUNGIiwiZmlsZSI6ImNvdW50cnktc2VsZWN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvdW50cnktc2VsZWN0aW9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHBhZGRpbmctdG9wOiAzMHB4O1xyXG59XHJcblxyXG4udGl0bGUge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBmb250LXNpemU6IDI4cHg7XHJcbiAgcGFkZGluZy10b3A6IDI3cHg7XHJcbn1cclxuXHJcbm1hdC1mb3JtLWZpZWxkIHtcclxuICB3aWR0aDogMzE3cHggIWltcG9ydGFudDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "o7l7":
/*!**********************************************!*\
  !*** ./apps/app-cross/src/app/app.module.ts ***!
  \**********************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "APzi");
/* harmony import */ var _components_payment_payment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/payment/payment.component */ "8O69");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "omvX");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "PDjf");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "Dxy4");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ "ZTz/");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-routing.module */ "Zs0b");
/* harmony import */ var _components_container_container_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/container/container.component */ "iGlx");
/* harmony import */ var _components_country_select_country_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/country-select/country-select.component */ "msk9");
/* harmony import */ var _components_courency_select_currency_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/courency-select/currency-select.component */ "XRE9");
/* harmony import */ var _components_consent_consent_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/consent/consent.component */ "HAPT");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/grid-list */ "40+f");
/* harmony import */ var _components_calllback_callback_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/calllback/callback.component */ "wvW7");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ "8Y7J");

















class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_13__["MatGridListModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"], _components_payment_payment_component__WEBPACK_IMPORTED_MODULE_2__["PaymentComponent"], _components_container_container_component__WEBPACK_IMPORTED_MODULE_9__["ContainerComponent"], _components_country_select_country_select_component__WEBPACK_IMPORTED_MODULE_10__["CountrySelectComponent"],
        _components_courency_select_currency_select_component__WEBPACK_IMPORTED_MODULE_11__["CurrencySelectComponent"],
        _components_consent_consent_component__WEBPACK_IMPORTED_MODULE_12__["ConsentComponent"],
        _components_calllback_callback_component__WEBPACK_IMPORTED_MODULE_14__["CallbackComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_13__["MatGridListModule"]] }); })();


/***/ }),

/***/ "wvW7":
/*!***************************************************************************!*\
  !*** ./apps/app-cross/src/app/components/calllback/callback.component.ts ***!
  \***************************************************************************/
/*! exports provided: CallbackComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CallbackComponent", function() { return CallbackComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");




function CallbackComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class CallbackComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
        this.isSuccess = false;
        this.title = 'BB Bistro Rapid Pay';
    }
    ngOnInit() {
        this.activatedroute.queryParams.subscribe((data) => {
            this.responseFromServer = data;
            if (data.status === '1') {
                this.isSuccess = true;
                this.message = 'Thank you, your order have been successfully paid.';
            }
            if (data.status === '0') {
                this.message = 'Please scan again QR code.';
            }
            console.log(data);
        });
    }
}
CallbackComponent.ɵfac = function CallbackComponent_Factory(t) { return new (t || CallbackComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["ActivatedRoute"])); };
CallbackComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CallbackComponent, selectors: [["app-callback"]], decls: 8, vars: 3, consts: [[1, "flex"], ["alt", "Nx logo", "width", "75", "src", "https://nx.dev/assets/images/nx-logo-white.svg"], [1, "container"], ["class", "position-succsess", 4, "ngIf"], [1, "main-text"], [1, "position-succsess"], [1, "success-checkmark"], [1, "check-icon"], [1, "icon-line", "line-tip"], [1, "icon-line", "line-long"], [1, "icon-circle"], [1, "icon-fix"]], template: function CallbackComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, CallbackComponent_div_5_Template, 7, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.title, "!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isSuccess);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.message, " ");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: [".flex[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nheader[_ngcontent-%COMP%] {\n  background-color: #0D93F8;\n  color: white;\n  padding: 5px;\n  border-radius: 3px;\n}\n\n.success-checkmark[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 115px;\n  margin: 0 auto;\n}\n\n.success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  position: relative;\n  border-radius: 50%;\n  box-sizing: content-box;\n  border: 4px solid #0D93F8;\n}\n\n.success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%]::before {\n  top: 3px;\n  left: -2px;\n  width: 30px;\n  transform-origin: 100% 50%;\n  border-radius: 100px 0 0 100px;\n}\n\n.success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%]::after {\n  top: 0;\n  left: 30px;\n  width: 60px;\n  transform-origin: 0 50%;\n  border-radius: 0 100px 100px 0;\n  animation: rotate-circle 4.25s ease-in;\n}\n\n.success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%]::before, .success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%]::after {\n  content: \"\";\n  height: 100px;\n  position: absolute;\n  background: #FFFFFF;\n  transform: rotate(-45deg);\n}\n\n.success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%]   .icon-line[_ngcontent-%COMP%] {\n  height: 5px;\n  background-color: #0D93F8;\n  display: block;\n  border-radius: 2px;\n  position: absolute;\n  z-index: 10;\n}\n\n.success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%]   .icon-line.line-tip[_ngcontent-%COMP%] {\n  top: 46px;\n  left: 14px;\n  width: 25px;\n  transform: rotate(45deg);\n  animation: icon-line-tip 0.75s;\n}\n\n.success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%]   .icon-line.line-long[_ngcontent-%COMP%] {\n  top: 38px;\n  right: 8px;\n  width: 47px;\n  transform: rotate(-45deg);\n  animation: icon-line-long 0.75s;\n}\n\n.success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%] {\n  top: -4px;\n  left: -4px;\n  z-index: 10;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  position: absolute;\n  box-sizing: content-box;\n  border: 4px solid #0D93F8;\n}\n\n.success-checkmark[_ngcontent-%COMP%]   .check-icon[_ngcontent-%COMP%]   .icon-fix[_ngcontent-%COMP%] {\n  top: 8px;\n  width: 5px;\n  left: 26px;\n  z-index: 1;\n  height: 85px;\n  position: absolute;\n  transform: rotate(-45deg);\n  background-color: #FFFFFF;\n}\n\n@keyframes rotate-circle {\n  0% {\n    transform: rotate(-45deg);\n  }\n  5% {\n    transform: rotate(-45deg);\n  }\n  12% {\n    transform: rotate(-405deg);\n  }\n  100% {\n    transform: rotate(-405deg);\n  }\n}\n\n@keyframes icon-line-tip {\n  0% {\n    width: 0;\n    left: 1px;\n    top: 19px;\n  }\n  54% {\n    width: 0;\n    left: 1px;\n    top: 19px;\n  }\n  70% {\n    width: 50px;\n    left: -8px;\n    top: 37px;\n  }\n  84% {\n    width: 17px;\n    left: 21px;\n    top: 48px;\n  }\n  100% {\n    width: 25px;\n    left: 14px;\n    top: 45px;\n  }\n}\n\n@keyframes icon-line-long {\n  0% {\n    width: 0;\n    right: 46px;\n    top: 54px;\n  }\n  65% {\n    width: 0;\n    right: 46px;\n    top: 54px;\n  }\n  84% {\n    width: 55px;\n    right: 0px;\n    top: 35px;\n  }\n  100% {\n    width: 47px;\n    right: 8px;\n    top: 38px;\n  }\n}\n\n.position-succsess[_ngcontent-%COMP%] {\n  padding-top: 34%;\n}\n\n.main-text[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 36px;\n  line-height: 47px;\n  padding-top: 24%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjYWxsYmFjay5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFDQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtBQUVGOztBQUFFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtBQUVKOztBQUFJO0VBQ0UsUUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsMEJBQUE7RUFDQSw4QkFBQTtBQUVOOztBQUNJO0VBQ0UsTUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSw4QkFBQTtFQUNBLHNDQUFBO0FBQ047O0FBRUk7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtBQUFOOztBQUdJO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBRE47O0FBR007RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSx3QkFBQTtFQUNBLDhCQUFBO0FBRFI7O0FBSU07RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLCtCQUFBO0FBRlI7O0FBTUk7RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0FBSk47O0FBT0k7RUFDRSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtBQUxOOztBQVVBO0VBQ0U7SUFDRSx5QkFBQTtFQVBGO0VBU0E7SUFDRSx5QkFBQTtFQVBGO0VBU0E7SUFDRSwwQkFBQTtFQVBGO0VBU0E7SUFDRSwwQkFBQTtFQVBGO0FBQ0Y7O0FBVUE7RUFDRTtJQUNFLFFBQUE7SUFDQSxTQUFBO0lBQ0EsU0FBQTtFQVJGO0VBVUE7SUFDRSxRQUFBO0lBQ0EsU0FBQTtJQUNBLFNBQUE7RUFSRjtFQVVBO0lBQ0UsV0FBQTtJQUNBLFVBQUE7SUFDQSxTQUFBO0VBUkY7RUFVQTtJQUNFLFdBQUE7SUFDQSxVQUFBO0lBQ0EsU0FBQTtFQVJGO0VBVUE7SUFDRSxXQUFBO0lBQ0EsVUFBQTtJQUNBLFNBQUE7RUFSRjtBQUNGOztBQVdBO0VBQ0U7SUFDRSxRQUFBO0lBQ0EsV0FBQTtJQUNBLFNBQUE7RUFURjtFQVdBO0lBQ0UsUUFBQTtJQUNBLFdBQUE7SUFDQSxTQUFBO0VBVEY7RUFXQTtJQUNFLFdBQUE7SUFDQSxVQUFBO0lBQ0EsU0FBQTtFQVRGO0VBV0E7SUFDRSxXQUFBO0lBQ0EsVUFBQTtJQUNBLFNBQUE7RUFURjtBQUNGOztBQVlBO0VBQ0UsZ0JBQUE7QUFWRjs7QUFhQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFWRiIsImZpbGUiOiJjYWxsYmFjay5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mbGV4IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbmhlYWRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBEOTNGODtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcclxufVxyXG4uc3VjY2Vzcy1jaGVja21hcmsge1xyXG4gIHdpZHRoOiA4MHB4O1xyXG4gIGhlaWdodDogMTE1cHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcblxyXG4gIC5jaGVjay1pY29uIHtcclxuICAgIHdpZHRoOiA4MHB4O1xyXG4gICAgaGVpZ2h0OiA4MHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgICBib3JkZXI6IDRweCBzb2xpZCAjMEQ5M0Y4O1xyXG5cclxuICAgICY6OmJlZm9yZSB7XHJcbiAgICAgIHRvcDogM3B4O1xyXG4gICAgICBsZWZ0OiAtMnB4O1xyXG4gICAgICB3aWR0aDogMzBweDtcclxuICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMTAwJSA1MCU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4IDAgMCAxMDBweDtcclxuICAgIH1cclxuXHJcbiAgICAmOjphZnRlciB7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgbGVmdDogMzBweDtcclxuICAgICAgd2lkdGg6IDYwcHg7XHJcbiAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgNTAlO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwIDEwMHB4IDEwMHB4IDA7XHJcbiAgICAgIGFuaW1hdGlvbjogcm90YXRlLWNpcmNsZSA0LjI1cyBlYXNlLWluO1xyXG4gICAgfVxyXG5cclxuICAgICY6OmJlZm9yZSwgJjo6YWZ0ZXIge1xyXG4gICAgICBjb250ZW50OiAnJztcclxuICAgICAgaGVpZ2h0OiAxMDBweDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xyXG4gICAgfVxyXG5cclxuICAgIC5pY29uLWxpbmUge1xyXG4gICAgICBoZWlnaHQ6IDVweDtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzBEOTNGODtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB6LWluZGV4OiAxMDtcclxuXHJcbiAgICAgICYubGluZS10aXAge1xyXG4gICAgICAgIHRvcDogNDZweDtcclxuICAgICAgICBsZWZ0OiAxNHB4O1xyXG4gICAgICAgIHdpZHRoOiAyNXB4O1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcclxuICAgICAgICBhbmltYXRpb246IGljb24tbGluZS10aXAgMC43NXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICYubGluZS1sb25nIHtcclxuICAgICAgICB0b3A6IDM4cHg7XHJcbiAgICAgICAgcmlnaHQ6IDhweDtcclxuICAgICAgICB3aWR0aDogNDdweDtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xyXG4gICAgICAgIGFuaW1hdGlvbjogaWNvbi1saW5lLWxvbmcgMC43NXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuaWNvbi1jaXJjbGUge1xyXG4gICAgICB0b3A6IC00cHg7XHJcbiAgICAgIGxlZnQ6IC00cHg7XHJcbiAgICAgIHotaW5kZXg6IDEwO1xyXG4gICAgICB3aWR0aDogODBweDtcclxuICAgICAgaGVpZ2h0OiA4MHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgICAgIGJvcmRlcjogNHB4IHNvbGlkICMwRDkzRjg7XHJcbiAgICB9XHJcblxyXG4gICAgLmljb24tZml4IHtcclxuICAgICAgdG9wOiA4cHg7XHJcbiAgICAgIHdpZHRoOiA1cHg7XHJcbiAgICAgIGxlZnQ6IDI2cHg7XHJcbiAgICAgIHotaW5kZXg6IDE7XHJcbiAgICAgIGhlaWdodDogODVweDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyByb3RhdGUtY2lyY2xlIHtcclxuICAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xyXG4gIH1cclxuICA1JSB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xyXG4gIH1cclxuICAxMiUge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQwNWRlZyk7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQwNWRlZyk7XHJcbiAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGljb24tbGluZS10aXAge1xyXG4gIDAlIHtcclxuICAgIHdpZHRoOiAwO1xyXG4gICAgbGVmdDogMXB4O1xyXG4gICAgdG9wOiAxOXB4O1xyXG4gIH1cclxuICA1NCUge1xyXG4gICAgd2lkdGg6IDA7XHJcbiAgICBsZWZ0OiAxcHg7XHJcbiAgICB0b3A6IDE5cHg7XHJcbiAgfVxyXG4gIDcwJSB7XHJcbiAgICB3aWR0aDogNTBweDtcclxuICAgIGxlZnQ6IC04cHg7XHJcbiAgICB0b3A6IDM3cHg7XHJcbiAgfVxyXG4gIDg0JSB7XHJcbiAgICB3aWR0aDogMTdweDtcclxuICAgIGxlZnQ6IDIxcHg7XHJcbiAgICB0b3A6IDQ4cHg7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgd2lkdGg6IDI1cHg7XHJcbiAgICBsZWZ0OiAxNHB4O1xyXG4gICAgdG9wOiA0NXB4O1xyXG4gIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBpY29uLWxpbmUtbG9uZyB7XHJcbiAgMCUge1xyXG4gICAgd2lkdGg6IDA7XHJcbiAgICByaWdodDogNDZweDtcclxuICAgIHRvcDogNTRweDtcclxuICB9XHJcbiAgNjUlIHtcclxuICAgIHdpZHRoOiAwO1xyXG4gICAgcmlnaHQ6IDQ2cHg7XHJcbiAgICB0b3A6IDU0cHg7XHJcbiAgfVxyXG4gIDg0JSB7XHJcbiAgICB3aWR0aDogNTVweDtcclxuICAgIHJpZ2h0OiAwcHg7XHJcbiAgICB0b3A6IDM1cHg7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgd2lkdGg6IDQ3cHg7XHJcbiAgICByaWdodDogOHB4O1xyXG4gICAgdG9wOiAzOHB4O1xyXG4gIH1cclxufVxyXG5cclxuLnBvc2l0aW9uLXN1Y2NzZXNzIHtcclxuICBwYWRkaW5nLXRvcDogMzQlO1xyXG59XHJcblxyXG4ubWFpbi10ZXh0IHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAzNnB4O1xyXG4gIGxpbmUtaGVpZ2h0OiA0N3B4O1xyXG4gIHBhZGRpbmctdG9wOiAyNCU7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map