import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;

  usuario: any = {
    nombreCompleto: {
      nombre: "Daniel",
      apellido: "Romero"
    },
    correo: 'daniel@gmail.com',
    // pasatiempos: ['correr', 'dormir', 'comer']
  }

  constructor() {

    console.log(this.usuario)

    this.forma = new FormGroup({

      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [Validators.required, this.noRomero]),
      }),
      'correo': new FormControl('',
        [Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")

        ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'userName': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(),

    });

    // this.forma.setValue(this.usuario);

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ])

    // una forma de hacerlo
    // this.forma.valueChanges.subscribe(data => {
    //   console.log(data);
    // });

    // otra forma de hacerlo
    this.forma.controls['userName'].valueChanges.subscribe(data => {
      console.log(data);
    })

  }

  ngOnInit(): void {
  }

  AgregarPasatiempo() {
    // decirle a typescript que es un arreglo
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    )
  }

  noRomero(control: FormControl): { [s: string]: boolean } {

    if (control.value === "romero") {
      return {
        noromero: true
      }
    }
    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {

    let forma: any = this

    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      }
    }
    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === "strider") {
            resolve({ existe: true });
          } else {
            resolve(null);
          }
        }, 3000)
      }
    )
    return promesa;
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);
    // this.forma.reset({
    //   nombreCompleto: {
    //     nombre: "",
    //     apellido: ""
    //   },
    //   correo: ""
    // });



  }

}
