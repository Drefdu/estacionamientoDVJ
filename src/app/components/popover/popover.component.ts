import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  @Input('opciones') opciones: any;

  constructor(private popoverController: PopoverController) {
  }

  hola(op1: any, op3: any, op4: any){

    let opciones = {
      op1: op1.checked == true ?  op1.value : '',
      //op2: op2.checked == true ?  op2.value : '',
      op3: op3.checked == true ?  op3.value : '',
      op4: op4.checked == true ?  op4.value : ''
    }
    this.popoverController.dismiss(opciones);
  }
}
