import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cines-detalle-component',
  templateUrl: './cines-detalle-component.component.html',
  styleUrls: ['./cines-detalle-component.component.css']
})
export class CinesDetalleComponentComponent implements OnInit {
  id: any;
  
  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });
  }
  ngOnInit() {
  }

}
