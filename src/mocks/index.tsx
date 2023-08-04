import { nanoid } from 'nanoid'
import { IS_DEVELOP } from '../constants'

export const MASTER_MOCK_DATA = {
  LOGIN: {
    email: IS_DEVELOP ? 'chnirt@gmail.com' : '',
    password: IS_DEVELOP ? 'Admin@123' : '',
  },
  REGISTER: {
    fullName: IS_DEVELOP ? 'Chnirt Chnirt' : '',
    email: IS_DEVELOP ? 'chnirt@gmail.com' : '',
    username: IS_DEVELOP ? 'chnirt' : '',
    password: IS_DEVELOP ? 'Admin@123' : '',
    confirmPassword: IS_DEVELOP ? 'Admin@123' : '',
  },
  NEW_CATEGORY: {
    categoryName: IS_DEVELOP ? 'Cocktail' : '',
  },
  NEW_DISH: {
    uploadMethod: IS_DEVELOP ? 'link' : 'file',
    dishName: IS_DEVELOP ? 'Phatty’S Nachos' : '',
    price: IS_DEVELOP ? 99000 : 0,
    dishFiles: [],
  },
  SETTINGS: {
    wifi: IS_DEVELOP ? '12345678' : '',
  },
}

export const SAMPLE_DATA = {
  reply: {
    menu_infos: [
      {
        dish_type_id: nanoid(),
        dish_type_name: 'Coffee',
        dishes: [
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/milk-coffee.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Milk Coffee',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/black-coffee.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Black Coffee',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/latte.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Latte',
          },
        ],
      },
      {
        dish_type_id: nanoid(),
        dish_type_name: 'Tea',
        dishes: [
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value:
                  'https://wjhjnr.csb.app/peach-orange-lemongrass-tea.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Peach orange lemongrass tea',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/lychee-oolong-tea.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Lychee tea',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/passion-fruit-tea.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Passion fruit tea',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/kumquat-tea.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Kumquat tea',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/sugar-tea.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Sugar tea',
          },
        ],
      },
      {
        dish_type_id: nanoid(),
        dish_type_name: 'Fruit',
        dishes: [
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/orange-juice.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Orange',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/guava-juice.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Guava',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/water-melon.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Water melon',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/wax-gourd.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Wax gourd',
          },
        ],
      },
      {
        dish_type_id: nanoid(),
        dish_type_name: 'Yogurt',
        dishes: [
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/sour-milk.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Sour Milk',
          },
        ],
      },
      {
        dish_type_id: nanoid(),
        dish_type_name: 'Soft Drink',
        dishes: [
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/coke.jpg',
              },
            ],
            id: nanoid(),
            name: 'Coke',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/diet-coke.jpg',
              },
            ],
            id: nanoid(),
            name: 'Diet Coke',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/sprite.jpg',
              },
            ],
            id: nanoid(),
            name: 'Sprite',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/fanta.jpg',
              },
            ],
            id: nanoid(),
            name: 'Fanta',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/red-bull.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Red Bull',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/dr-thanh.jpg',
              },
            ],
            id: nanoid(),
            name: 'Dr Thanh',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/0-degree.jpg',
              },
            ],
            id: nanoid(),
            name: '0 degree',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/c2.jpeg',
              },
            ],
            id: nanoid(),
            name: 'C2',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/revive.jpeg',
              },
            ],
            id: nanoid(),
            name: 'Revive',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/tea+-plus.png',
              },
            ],
            id: nanoid(),
            name: 'TEA+ Plus',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/247.jpg',
              },
            ],
            id: nanoid(),
            name: '247',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: 'https://wjhjnr.csb.app/number-one.jpg',
              },
            ],
            id: nanoid(),
            name: 'Number One',
          },
        ],
      },
    ],
  },
}
