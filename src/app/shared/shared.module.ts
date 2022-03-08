import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { TransactionsPipe } from './pipes/transactions.pipe';
import { ModalComponent } from './components/modal/modal.component';

const components = [PanelComponent, ModalComponent];
@NgModule({
  declarations: [...components, TransactionsPipe],
  imports: [CommonModule],
  exports: [...components, TransactionsPipe],
})
export class SharedModule {}
