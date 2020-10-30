import { igual } from "./igual";

export class Negociacao implements igual<Negociacao>{

  constructor(
    readonly data: Date,
    readonly quantidade: number,
    readonly valor: number
  ) { }

  volume() {
    return this.quantidade * this.valor;
  }

  ehIgual(negociacao: Negociacao): boolean {
    return this.data.getDate() == this.data.getDate() &&
      this.data.getMonth() == this.data.getMonth() &&
      this.data.getFullYear() == this.data.getFullYear();
  }
}