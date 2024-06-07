import ReactDOM from 'react-dom/client'
import React from 'react';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import App from './App'
import Page404 from './pages/Page404';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
