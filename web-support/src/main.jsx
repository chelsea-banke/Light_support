window.global = window;
import { createRoot } from 'react-dom/client'
import './index.css'
import './fontawsome.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

import { Login } from './pages/login/login.jsx'
import User from './pages/protected/user.jsx'
import { Dashboard } from './pages/protected/dashboard/dashboard.jsx'
import { Requests } from './pages/protected/requests/requests.jsx'
import { Assets } from './pages/protected/assets/assets.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/user',
    element: <User/>,
    children: [
      {
        path: "/user/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/user/requests",
        element: <Requests/>
      },
      {
        path: "/user/assets",
        element: <Assets/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
