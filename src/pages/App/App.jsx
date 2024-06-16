import './App.css'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { Home } from '../Home/index.jsx'
import { Home2 } from '../Home2/index.jsx'
import { NavBar } from '../../Components/NavBar'
import { CardSummary } from '../../Components/CardSummary'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnimatePresence } from "framer-motion"

const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home />},
    { path: '/Home2', element: <Home2 /> },
    { path: '/movie/:id', element: <CardSummary /> },
    { path: '/tv/:id', element: <CardSummary /> },
  ])
  return routes
}

function App() {
  return (
    <>
      <AnimatePresence>
        <BrowserRouter>
          <AppRoutes />
          <SpeedInsights />
          <NavBar />
        </BrowserRouter>
      </AnimatePresence>
    </>
  )
}

export default App
