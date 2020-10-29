export abstract class View<T> {

  protected _elemento: JQuery;
  private _escapar: boolean;

  constructor(seletor: string, escapar?:boolean) {
    this._elemento = $(seletor);
  }

  update(modelo: T) {
    let template = this.template(modelo);
    if(this._escapar){
      template = template.replace(/<script>[\s\S]*?<\/script>/g, '')
    }
    this._elemento.html(template);
  }

  abstract template(modelo: T): string
}