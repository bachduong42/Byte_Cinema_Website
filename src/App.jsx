import logo from './logo.svg';
import './App.css';
import { ToastContainer} from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./router"
import DefaultLayout from "./components/Layout/DefaultLayout"
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page></Page>
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
        <ToastContainer position='top-right'  style={{width: '340px', textAlign: 'left'}} autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
