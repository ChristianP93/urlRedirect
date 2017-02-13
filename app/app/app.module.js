"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var createAccount_component_1 = require("./createAccount/createAccount.component");
var reportLink_component_1 = require("./report/reportLink/reportLink.component");
var reportLinkUser_component_1 = require("./report/reportLinkUser/reportLinkUser.component");
var login_service_1 = require("./login/login.service");
var report_service_1 = require("./report/report.service");
var app_routing_module_1 = require("./app.routing.module");
var ngInit_directive_1 = require("./directive/ngInit/ngInit.directive");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var noRepeat_pipe_1 = require("./filterPipe/noRepeat.pipe");
var AppModule = (function () {
    function AppModule(location) {
        this.location = location;
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_module_1.routing, forms_1.FormsModule, http_1.HttpModule, http_1.JsonpModule, ng2_bs3_modal_1.Ng2Bs3ModalModule],
        declarations: [app_component_1.AppComponent, home_component_1.NgHomeComponent, login_component_1.NgLoginComponent, createAccount_component_1.NgCreateAccountComponent, ngInit_directive_1.NgInit, reportLink_component_1.NgReportLinkComponent,
            reportLinkUser_component_1.NgReportLinkUserComponent, noRepeat_pipe_1.NoRepeatPipe],
        providers: [common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, login_service_1.LoginService, report_service_1.ReportService],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [common_1.Location])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map