import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-categoria-detalhe',
  templateUrl: 'categoria-detalhe.html',
})
export class CategoriaDetalhePage {

  id:             number;
  descricao:      string ="";
  foto:           string ="";

  base64Image :   string = "";
  cameraData:     string = "";
  url:            string = "";
  servidor:       any    = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private serve: ServiceProvider) {
 
      this.url = serve.serve;
 
    }

  ionViewDidLoad() {

    this.id         = this.navParams.get('id');
    this.descricao  = this.navParams.get('descricao');
    this.foto       = this.navParams.get('foto');
    this.servidor   = this.serve 
  }

  produtos(){

    this.navCtrl.setRoot('ProdutoListPage');
  }


  conta(){

    this.navCtrl.push('UsuarioDetalhesPage');
  }


}
