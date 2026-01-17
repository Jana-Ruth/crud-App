import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import {
  fetchProducts,
  postProduct,
  deleteProduct,
  updateProduct,
} from "../api/productApi";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null); // for edit
  const [toast, setToast] = useState(""); 

  
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    setToast("Product deleted successfully!");
    setTimeout(() => setToast(""), 3000); 

    
    const isOriginal = id <= 20; 
    if (isOriginal) deleteProduct(id);
  };

  // Add product
  const handleAdd = async (productData: Omit<Product, "id">) => {
    const newProduct = await postProduct(productData);
    setProducts([newProduct, ...products]);
    setToast("Product added successfully!");
    setTimeout(() => setToast(""), 3000);
  };

  // Edit product (open modal)
  const handleEdit = (product: Product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  // Update product
  const handleUpdate = async (id: number, updatedData: Partial<Product>) => {
    const updatedProduct = await updateProduct(id, updatedData);
    setProducts(products.map((p) => (p.id === id ? updatedProduct : p)));
    setToast("Product updated successfully!");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      
      {toast && (
        <div className="fixed top-5 right-5 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {toast}
        </div>
      )}

      
      <button
        onClick={() => {
          setModalProduct(null); 
          setIsModalOpen(true);
        }}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Product
      </button>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
        productToEdit={modalProduct || undefined}
        onUpdate={handleUpdate}
      />

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit} 
          />
        ))}
      </div>
    </div>
  );
}
