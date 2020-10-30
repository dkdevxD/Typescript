import { injectDom, throttle } from "../helpers/index";
import { Negociacao, Negociacoes, NegociacoesImportadas } from "../models/index";
import { MensagemView, NegociacoesView } from "../views/index";
import { NegociacaoService, ResponseHandler } from '../service/index';

let timer = 0;

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
  private service = new NegociacaoService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }
  @throttle(500)
  adiciona() {
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

  @throttle(500)
  importaDados() {

    const isOk: ResponseHandler = (res: Response) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText)
      }
    }
    this.service
      .obterNegociacoes(isOk)
      .then(negociacoes => {
        negociacoes.forEach(negociacao =>
          this.negociacoes.adiciona(negociacao));
        this.negociacoesView.update(this.negociacoes);
      })
      .catch(error => {
        this.mensagemView.update('Não foi possível importar as negociações!');
        let msg = $('.alert-success');
        msg.addClass('alert-warning');
      });
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