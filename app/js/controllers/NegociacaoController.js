System.register(["../helpers/index", "../models/index", "../views/index", "../service/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, index_4, timer, NegociacaoController, diaDaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            }
        ],
        execute: function () {
            timer = 0;
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this.negociacoes = new index_2.Negociacoes();
                    this.negociacoesView = new index_3.NegociacoesView('.negociacoes-view');
                    this.mensagemView = new index_3.MensagemView('#mensagemView');
                    this.service = new index_4.NegociacaoService();
                    this.negociacoesView.update(this.negociacoes);
                }
                adiciona() {
                    let data = new Date(this.inputData.val().replace(/-/g, ','));
                    if (!this._ehDiaUtil(data)) {
                        this.mensagemView.update('Só é permitido adicionar negociações com dias úteis!');
                        let msg = $('.alert-success');
                        msg.addClass('alert-warning');
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this.inputQuantidade.val()), parseFloat(this.inputValor.val()));
                    this.negociacoes.adiciona(negociacao);
                    this.mensagemView.update('Negociação adicionada com sucesso!');
                    this.negociacoesView.update(this.negociacoes);
                }
                _ehDiaUtil(data) {
                    return data.getDay() != diaDaSemana.Domingo && data.getDay() != diaDaSemana.Sabado;
                }
                importaDados() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const isOk = (res) => {
                                if (res.ok) {
                                    return res;
                                }
                                else {
                                    throw new Error(res.statusText);
                                }
                            };
                            const negociacoesParaImportar = yield this.service
                                .obterNegociacoes(isOk);
                            const negociacoesImportadas = this.negociacoes.paraArray();
                            negociacoesParaImportar
                                .filter(negociacao => !negociacoesImportadas.some(importadas => negociacao.ehIgual(importadas)))
                                .forEach(negociacao => this.negociacoes.adiciona(negociacao));
                            this.negociacoesView.update(this.negociacoes);
                        }
                        catch (error) {
                            this.mensagemView.update(error.message);
                            let msg = $('.alert-success');
                            msg.addClass('alert-warning');
                        }
                    });
                }
            };
            __decorate([
                index_1.injectDom('#data')
            ], NegociacaoController.prototype, "inputData", void 0);
            __decorate([
                index_1.injectDom('#quantidade')
            ], NegociacaoController.prototype, "inputQuantidade", void 0);
            __decorate([
                index_1.injectDom('#valor')
            ], NegociacaoController.prototype, "inputValor", void 0);
            __decorate([
                index_1.throttle(500)
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_1.throttle(500)
            ], NegociacaoController.prototype, "importaDados", null);
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
