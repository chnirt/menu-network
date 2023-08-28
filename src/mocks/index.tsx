import { nanoid } from 'nanoid'
import { IS_DEVELOP, ORIGIN } from '../constants'

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
    dishDescription: IS_DEVELOP
      ? 'They are crispy, cheesy, and spicy, and they go well with a cold beer or a soft drink. You can also add some toppings to your nachos, such as chicken, beef, bacon, or jalapeños, for an extra charge'
      : '',
    price: IS_DEVELOP ? 99000 : 0,
    dishFiles: [],
  },
  NEW_OBJECT: {
    objectType: 'table',
    objectName: '',
  },
  SETTINGS: {
    logo: [],
    wifi: IS_DEVELOP ? '12345678' : '',
    currency: IS_DEVELOP ? 'vnd' : '',
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
                value: `${ORIGIN}/milk-coffee.jpeg`,
              },
            ],
            id: nanoid(),
            name: 'Milk Coffee',
            description:
              'Milk coffee is a general term for any coffee drink that is made with milk, either steamed, frothed, or cold.',
          },
          {
            price: {
              text: '99,000đ',
            },
            photos: [
              {
                value: `${ORIGIN}/black-coffee.jpeg`,
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
                value: `${ORIGIN}/latte.jpeg`,
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
                value: `${ORIGIN}/peach-orange-lemongrass-tea.jpeg`,
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
                value: `${ORIGIN}/lychee-oolong-tea.jpeg`,
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
                value: `${ORIGIN}/passion-fruit-tea.jpeg`,
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
                value: `${ORIGIN}/kumquat-tea.jpeg`,
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
                value: `${ORIGIN}/sugar-tea.jpeg`,
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
                value: `${ORIGIN}/orange-juice.jpeg`,
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
                value: `${ORIGIN}/guava-juice.jpeg`,
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
                value: `${ORIGIN}/water-melon.jpeg`,
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
                value: `${ORIGIN}/wax-gourd.jpeg`,
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
                value: `${ORIGIN}/sour-milk.jpeg`,
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
                value: `${ORIGIN}/coke.jpg`,
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
                value: `${ORIGIN}/diet-coke.jpg`,
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
                value: `${ORIGIN}/sprite.jpg`,
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
                value: `${ORIGIN}/fanta.jpg`,
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
                value: `${ORIGIN}/red-bull.jpeg`,
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
                value: `${ORIGIN}/dr-thanh.jpg`,
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
                value: `${ORIGIN}/0-degree.jpg`,
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
                value: `${ORIGIN}/c2.jpeg`,
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
                value: `${ORIGIN}/revive.jpeg`,
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
                value: `${ORIGIN}/tea+-plus.png`,
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
                value: `${ORIGIN}/247.jpg`,
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
                value: `${ORIGIN}/number-one.jpg`,
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
