import { injectDom } from "../helpers/injectDom";
import { Negociacao, Negociacoes } from "../models/index";
import { MensagemView, NegociacoesView } from "../views/index";

export class NegociacaoController {

  @injectDom('#data')
  private inputData: JQuery;

  @injectDom('#quantidade')
  private inputQuantidade: JQuery;

  @injectDom('#valor')
  private inputValor: JQuery;

  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('.negociacoes-view');
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();

    let data = new Date(this.inputData.val().replace(/-/g, ','));

    if (!this._ehDiaUtil(data)) {
      this.mensagemView.update('Só é permitido adicionar negociações com dias úteis!');
      let msg = $('.alert-success');
      msg.addClass('alert-warning');
      return
    }

    const negociacao = new Negociacao(
      data,
      parseInt(this.inputQuantidade.val()),
      parseFloat(this.inputValor.val())
    );

    this.negociacoes.adiciona(negociacao);
    this.mensagemView.update('Negociação adicionada com sucesso!');
    this.negociacoesView.update(this.negociacoes);
  }

  private _ehDiaUtil(data: Date) {
    return data.getDay() != diaDaSemana.Domingo && data.getDay() != diaDaSemana.Sabado;
  }
}

enum diaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}