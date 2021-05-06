import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoEditPage } from './produto-edit';

@NgModule({
  declarations: [
    ProdutoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoEditPage),
  ],
})
export class ProdutoEditPageModule {}
