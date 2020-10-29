import { Negociacao, Negociacoes } from "../models/index";
import { MensagemView, NegociacoesView } from "../views/index";

export class NegociacaoController {

  private inputData: JQuery;
  private inputQuantidade: JQuery;
  private inputValor: JQuery;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('.negociacoes-view',);
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.inputData = $('#data');
    this.inputQuantidade = $('#quantidade');
    this.inputValor = $('#valor');
    this.negociacoesView.update(this.negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();

    const negociacao = new Negociacao(
      new Date(this.inputData.val().replace(/-/g, ',')),
      parseInt(this.inputQuantidade.val()),
      parseFloat(this.inputValor.val())
    );

    this.negociacoes.adiciona(negociacao);
    this.mensagemView.update('Negociação adicionada com sucesso!');
    this.negociacoesView.update(this.negociacoes);
  }
}