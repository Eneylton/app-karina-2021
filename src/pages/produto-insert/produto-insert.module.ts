import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoInsertPage } from './produto-insert';

@NgModule({
  declarations: [
    ProdutoInsertPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoInsertPage),
  ],
})
export class ProdutoInsertPageModule {}
