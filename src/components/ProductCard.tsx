import type { Product } from "../types/Product";

interface Props {
  product: Product;
  onDelete: (id: number) => void;
  onEdit?: (product: Product) => void; 
}

const ProductCard = ({ product, onDelete, onEdit }: Props) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-contain mb-3"
      />
      <h3 className="font-semibold truncate">{product.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>

      <div className="flex gap-2 mt-3">
        {onEdit && (
          <button
            onClick={() => onEdit(product)}
            className="flex-1 text-sm text-white bg-blue-600 px-3 py-1.5 rounded-full hover:bg-white border hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 text-sm text-white bg-red-600 px-3 py-1.5 rounded-full hover:bg-white border hover:border-red-600 hover:text-red-600 transition-all duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
