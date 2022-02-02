import { images } from "./images";

export const restaurants = [
  {
    id: 1,
    name: "Coffee Corner",
    address: "Mingalar Mandalay",
    location: [21.9476939, 96.0928349],
    imageURL: images.coffee,
    menu: [
      { name: "Latte", price: 3 },
      { name: "Cappuccino", price: 3 },
      { name: "Mocha", price: 3 },
      { name: "Hot Chocolate", price: 3 },
      { name: "White Coffee", price: 3 },
    ],
  },
  {
    id: 2,
    name: "Pizza Hut",
    address: "Mingalar Mandalay",
    location: [21.9476939, 96.0928349],
    imageURL: images.pizza,
    menu: [
      { name: "Hawaiian Pizza", price: 10 },
      { name: "Vegetable Delight", price: 10 },
      { name: "Bacon Cheese", price: 10 },
      { name: "Margarhita Pizza", price: 10 },
      { name: "Seafood Pizza", price: 10 },
    ],
  },
  {
    id: 3,
    name: "Salad Bar",
    address: "Mingalar Mandalay",
    location: [21.9476939, 96.0928349],
    imageURL: images.salad,
    menu: [
      { name: "Caesar Salad", price: 10 },
      { name: "Tomato Salad", price: 10 },
      { name: "Papaya Salad", price: 10 },
      { name: "Mango Salad", price: 10 },
      { name: "Assorted Salad", price: 10 },
    ],
  },
  {
    id: 4,
    name: "Noodle House",
    address: "Mingalar Mandalay",
    location: [21.9476939, 96.0928349],
    imageURL: images.noodle,
    menu: [
      { name: "Ramen", price: 10 },
      { name: "Dan Dan Mian", price: 10 },
      { name: "Chicken Katsu", price: 10 },
      { name: "Tonkutsu Shoryu Ramen", price: 10 },
      { name: "Tamago", price: 10 },
    ],
  },
  {
    id: 5,
    name: "Sandwich Club",
    address: "Mingalar Mandalay",
    location: [21.9476939, 96.0928349],
    imageURL: images.sandwich,
    menu: [
      { name: "Chicken Sandwich", price: 10 },
      { name: "Pork Sandwich", price: 10 },
      { name: "Beef Sandwich", price: 10 },
      { name: "Fish Fillet", price: 10 },
    ],
  },
];
