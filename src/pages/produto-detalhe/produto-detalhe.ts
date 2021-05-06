import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-produto-detalhe',
  templateUrl: 'produto-detalhe.html',
})
export class ProdutoDetalhePage {

  id:             number;
  codigo:         any    = "";
  barra:          string = "";
  nome:           string = "";
  estoque:        string = "";
  foto:           string = "";
  valor_compra:   string = "";
  valor_venda:    string = "";
  aplicacao:      string = "";
  qtd:            any    = "";
  url:            string = "";
  servidor:       any;


  constructor(public navCtrl: NavController,
  
    public navParams: NavParams,
    private serve: ServiceProvider) {
      
      this.url = serve.serve
    }
    
    ionViewDidLoad() {
    this.id                      = this.navParams.get('id');
    this.estoque                 = this.navParams.get('estoque');       
    this.codigo                  = this.navParams.get('codigo');
    this.barra                   = this.navParams.get('barra');
    this.nome                    = this.navParams.get('nome');
    this.foto                    = this.navParams.get('foto');
    this.valor_compra            = this.navParams.get('valor_compra');
    this.valor_venda             = this.navParams.get('valor_venda');
    this.aplicacao               = this.navParams.get('aplicacao');
    this.qtd                     = this.navParams.get('qtd');


    this.servidor = this.serve;
  }

}
