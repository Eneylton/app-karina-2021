
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions   } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@IonicPage({})
@Component({
  selector: 'page-produto-edit',
  templateUrl: 'produto-edit.html',
})
export class ProdutoEditPage {

  id:                any;
  log:               any;
  codigo:            any;
  barra:             string = "";
  nome:              string = "";
  aplicacao:         string = "";
  qtd:               any = "";
  estoque:           any ;
  valor_compra:      string = "";
  valor_venda:       string = "";
  categorias_id:     any = "";
  usuarios_id:       any;
  foto:              string = "";
  categorias:        any = [];
  base64Image:       string = "";
  cameraData:        string;
  url:string;

  options: BarcodeScanner;
  encodeText:string="";
  encodeData: any={};
  scanerData: any={};

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,public actionSheetCtrl: ActionSheetController,
                                             private serve: ServiceProvider,public alertCtrl: AlertController,
                                             private barcodeScanner: BarcodeScanner,
                                             private storage: Storage,public toastyCrtl: ToastController) {

                                              this.url = serve.serve;
  
                                            }

  ionViewDidLoad() {

    this.id                         = this.navParams.get('id');
    this.nome                       = this.navParams.get('nome');
    this.barra                      = this.navParams.get('barra');
    this.codigo                     = this.navParams.get('codigo');
    this.qtd                        = this.navParams.get('qtd');
    this.valor_compra               = this.navParams.get('valor_compra');
    this.valor_venda                = this.navParams.get('valor_venda');
    this.estoque                    = this.navParams.get('estoque');
    this.foto                       = this.navParams.get('foto');
    this.aplicacao                  = this.navParams.get('aplicacao');
    this.categorias_id              = this.navParams.get('categorias_id');
  

   
    this.listarCategoria();
   
    this.categorias       = [];
    
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.usuarios_id = this.log.id;
      
      
    });

  }

  scan(){

    this.barcodeScanner.scan().then((data)=>{
  
      this.scanerData = data;
  
    }, (err) => {
  
      console.log("error: ", err );
      
    });
  }
  
  

listarCategoria() {
  
     let body = {
  
       crud:'listar-cat'
     }
   this.serve.postData(body,'aplicativo/categoria.php').subscribe((data:any)=>{
     for(let item of data.result){
           this.categorias.push({
           id:item.id,
           nome:item.nome
         })

       }
     })
 }

 
 presentActionSheet() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Abrir Midia',
    buttons: [
      {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.abrirCamrera();
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.abrirGaleria();
        }

      }
    ]
  });

  actionSheet.present();
}


abrirCamrera() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth:650,
    targetHeight:650,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {

    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

    console.log(err);

  });

}


abrirGaleria() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth:650,
    targetHeight:650,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

  });

}

editar(){

  if(this.cameraData === undefined){
  
    let body ={

    id:               this.id,
    codigo:           this.codigo,
    barra:            this.scanerData.text,
    nome:             this.nome,
    qtd:              1,
    aplicacao:        this.aplicacao,
    foto:             this.foto,
    valor_venda:      this.valor_venda,
    valor_compra:     this.valor_compra,
    estoque:          this.estoque,
    status:           1,
    categorias_id:    this.categorias_id,
    usuarios_id:      4,
    crud: 'editar-produto2'
    };
  
    this.serve.postData(body, 'aplicativo/produto.php').subscribe(data => {
    
      this.showInsertOk();
    
    });
  
  
  
  }else{
  
    let body ={

    id:               this.id,
    codigo:           this.codigo,
    barra:            this.barra,
    nome:             this.nome,
    qtd:              1,
    aplicacao:        this.aplicacao,
    foto:             this.cameraData,
    valor_venda:      this.valor_venda,
    valor_compra:     this.valor_compra,
    estoque:          this.estoque,
    status:           1,
    categorias_id:    this.categorias_id,
    usuarios_id:      4,
    crud: 'editar-produto'
    };
  
    this.serve.postData(body, 'aplicativo/produto.php').subscribe(data => {
    
      this.showInsertOk();
    
    });
  
  }
  
  
  }
  
  
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            
            this.navCtrl.setRoot('ProdutoListPage');

          }
        }
      ]
    });
    alert.present();
  }

}

