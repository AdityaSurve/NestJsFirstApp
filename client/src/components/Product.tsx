interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: string;
  onDelete: () => void;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  description,
  price,
  onDelete,
}) => {
  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete();
      } else {
        console.log("Failed to delete product");
      }
    } catch (error) {
      console.log("Failed to delete product");
    }
  };

  return (
    <div className="flex relative bg-gray-300 px-6 py-2 rounded-lg w-64 flex-col gap-3">
      <div
        className="absolute bottom-2 right-5 cursor-pointer"
        onClick={() => {
          handleDeleteProduct();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash3"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
        </svg>
      </div>
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">{name}</h1>
        <p className="text-sm text-gray-700 font-semibold">{price}</p>
      </div>
      <p className="text-sm text-gray-500 italic">{description}</p>
    </div>
  );
};

export default Product;
