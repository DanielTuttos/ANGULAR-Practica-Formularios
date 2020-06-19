import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {

  usuario: Object = {
    nombre: "",
    apellido: "",
    correo: "",
    pais: "",
    sexo: "Hombre",
    acepta: false
  }

  paises = [
    {
      codigo: "CRI",
      nombre: "COSTA RICA"
    },
    {
      codigo: "EC",
      nombre: "ECUADOR"
    },
    {
      codigo: "CO",
      nombre: "COLOMBIA"
    },
    {
      codigo: "MX",
      nombre: "MEXICO"
    },
  ];

  sexos = ["Hombre", "Mujer", "No Definido"]

  constructor() { }

  ngOnInit(): void {
  }

  guardar(forma: NgForm) {
    // console.log("formulario posteado");
    console.log("ngForm: ", forma);
    console.log("Valor forma: ", forma.value);

    console.log("usuario: ", this.usuario);
  }

}
