import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

type Product = {
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
};

type ProductModalProps = {
  product: Product | null;
  onSave: (product: Product) => Promise<void>; // Make onSave async
  onClose: () => void;
};

const ProductModal: React.FC<ProductModalProps> = ({ product, onSave, onClose }) => {
  const [formProduct, setFormProduct] = useState<Product>({
    name: '',
    category: '',
    brand: '',
    description: '',
    price: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormProduct(product);
    } else {
      setFormProduct({
        name: '',
        category: '',
        brand: '',
        description: '',
        price: 0,
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormProduct((prevFormProduct) => ({
      ...prevFormProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formProduct.name || !formProduct.category || !formProduct.price) {
        setError('Name, category, and price are required fields.');
        return;
      }
      setError(null);
      await onSave(formProduct);
      onClose();
    };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-6 rounded-lg w-full max-w-md mx-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">{product ? 'Edit Product' : 'Add Product'}</h2>
          <button onClick={onClose}>
            <FaTimes className="text-white" />
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formProduct.category}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formProduct.brand}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded bg-gray-800 text-white"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formProduct.description}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded bg-gray-800 text-white"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded bg-gray-800 text-white"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
              Cancel
            </button>
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
