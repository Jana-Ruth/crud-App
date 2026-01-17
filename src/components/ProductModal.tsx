import { useState, useEffect } from "react";
import type { Product } from "../types/Product";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, "id">) => void;
  productToEdit?: Product; 
  onUpdate?: (id: number, updatedData: Partial<Product>) => void; 
}

const ProductModal = ({
  isOpen,
  onClose,
  onAdd,
  productToEdit,
  onUpdate,
}: Props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  
  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setPrice(productToEdit.price.toString());
      setDescription(productToEdit.description);
      setImage(productToEdit.image);
    } else {
      setTitle("");
      setPrice("");
      setDescription("");
      setImage("");
    }
  }, [productToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !image) return;

    if (productToEdit && onUpdate) {
      
      onUpdate(productToEdit.id, {
        title,
        price: Number(price),
        description,
        image,
      });
    } else {
      
      onAdd({
        title,
        price: Number(price),
        description,
        image,
      });
    }

    onClose(); 
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {productToEdit ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              onChange={(e) => setImage(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>



          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
          >
            {productToEdit ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
