import { Negociacao, NegociacoesImportadas } from "../models/index";

export class NegociacaoService {

  async obterNegociacoes(handler: Function): Promise<Negociacao[]> {

    try {
      return await fetch('http://localhost:8080/dados')
        .then(res => handler(res))
        .then(res => res.json())
        .then((dados: NegociacoesImportadas[]) =>
          dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante)));
    } catch (error) {
      console.log(error)
      throw new Error('Não foi possível importar as negociações!');

    }
  }
}

export interface ResponseHandler {
  (res: Response): Response
}