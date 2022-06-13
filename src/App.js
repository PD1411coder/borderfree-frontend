
import './App.css';
import './bootstrap.css'
import Layout from './component/Layout';
import { Routes as Switch, Route}  from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { AuthContextProvider } from "./context/AuthContext";
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';


function App() {
  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<AddProduct />} />
            <Route path="/editproduct/:id" element={<EditProduct />} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
