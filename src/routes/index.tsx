import { createBrowserRouter } from 'react-router-dom'
import { Loadable, PrivateRoute, PublicRoute } from './utils'
import Home from '../screens/Home'
import App from '../screens/App'

export const routes = {
    login: '/login',
    register: '/register',
    app: '/',

    dashboard: '/',
    menu: '/menu/:menuId',
    qrCode: '/qr-code/:menuId',
    order: '/order',
    me: '/me',
    newCategory: '/new-category',
    updateCategory: '/categories/:categoryId',
    newDish: '/categories/:categoryId/new-dish',
    updateDish: '/categories/:categoryId/dishes/:dishId',
}

export const router = createBrowserRouter([
    {
        // element: <Loadable {...{ factory: () => import("../screens/Home") }} />,
        element: <Home />,
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
                                            factory: () =>
                                                import('../screens/Dashboard'),
                                        }}
                                    />
                                ),
                            },
                            {
                                path: routes.order,
                                element: (
                                    <Loadable
                                        {...{
                                            factory: () =>
                                                import('../screens/Order'),
                                        }}
                                    />
                                ),
                            },
                            {
                                path: routes.me,
                                element: (
                                    <Loadable
                                        {...{
                                            factory: () =>
                                                import('../screens/Profile'),
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
                                    factory: () =>
                                        import('../screens/NewCategory'),
                                }}
                            />
                        ),
                    },
                    {
                        path: routes.updateCategory,
                        element: (
                            <Loadable
                                {...{
                                    factory: () =>
                                        import('../screens/NewCategory'),
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
                                    factory: () =>
                                        import('../screens/Register'),
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
                ],
            },
        ],
    },
])
