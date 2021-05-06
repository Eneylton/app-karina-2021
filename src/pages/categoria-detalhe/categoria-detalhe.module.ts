import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaDetalhePage } from './categoria-detalhe';

@NgModule({
  declarations: [
    CategoriaDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaDetalhePage),
  ],
})
export class CategoriaDetalhePageModule {}
