import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductModal from '../components/ProductModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentProduct, setCurrentProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products'); // Replace with your API route
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      setProducts(data.topics || []); // Ensure response is correctly structured
      setLoading(false); // Set loading to false after data is fetched
    } catch (error: any) {
        setError(error.message || 'Failed to fetch products');
      setLoading(false); // Set loading to false on error
    }
  };

  const handleAddProduct = async () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
    // try {
    //     const res = await fetch("http://localhost:3000/api/products", {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify({ products.name, products.category,  }),
    //     });
  
    //     if (res.ok) {
    //       router.push("/");
    //     } else {
    //       throw new Error("Failed to create a topic");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
  };

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (product: any) => {
    try {
        if (currentProduct && currentProduct._id) {
          await fetch(`http://localhost:3000/api/products/${currentProduct._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          });
        } else {
          await fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          });
        }
        fetchProducts();
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsModalOpen(false);
      }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
        await fetch(`http://localhost:3000/api/products?id=${id}`, {
          method: 'DELETE',
        });
        fetchProducts();
      } catch (error: any) {
        setError(error.message);
      }
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  return (
    <Layout onAddProduct={handleAddProduct}>
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Brand</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-green-500 text-white p-2 rounded flex items-center justify-center"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <ProductModal
          product={currentProduct}
          onSave={handleSaveProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default Home;
