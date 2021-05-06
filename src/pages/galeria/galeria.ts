import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {

  id: number;
  imagens: any = [];
  fotos: any = [];
  base64Image: string = "";
  cameraData: string = "";
  url: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

    this.url = serve.serve;
    console.log(this.serve);
  }


  ionViewDidLoad() {

    this.id = this.navParams.get('id');
    this.imagens = [];

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
      targetWidth: 650,
      targetHeight: 650,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {

      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imagens.push(this.cameraData);
      this.fotos.push(this.base64Image);

    }, (err) => {

    });

  }


  abrirGaleria() {

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 650,
      targetHeight: 650,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imagens.push(this.cameraData);
      this.fotos.push(this.base64Image);
    }, (err) => {

    });

  }

  cadastrar() {
    this.imagens.forEach(item => {
      let body = {

        produtos_id: this.id,
        foto: item,
        crud: 'adicionar'
      };

      this.serve.postData(body, 'aplicativo/galeria.php').subscribe(data => {

      });

    })
    this.showInsertOk();
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
            this.navCtrl.setRoot('ProdutoListPage')
          }
        }
      ]
    });
    alert.present();
  }


  deleteImg(index){

   this.fotos.splice(index,1);
  }

   


}