abstract class View<T> {

  protected _elemento: JQuery;

  constructor(seletor: string) {
    this._elemento = $(seletor);
  }

  update(modelo: T) {
    this._elemento.html(this.template(modelo));
  }

  abstract template(modelo: T): string
}