const garageUrl = 'https://race.yakubouski.pl/api/garage/';
const engineUrl = 'https://race.yakubouski.pl/api/engine/';
const winnersUrl = 'https://race.yakubouski.pl/api/winners/';
const header = 250;
const tracks = 7;
const winners = 10;
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
  winners,
};
