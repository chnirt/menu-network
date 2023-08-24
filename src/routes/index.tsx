import { createBrowserRouter } from 'react-router-dom'
import { Loadable, PrivateRoute, PublicRoute } from './utils'
import Home from '../screens/Home'
import App from '../screens/App'
import Error from '../screens/Error'

export const routes = {
  login: '/login',
  register: '/register',
  app: '/',

  dashboard: '/',
  menu: '/menu/:menuId',
  qrCode: '/qr-code/:menuId',
  cart: '/cart',
  order: '/order',
  me: '/me',
  newCategory: '/new-category',
  updateCategory: '/categories/:categoryId',
  newDish: '/categories/:categoryId/new-dish',
  updateDish: '/categories/:categoryId/dishes/:dishId',
  settings: '/settings',
  dish: '/dish/:dishId',

  error: '/error',
}

export const router = createBrowserRouter([
  {
    // element: <Loadable {...{ factory: () => import("../screens/Home") }} />,
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: routes.app,
            // element: (
            //   <Loadable {...{ factory: () => import("../screens/App") }} />
            // ),
            element: <App />,
            children: [
              {
                path: routes.dashboard,
                element: (
                  <Loadable
                    {...{
                      factory: () => import('../screens/Dashboard'),
                    }}
                  />
                ),
              },
              {
                path: routes.cart,
                element: (
                  <Loadable
                    {...{
                      factory: () => import('../screens/Cart'),
                    }}
                  />
                ),
              },
              {
                path: routes.order,
                element: (
                  <Loadable
                    {...{
                      factory: () => import('../screens/Order'),
                    }}
                  />
                ),
              },
              {
                path: routes.me,
                element: (
                  <Loadable
                    {...{
                      factory: () => import('../screens/Profile'),
                    }}
                  />
                ),
              },
            ],
          },
          {
            path: routes.newDish,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/NewDish'),
                }}
              />
            ),
          },
          {
            path: routes.updateDish,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/NewDish'),
                }}
              />
            ),
          },
          {
            path: routes.newCategory,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/NewCategory'),
                }}
              />
            ),
          },
          {
            path: routes.updateCategory,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/NewCategory'),
                }}
              />
            ),
          },
          {
            path: routes.settings,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/Settings'),
                }}
              />
            ),
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: routes.login,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/Login'),
                }}
              />
            ),
          },
          {
            path: routes.register,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/Register'),
                }}
              />
            ),
          },
        ],
      },
      {
        element: <App />,
        children: [
          {
            path: routes.menu,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/Menu'),
                }}
              />
            ),
          },
          {
            path: routes.qrCode,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/QRCode'),
                }}
              />
            ),
          },
          {
            path: routes.dish,
            element: (
              <Loadable
                {...{
                  factory: () => import('../screens/Dish'),
                }}
              />
            ),
          },
        ],
      },
      {
        path: routes.error,
        element: (
          <Loadable
            {...{
              factory: () => import('../screens/Error'),
            }}
          />
        ),
      },
    ],
  },
])
