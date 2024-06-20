import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import AuthProvider from "./components/context/AuthProvider";
import RedirectUser from "./components/hoc/RedirectUser";


const privateRoutes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/aboutUs',
    element: <About />
  },
  {
    path: '/contactUs',
    element: <Contact />
  },
  {
    path: '/productDetail/:id',
    element: <ProductDetail />
  }
];

const publicRoutes = [
  {
    path: '/signUp',
    element: <SignUp />
  },
  {
    path: '/signIn',
    element: <SignIn />
  },
  {
    path: '*',
    element: <NotFound />
  }
];
const allRoutes = [
  ...privateRoutes.map(route => ({
    path: route.path,
    element: <RedirectUser>{route.element}</RedirectUser>
  })),
  ...publicRoutes.map(route => ({
    path: route.path,
    element: route.element
  }))
];
const route = createBrowserRouter(allRoutes);


function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
    </>
  )
}

export default App
