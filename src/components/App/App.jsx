import { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from "../../unsplashAPI";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getImages = useCallback(async (searchQuery, pageNumber) => {
    if (!searchQuery) return;

    setIsLoading(true);
    setError(null);

    try {
      const newImages = await fetchImages(searchQuery, pageNumber);
      if (newImages.length === 0) {
        toast.error("No images found. Try a different search!");
        return;
      }

      setImages((prev) =>
        pageNumber === 1 ? newImages : [...prev, ...newImages]
      );

      if (pageNumber === 1) {
        toast.success(`Found ${newImages.length} images!`);
      }
    } catch (error) {
      console.log("Error caught:", error);
      setError("Something went wrong. Try again!");
      toast.error("Failed to fetch images. Please try again!");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getImages(query, page);
  }, [query, page, getImages]);

  const handleSearch = (newQuery, resetForm) => {
    const trimmedQuery = newQuery.trim();
    if (!trimmedQuery) {
      toast.error("Please enter a search term!");
      return;
    }

    if (query === trimmedQuery) {
      toast("You are already viewing results for this search!");
      return;
    }

    setQuery(trimmedQuery);
    setImages([]);
    setPage(1);
    resetForm();
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);
  const handleImageClick = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}
