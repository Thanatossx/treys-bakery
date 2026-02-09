export type MenuItem = { name: string; price: number };
export type MenuCategory = { id: string; name: string; items: MenuItem[] };

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "Pudding", price: 10 },
      { name: "Pie", price: 15 },
      { name: "Brownie", price: 20 },
      { name: "Eclair", price: 10 },
      { name: "Souffle", price: 15 },
      { name: "Tiramisu", price: 20 },
      { name: "Cookies", price: 10 },
      { name: "Trifle", price: 15 },
      { name: "Croissant", price: 20 },
      { name: "Tres Leches", price: 20 },
    ],
  },
  {
    id: "cakes",
    name: "Cakes",
    items: [
      { name: "Black Forest Cake", price: 35 },
      { name: "Chocolate Cake", price: 30 },
      { name: "Rainbow Cake", price: 30 },
      { name: "Red Velvet Cake", price: 35 },
      { name: "Berry Cake", price: 35 },
    ],
  },
  {
    id: "cheesecakes",
    name: "Cheesecakes",
    items: [
      { name: "Cold Cheesecake", price: 20 },
      { name: "Chocolate Cheesecake", price: 25 },
      { name: "Berry Cheesecake", price: 25 },
      { name: "Lemon Cheesecake", price: 25 },
      { name: "Basque Cheesecake", price: 30 },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    items: [
      { name: "Filter Coffee", price: 15 },
      { name: "Latte", price: 20 },
      { name: "Americano", price: 15 },
      { name: "Milk", price: 10 },
      { name: "Juice", price: 10 },
      { name: "Iced Latte", price: 25 },
      { name: "Lemonade", price: 15 },
      { name: "Berry Hibiscus", price: 15 },
      { name: "Cool Lime", price: 15 },
    ],
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    items: [
      { name: "Chocolate Cupcake", price: 15 },
      { name: "Berry Cupcake", price: 15 },
      { name: "Vanilla Cupcake", price: 15 },
      { name: "Red Velvet Cupcake", price: 15 },
    ],
  },
  {
    id: "donuts",
    name: "Donuts",
    items: [
      { name: "Chocolate Donut", price: 10 },
      { name: "Glazed Donut", price: 10 },
      { name: "Strawberry Jelly", price: 10 },
      { name: "Cream Donut", price: 15 },
    ],
  },
  {
    id: "special",
    name: "Special",
    items: [{ name: "R.A.D.A.R Cupcake", price: 30 }],
  },
];
