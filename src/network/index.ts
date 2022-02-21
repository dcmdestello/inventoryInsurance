import type { Items } from '../inventory';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// mock server call
export const fetchItems = async () => {
  await delay(50);
  return mockedItems;
}

const mockedItems: Items = [
	{
	  "id": 1,
	  "name": "Cartier ring",
		"value": 5780,
		"type": "JEWELRY",
		"description": "Gift from my grandfather, Gift from my grandfather, Gift from my grandfather, Gift from my grandfather",
		"photo": "https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg",
  },
  {
	  "id": 2,
	  "name": "Guitar",
		"value": 850,
		"type": "MUSIC_INSTRUMENT",
		"photo": "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
	{
	  "id": 3,
	  "name": "Cartier ring 2 with a very long name",
		"value": 5780,
		"type": "JEWELRY",
		"description": "Gift from my grandfather",
		"photo": "https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg",
  },
  {
	  "id": 4,
	  "name": "Guitar 2",
		"value": 850,
		"type": "MUSIC_INSTRUMENT",
		"photo": "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
  {
	  "id": 5,
	  "name": "Guitar 3",
		"value": 850,
		"type": "MUSIC_INSTRUMENT",
		"photo": "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  }
];
