import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas: any[] = [
    { 
      titular: 'Juan Perez', 
      numeroTarjeta: '123456789', 
      fechaExpiracion: '11/23',
      cvv: '123'
    },
    {
      titular: 'Miguel Gonzalez',
      numeroTarjeta: '369369369',
      fechaExpiracion: '12/24',
      cvv: '666'
    }
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })

  }

  ngOnInit(): void {
  }

  AgregarTarjeta(){
    console.log(this.form);

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    console.log(tarjeta)
    this.listTarjetas.push(tarjeta);
    this.toastr.success(`La tarjeta ${tarjeta.numeroTarjeta} fue registrada con exito`, 'Tarjeta registrada!');
    // this.form.reset();
  }

  eliminarTarjeta(i: any){
    console.log(i)
    this.listTarjetas.splice(i,1);
    this.toastr.error(`La tarjeta fue eliminada con exito`, 'Tarjeta Eliminada');
  }
}
