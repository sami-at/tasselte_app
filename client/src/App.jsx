import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import MaxWidthWrapper from './components/MaxWidthWrapper';
import Header from "./components/Header";
import ProductIndex from "./components/ProductIndex/ProductIndex";
import Footer from "./components/Footer/Footer";
const About = lazy(() => import("./components/About"));
const ProductPage = lazy(() => import("./components/ProductPage"));
const ProductCategory = lazy(() => import("./components/ProductCategory"));

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ProductIndex />} />
            <Route path="/products" element={<Suspense fallback={<p>loading...</p>}><ProductCategory /></Suspense>} />
            <Route path="/oil" element={<Suspense fallback={<p>loading...</p>}><ProductCategory /></Suspense>} />
            <Route path="products/product/:id" element={<Suspense fallback={<p>loading...</p>}><ProductPage /></Suspense>} />
            <Route path="/about-us" element={<Suspense fallback={<p>loading...</p>}><About /></Suspense>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </QueryClientProvider>
  )
}



export default App;
