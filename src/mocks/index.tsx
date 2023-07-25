import { nanoid } from "nanoid";

const isDevelop = !true;

export const MASTER_MOCK_DATA = {
  LOGIN: {
    email: isDevelop ? "chnirt@gmail.com" : "",
    password: isDevelop ? "Admin@123" : "",
  },
  REGISTER: {
    fullName: isDevelop ? "Chnirt Chnirt" : "",
    email: isDevelop ? "chnirt@gmail.com" : "",
    username: isDevelop ? "chnirt" : "",
    password: isDevelop ? "Admin@123" : "",
    confirmPassword: isDevelop ? "Admin@123" : "",
  },
  NEW_CATEGORY: {
    categoryName: isDevelop ? "Cocktail" : "",
  },
  NEW_DISH: {
    dishName: isDevelop ? "Phatty’S Nachos" : "",
    price: isDevelop ? 99000 : 0,
    dishFiles: []
  },
};

export const SAMPLE_DATA = {
  reply: {
    menu_infos: [
      {
        dish_type_id: nanoid(),
        dish_type_name: "Coffee",
        dishes: [
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/milk-coffee.jpeg",
              },
            ],
            id: nanoid(),
            name: "Milk Coffee",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/black-coffee.jpeg",
              },
            ],
            id: nanoid(),
            name: "Black Coffee",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/latte.jpeg",
              },
            ],
            id: nanoid(),
            name: "Latte",
          },
        ],
      },
      {
        dish_type_id: nanoid(),
        dish_type_name: "Tea",
        dishes: [
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value:
                  "https://wjhjnr.csb.app/peach-orange-lemongrass-tea.jpeg",
              },
            ],
            id: nanoid(),
            name: "Trà đào cam sả",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/lychee-oolong-tea.jpeg",
              },
            ],
            id: nanoid(),
            name: "Trà vải",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/passion-fruit-tea.jpeg",
              },
            ],
            id: nanoid(),
            name: "Trà chanh dây",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/kumquat-tea.jpeg",
              },
            ],
            id: nanoid(),
            name: "Trà tắc",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/sugar-tea.jpeg",
              },
            ],
            id: nanoid(),
            name: "Trà đường",
          },
        ],
      },
      {
        dish_type_id: nanoid(),
        dish_type_name: "Fruit",
        dishes: [
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/orange-juice.jpeg",
              },
            ],
            id: nanoid(),
            name: "Cam",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/guava-juice.jpeg",
              },
            ],
            id: nanoid(),
            name: "Ổi",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/milk-coffee.jpeg",
              },
            ],
            id: nanoid(),
            name: "Cà Cải",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/water-melon.jpeg",
              },
            ],
            id: nanoid(),
            name: "Dưa hấu",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/wax-gourd.jpeg",
              },
            ],
            id: nanoid(),
            name: "Bí đao",
          },
        ],
      },
      {
        dish_type_id: nanoid(),
        dish_type_name: "Yogurt",
        dishes: [
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/sour-milk.jpeg",
              },
            ],
            id: nanoid(),
            name: "Sour Milk",
          },
        ],
      },
      {
        dish_type_id: nanoid(),
        dish_type_name: "Soft Drink",
        dishes: [
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/coke.jpg",
              },
            ],
            id: nanoid(),
            name: "Coke",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/diet-coke.jpg",
              },
            ],
            id: nanoid(),
            name: "Diet Coke",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/sprite.jpg",
              },
            ],
            id: nanoid(),
            name: "Sprite",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/fanta.jpg",
              },
            ],
            id: nanoid(),
            name: "Fanta",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/red-bull.jpeg",
              },
            ],
            id: nanoid(),
            name: "Red Bull",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/dr-thanh.jpg",
              },
            ],
            id: nanoid(),
            name: "Dr Thanh",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/0-degree.jpg",
              },
            ],
            id: nanoid(),
            name: "0 degree",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/c2.jpeg",
              },
            ],
            id: nanoid(),
            name: "C2",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/revive.jpeg",
              },
            ],
            id: nanoid(),
            name: "Revive",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/tea+-plus.png",
              },
            ],
            id: nanoid(),
            name: "TEA+ Plus",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/247.jpg",
              },
            ],
            id: nanoid(),
            name: "247",
          },
          {
            price: {
              text: "99,000đ",
            },
            photos: [
              {
                value: "https://wjhjnr.csb.app/number-one.jpg",
              },
            ],
            id: nanoid(),
            name: "Number One",
          },
        ],
      },
    ],
  },
};
