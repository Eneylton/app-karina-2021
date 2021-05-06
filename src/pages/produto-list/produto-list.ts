import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-produto-list',
  templateUrl: 'produto-list.html',
})

export class ProdutoListPage {

  limit: number = 2500;
  start: number = 0;
  url: string;
  

  produtos: any = [];

  todos: Array<{id:any, nome: string, categoria:string, codigo:string, barra:string, aplicacao:string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

      this.url = serve.serve;
}

ionViewDidLoad() {
  this.produtos = [];
  this.start = 0;
  this.listarProdutos();
}

doRefresh(event) {

  setTimeout(() => {

    this.ionViewDidLoad();
    event.complete();

  }, 1000);
}

loadData(event: any) {
  this.start += this.limit;

  setTimeout(() => {
    this.listarProdutos().then(() => {
      event.complete();
    })
  }, 1000);
}

listarProdutos() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-produtos'
    }


    this.serve.postData(body, 'aplicativo/produto.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.produtos.push({
 
              id:                       data.result[i]["id"],
              nome:                     data.result[i]["nome"],
              codigo:                   data.result[i]["codigo"],
              barra:                    data.result[i]["barra"],
              estoque:                  data.result[i]["estoque"],
              valor_venda:              data.result[i]["valor_venda"],
              categoria:                data.result[i]["categoria"],
              capa:                     data.result[i]["capa"],
              aplicacao:                data.result[i]["aplicacao"],
              valor_compra:             data.result[i]["valor_compra"],
              categorias_id:            data.result[i]["categorias_id"],
              foto:                     data.result[i]["foto"]

        });

     

      }

      })

      this.todos = this.produtos;

      resolve(true);

    });

}

getProdutos(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.produtos = this.todos.filter((prod) => {
      return (prod.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
          || (prod.codigo.toLowerCase().indexOf(val.toLowerCase()) > -1)
          || (prod.barra.toLowerCase().indexOf(val.toLowerCase()) > -1)
          || (prod.aplicacao.toLowerCase().indexOf(val.toLowerCase()) > -1)
          || (prod.categoria.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })

  }else{
    this.produtos = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('ProdutoInsertPage');
}

editar( id,
        nome,
        barra,
        codigo,
        qtd,
        valor_compra,
        valor_venda,
        estoque,
        foto,
        aplicacao,
        categorias_id
        
        ){

this.navCtrl.push('ProdutoEditPage', {

  id:                   id,
  nome:                 nome,
  barra:                barra,
  codigo:               codigo,
  qtd:                  qtd,
  valor_compra:         valor_compra,
  valor_venda:          valor_venda,
  estoque:              estoque,
  foto:                 foto,
  aplicacao:            aplicacao,
  categorias_id:        categorias_id 


})

}


detalhe( 
  id,
  nome,
  barra,
  codigo,
  qtd,
  valor_compra,
  valor_venda,
  estoque,
  foto,
  aplicacao,
  categorias_id

  ){

this.navCtrl.push('ProdutoDetalhePage', {
  
  id:                   id,
  nome:                 nome,
  barra:                barra,
  codigo:               codigo,
  qtd:                  qtd,
  valor_compra:         valor_compra,
  valor_venda:          valor_venda,
  estoque:              estoque,
  foto:                 foto,
  aplicacao:            aplicacao,
  categorias_id:        categorias_id 
  
})

}

galeria(id){

  this.navCtrl.push('GaleriaPage', {
  
    id: id
  
  })
  
  }

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'aplicativo/produto.php').subscribe(data =>{
  this.showInsertOk();
  });

}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Registro Excluido',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('ProdutoListPage')
        }
      }
    ]
  });
  alert.present();
}

}