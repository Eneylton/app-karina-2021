import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-categoria-list',
  templateUrl: 'categoria-list.html',
})

export class CategoriaListPage {

  limit: number = 50;
  start: number = 0;

  categorias: any = [];

  url: string = "";

  todos: Array<{id:any, nome: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

      this.url = serve.serve;
}

ionViewDidLoad() {
  this.categorias = [];
  this.start = 0;
  this.listarCategorias();
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
    this.listarCategorias().then(() => {
      event.complete();
    })
  }, 1000);
}

listarCategorias() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-categorias2'
    };
    this.serve.postData(body, 'aplicativo/categoria.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.categorias.push({
              id:            data.result[i]["id"],
              nome:          data.result[i]["nome"],
              foto:          data.result[i]["foto"]

             
         
        });


      }

      })

      this.todos = this.categorias;

      resolve(true);

    });

}

getCategorias(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.categorias = this.todos.filter((cate) => {
      return (cate.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.categorias = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('CategoriaInsertPage');
}

editar(id, nome,foto){

  this.navCtrl.push('CategoriaEditPage', {
    id:         id,
    nome:       nome,
    foto:       foto

  })

}

detalhe(id, nome,foto){

  this.navCtrl.push('CategoriaDetalhePage', {
    id:         id,
    nome:       nome,
    foto:       foto

  })

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'categoria.php').subscribe(data =>{
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
          this.navCtrl.setRoot('CategoriaListPage')
        }
      }
    ]
  });
  alert.present();
}

}
