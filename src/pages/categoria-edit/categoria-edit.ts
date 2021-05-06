import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-categoria-edit',
  templateUrl: 'categoria-edit.html',
})
export class CategoriaEditPage {

  id:             number;
  nome:           string ="";
  foto:           string ="";

  base64Image :   string = "";
  cameraData:     string = "";
  url:            string = "";

  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

      this.url = serve.serve;
}



ionViewDidLoad() {

  this.id         = this.navParams.get('id');
  this.nome  = this.navParams.get('nome');
  this.foto       = this.navParams.get('foto');

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
  if(this.cameraData === ''){
  let body ={
    id:        this.id,
    nome: this.nome,
    foto:      this.foto,
    crud:      'editar2'
  };
  
  this.serve.postData(body, 'aplicativo/categoria.php').subscribe((data:any)=> {
    
    this.showInsertOk();
    
  });
  
  
}else{
  let body ={
    id:        this.id,
    nome: this.nome,
    foto:      this.cameraData,
    crud:      'editar'
  };

  this.serve.postData(body, 'aplicativo/categoria.php').subscribe((data:any)=> {
  
    this.showInsertOk();
  
  });

}

}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Seu Registro foi Atualizado',
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
