System.register(["../helpers/injectDom", "../models/index", "../views/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var injectDom_1, index_1, index_2, NegociacaoController, diaDaSemana;
    return {
        setters: [
            function (injectDom_1_1) {
                injectDom_1 = injectDom_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this.negociacoes = new index_1.Negociacoes();
                    this.negociacoesView = new index_2.NegociacoesView('.negociacoes-view');
                    this.mensagemView = new index_2.MensagemView('#mensagemView');
                    this.negociacoesView.update(this.negociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this.inputData.val().replace(/-/g, ','));
                    if (!this._ehDiaUtil(data)) {
                        this.mensagemView.update('Só é permitido adicionar negociações com dias úteis!');
                        let msg = $('.alert-success');
                        msg.addClass('alert-warning');
                        return;
                    }
                    const negociacao = new index_1.Negociacao(data, parseInt(this.inputQuantidade.val()), parseFloat(this.inputValor.val()));
                    this.negociacoes.adiciona(negociacao);
                    this.mensagemView.update('Negociação adicionada com sucesso!');
                    this.negociacoesView.update(this.negociacoes);
                }
                _ehDiaUtil(data) {
                    return data.getDay() != diaDaSemana.Domingo && data.getDay() != diaDaSemana.Sabado;
                }
            };
            __decorate([
                injectDom_1.injectDom('#data')
            ], NegociacaoController.prototype, "inputData", void 0);
            __decorate([
                injectDom_1.injectDom('#quantidade')
            ], NegociacaoController.prototype, "inputQuantidade", void 0);
            __decorate([
                injectDom_1.injectDom('#valor')
            ], NegociacaoController.prototype, "inputValor", void 0);
            exports_1("NegociacaoController", NegociacaoController);
            (function (diaDaSemana) {
                diaDaSemana[diaDaSemana["Domingo"] = 0] = "Domingo";
                diaDaSemana[diaDaSemana["Segunda"] = 1] = "Segunda";
                diaDaSemana[diaDaSemana["Terca"] = 2] = "Terca";
                diaDaSemana[diaDaSemana["Quarta"] = 3] = "Quarta";
                diaDaSemana[diaDaSemana["Quinta"] = 4] = "Quinta";
                diaDaSemana[diaDaSemana["Sexta"] = 5] = "Sexta";
                diaDaSemana[diaDaSemana["Sabado"] = 6] = "Sabado";
            })(diaDaSemana || (diaDaSemana = {}));
        }
    };
});
