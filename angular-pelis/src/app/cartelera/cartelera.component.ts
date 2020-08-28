import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import {Peliulas} from '../models/Peliculas.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { VoteUpAction, VoteDownAction, DeleteAction } from '../models/peliculas-state.model';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  @Input() Pelicula: Peliulas;
  @Input('idx') position: number;

  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<Peliulas> = new EventEmitter();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  ir() {
    this.clicked.emit(this.Pelicula)
    return false;
  }
  voteUp() {
    this.store.dispatch(new VoteUpAction(this.Pelicula));
    return false;
  }
  borrar() {
    this.store.dispatch(new DeleteAction(this.Pelicula));
    return false;
  }
  voteDown() {
    this.store.dispatch(new VoteDownAction(this.Pelicula));
    return false;
  }

}
