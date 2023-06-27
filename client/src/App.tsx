import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

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
          console.log("Product added successfully");
        } else {
          console.error("Failed to add product");
        }
      })
      .catch((error) => {
        console.error("Error occurred while adding product", error);
      });
    setName("");
    setDesc("");
    setPrice("");
  };

  return (
    <div className="h-screen w-screen bg-gray-200 text-black flex justify-center items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-3"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white border-2 border-black"
          placeholder="Product Name"
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="bg-white border-2 border-black"
          placeholder="Product Description"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="bg-white border-2 border-black"
          placeholder="Product Price"
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
