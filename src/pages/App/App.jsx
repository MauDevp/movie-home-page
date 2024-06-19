import './App.css';
import { useRoutes, BrowserRouter, useLocation } from 'react-router-dom';
import { SectionProvide } from '../../Contexts';
import { Home } from '../Home/index.jsx';
import { NavBar } from '../../Components/NavBar';
import { CardSummary } from '../CardSummary/index.jsx';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnimatePresence } from "framer-motion";
import { MoviesPages } from '../MoviesPages/index.jsx';

const AppRoutes = () => {
  const location = useLocation();
  console.log('Current location:', location.pathname);

  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/movie/:id', element: <CardSummary key={location.pathname} /> },
    { path: '/tv/:id', element: <CardSummary key={location.pathname} /> },
    { path: '/movies/:page', element: <MoviesPages  /> },
    { path: '/tvShows/:page', element: <MoviesPages/> },
    { path: '/topRated/:page', element: <MoviesPages /> },
    { path: '/trending', element: <MoviesPages /> },
  ]);
  return routes;
};

function App() {
  return (
    <SectionProvide>
      <AnimatePresence>
        <BrowserRouter>
          <AppRoutes />
          <SpeedInsights />
          <NavBar />
        </BrowserRouter>
      </AnimatePresence>
    </SectionProvide>
  );
}

export default App;