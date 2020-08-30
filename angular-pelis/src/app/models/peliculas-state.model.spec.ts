import {
    reducerPeliculas,
    PeliculasState,
    intializePeliculasState,
    InitMyDataAction,
    NuevaPeliAction
} from './peliculas-state.model';
import { Peliulas } from './Peliculas.model';

describe('reducerPeliculas', () => {
    it('should reduce init data', () => {
        //setup
        const prevState: PeliculasState = intializePeliculasState();
        const action: InitMyDataAction = new InitMyDataAction(['pelicula 1', 'pelicula 2']);
        //action
        const newState: PeliculasState = reducerPeliculas(prevState, action);
        //assertion
        expect(newState.items.length).toEqual(2);
        expect(newState.items[0].nombre).toEqual('pelicula 1');
    });

    it('should reduce new item added', () => {
        const prevState: PeliculasState = intializePeliculasState();
        const action: NuevaPeliAction = new NuevaPeliAction(new Peliulas('deadpool 2', 'url'));
        const newState: PeliculasState = reducerPeliculas(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].nombre).toEqual('deadpool 2');
    });
});