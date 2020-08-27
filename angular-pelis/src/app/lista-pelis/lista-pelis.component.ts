import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pelis',
  templateUrl: './lista-pelis.component.html',
  styleUrls: ['./lista-pelis.component.css']
})
export class ListaPelisComponent implements OnInit {
  pelis: string[];
  constructor() {
    this.pelis = ['El conjuro', 'Avengers', 'Kimi no nawa'];
  }

  ngOnInit(): void {
  }

  guardar(nombre: string): boolean {
    console.log(this.pelis);
    this.pelis.push(nombre);
    return false
  }
}
