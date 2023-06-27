import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Product from "./components/Product";

export default function App() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [showAddBox, setShowAddBox] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      name: name,
      description: desc,
      price: price,
    };
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Product added successfully");
          getProducts();
        } else {
          toast.error("Failed to add product");
        }
      })
      .catch(() => {
        toast.error("Failed to add product");
      });
    setName("");
    setDesc("");
    setPrice("");
    setShowAddBox(false);
  };

  const getProducts = async () => {
    console.log("getProducts");
    const products = await fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    setProducts(products);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Product deleted successfully");
        getProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };
  return (
    <div className="w-full h-screen py-8 overflow-x-hidden">
      {showAddBox && (
        <div className="fixed top-0 left-0 z-40 h-screen w-full bg-[#12121230] backdrop-blur-md flex justify-center items-center">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="bg-gray-200 relative h-1/2 flex flex-col justify-center items-center p-5 gap-3 w-80 rounded-lg"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white rounded-lg px-5 py-2"
              placeholder="Product Name"
            />
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-white rounded-lg px-5 py-2"
              placeholder="Product Description"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-white rounded-lg px-5 py-2"
              placeholder="Product Price"
            />
            <button
              type="submit"
              className="bg-sky-600 mt-10 cursor-pointer rounded-lg px-4 py-2 text-white"
            >
              Add Product
            </button>
            <div
              onClick={() => setShowAddBox(false)}
              className="absolute top-5 right-5 rounded-full p-2 hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </div>
          </form>
        </div>
      )}
      <div className="h-screen w-full px-16 flex flex-col gap-20 bg-white">
        <div className="text-gray-700 text-3xl px-10 font-bold flex justify-between items-center">
          <div>PRODUCTS</div>
          <div
            onClick={() => setShowAddBox(true)}
            className="text-base flex gap-1 border-2 border-gray-700 px-2 py-2 rounded-full items-center hover:bg-gray-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-plus-circle bg-white rounded-full"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span>Add product</span>
          </div>
        </div>
        <div className="w-full h-[70%]">
          {products.length === 0 ? (
            <div className="text-gray-700 text-xl px-10 h-full w-full font-bold flex justify-center items-center">
              <div>No Products</div>
            </div>
          ) : (
            <div className="grid grid-cols-4 overflow-y-auto gap-10">
              {products.map((product: any) => (
                <Product
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  onDelete={() => handleDeleteProduct(product._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
