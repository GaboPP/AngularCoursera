import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  @Input() peli: string;
  @HostBinding('attr.class') cssClass = 'col-md-4';

  constructor() { }

  ngOnInit(): void {
  }

}
