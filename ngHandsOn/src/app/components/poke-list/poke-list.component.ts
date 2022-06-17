import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css'],
})
export class PokeListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selected: Pokemon | null = null;
  editPokemon: Pokemon | null = null;

  constructor(private pokeService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokeService.index().subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
      },
      error: (fail) => {
        console.error(
          'PokeListComponent.loadPokemon(): Error loading pokemon list'
        );
        console.error(fail);
      },
    });
  }

  addPokemon(form: NgForm) {
    const pokemon: Pokemon = form.value;
    console.log('PokeListComponent.addPokemon():');
    console.log(pokemon);
    if (!form.valid) {
      console.error('PokeListComponent.addPokemon(): invalid form');
      console.error(form);
      return;
    }
    this.pokeService.create(pokemon).subscribe({
      next: (data) => {
        this.loadPokemon();
        this.selected = null;
      },
      error: (err) => {
        console.error('PokeListComponent.addPokemon(): Error adding pokemon');
        console.error(pokemon);
        console.error(err);
      },
    });
  }

  setEditPokemon(pokemon: Pokemon) {
    this.editPokemon = Object.assign({}, pokemon);
  }

  updatePokemon(pokemon: Pokemon) {
    console.log('Updating pokemon:');
    console.log(pokemon);
    this.pokeService.update(pokemon).subscribe({
      next: (good) => {
        const poke: Pokemon = good;
        this.selected = poke;
        this.editPokemon = null;
      },
      error: (bad) => {
        console.error(
          'PokeListComponent.updatePokemon(): Error updating pokemon'
        );
        console.error(bad);
      },
    });
  }

  deletePokemon(id: number) {
    this.pokeService.destroy(id).subscribe({
      next: (good) => {
        console.log('Pokemon deleted: ' + id);
        this.loadPokemon();
        this.selected = null;
      },
      error: (bad) => {
        console.error(
          'PokeListComponent.destroy(): Error deleting pokemon ID ' + id
        );
        console.error(bad);
      },
    });
  }
}
