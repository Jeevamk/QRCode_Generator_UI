
import { useState } from "react";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      console.log("No image selected.");
      return;
    }
    // Handle image upload here
    console.log("Image selected:", selectedImage);
    // Clear selected image
    setSelectedImage(null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-4 py-8 bg-white rounded-md shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-4">Image Upload</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600"
          >
            Upload Image
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImageUpload;
