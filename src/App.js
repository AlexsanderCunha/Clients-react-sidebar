import React, { useState } from 'react'
import './App.css';
import Form from './components/Form';
import TableClient from './components/TableClient';
import Header from './components/Header'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <TableClient/>,
  },
  {
    path: "/clients",
    element: <Form/>,
  },
]);

function App() {
  return (
    <>
        <Header />
        <RouterProvider router={routers} />
    </>    
  );
}

export default App;
