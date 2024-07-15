import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  onAddProduct: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onAddProduct }) => {
  return (
    <div className="dark">
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
          <h1 className="text-2xl">Product Inventory</h1>
          <button
            onClick={onAddProduct}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Product
          </button>
        </header>
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
