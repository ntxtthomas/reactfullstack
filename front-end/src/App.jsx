import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'
import ArticlesListPage from './pages/ArticlesList'

const routes = [{
  path: '/',
  element: <HomePage />
}, {
  path: '/about',
  element: <AboutPage />
}, {
  path: '/article/individual',
  element: <ArticlePage />
}, {
  path: '/articles',
  element: <ArticlesListPage />
}]

const router = createBrowserRouter(routes);

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  );
}

export default App
