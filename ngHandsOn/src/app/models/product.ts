export class Product {

  name: string;
  price: number;
  imgUrl: string;
  rating: number;

  constructor(
    name: string = '',
    price: number = 0,
    imgUrl: string = '',
    rating: number = 0
  ){
    this.name = name;
    this.price = price;
    this.imgUrl = imgUrl;
    this.rating = rating;
  }


}
