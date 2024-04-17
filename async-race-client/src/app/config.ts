const garageUrl = 'http://localhost:3000/garage/';
const engineUrl = 'http://localhost:3000/engine/';
const winnersUrl = 'http://localhost:3000/winners/';
const header = 250;
const tracks = 7;
const startPage = 1;
const generateCars = 100;
const names = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Lexus',
  'Subaru',
  'Volkswagen',
];

const models = [
  'Corolla',
  'Civic',
  'F-150',
  'Silverado',
  '3 Series',
  'E-Class',
  'A4',
  'RX',
  'Outback',
  'Golf',
];

const colors = [
  '#FF5733',
  '#fffff',
  '#3357FF',
  '#57FF33',
  '#5733FF',
  '#FF33A3',
  '#A333FF',
  '#fff',
  '#aaa',
  '#FFA333',
];

export default {
  garageUrl,
  engineUrl,
  header,
  tracks,
  startPage,
  generateCars,
  winnersUrl,
  names,
  models,
  colors,
};
