class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('.negociacoes-view');
        this.mensagemView = new MensagemView('#mensagemView');
        this.inputData = $('#data');
        this.inputQuantidade = $('#quantidade');
        this.inputValor = $('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona(event) {
        event.preventDefault();
        const negociacao = new Negociacao(new Date(this.inputData.val().replace(/-/g, ',')), parseInt(this.inputQuantidade.val()), parseFloat(this.inputValor.val()));
        this.negociacoes.adiciona(negociacao);
        this.mensagemView.update('Negociação adicionada com sucesso!');
        this.negociacoesView.update(this.negociacoes);
    }
}
