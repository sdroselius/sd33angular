export class Pokemon {
  pokeId: number;
  name: string;
  height: number;
  weight: number;
  exp: number;
  img: string;
  description: string;
  types: any[] | undefined = [];

  constructor(
    pokeId: number = 0,
    name: string = '',
    height: number = 0,
    weight: number = 0,
    exp: number = 0,
    img: string = '',
    description: string = '',
    types: any[] = []
  ) {
    this.pokeId = pokeId;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.exp = exp;
    this.img = img;
    this.description = description;
    this.types = types;
  }
}
