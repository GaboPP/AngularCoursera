import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Peliulas } from './Peliculas.model';
import { PelisApiClient } from './pelis-api-client.model';
import { HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

// ESTADO
export interface PeliculasState {
    items: Peliulas[];
    loading: boolean;
    favorito: Peliulas;
}

export function intializePeliculasState() {
    return {
        items: [],
        loading: false,
        favorito: null
    };
}

// ACCIONES
export enum PeliculasActionTypes {
    NUEVAS_PELICULAS = '[Peliculas] Nuevo',
    ELEGIDO_FAVORITO = '[Peliculas] Favorito',
    VOTE_UP = '[Peliculas] Vote Up',
    VOTE_DOWN = '[Peliculas] Vote Down',
    DELETE = '[Peliculas] Delete',
    INIT_MY_DATA = '[Peliculas] Init My Data'
}

export class NuevaPeliAction implements Action {
    type = PeliculasActionTypes.NUEVAS_PELICULAS;
    constructor(public pelicula: Peliulas) { }
}

export class ElegidoFavoritoAction implements Action {
    type = PeliculasActionTypes.ELEGIDO_FAVORITO;
    constructor(public pelicula: Peliulas) { }
} 

export class DeleteAction implements Action {
    type = PeliculasActionTypes.DELETE;
    constructor(public pelicula: Peliulas) { }
}

export class VoteUpAction implements Action {
    type = PeliculasActionTypes.VOTE_UP;
    constructor(public pelicula: Peliulas) { }
}

export class VoteDownAction implements Action {
    type = PeliculasActionTypes.VOTE_DOWN;
    constructor(public pelicula: Peliulas) { }
}

export class InitMyDataAction implements Action {
    type = PeliculasActionTypes.INIT_MY_DATA;
    constructor(public peliculas: string[]) { }
}

export type PeliculasActions = NuevaPeliAction | ElegidoFavoritoAction | DeleteAction
    | VoteUpAction | VoteDownAction | InitMyDataAction;

// REDUCERS
export function reducerPeliculas(
    state: PeliculasState,
    action: PeliculasActions
): PeliculasState {
    switch (action.type) {
        case PeliculasActionTypes.INIT_MY_DATA: {
            const peliculas: string[] = (action as InitMyDataAction).peliculas;
            return {
                ...state,
                items: peliculas.map((d) => new Peliulas(d, ''))
            };
        }
        case PeliculasActionTypes.NUEVAS_PELICULAS: {
            return {
                ...state,
                items: [...state.items, (action as NuevaPeliAction).pelicula]
            };
        }
        case PeliculasActionTypes.DELETE: {
            console.log(state);
            console.log((action as NuevaPeliAction).pelicula);
            return { ...state,
                items: state.items.filter(peli =>{return peli != (action as NuevaPeliAction).pelicula}) };
        }
        case PeliculasActionTypes.ELEGIDO_FAVORITO: {
            state.items.forEach(x => x.setSelected(false));
            const fav: Peliulas = (action as ElegidoFavoritoAction).pelicula;
            fav.setSelected(true);
            return {
                ...state,
                favorito: fav
            };
        }
        case PeliculasActionTypes.VOTE_UP: {
            const p: Peliulas = (action as VoteUpAction).pelicula;
            p.voteUp();
            return { ...state };
        }
        case PeliculasActionTypes.VOTE_DOWN: {
            const d: Peliulas = (action as VoteDownAction).pelicula;
            d.voteDown();
            return { ...state };
        }
    }
    return state;
}

// EFFECTS
@Injectable()
export class PelisEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(PeliculasActionTypes.NUEVAS_PELICULAS),
        map((action: NuevaPeliAction) => new ElegidoFavoritoAction(action.pelicula))
    );

    constructor(private actions$: Actions) { }
}