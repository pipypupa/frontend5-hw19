import { useState, useEffect, useCallback } from "react";

const PER_PAGE = 12;

export const usePixabay = (apiKey) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${encodeURIComponent(
          query
        )}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );

      if (!response.ok) throw new Error(`Pixabay API error: ${response.status}`);

      const data = await response.json();

      setImages((prev) => (page === 1 ? data.hits : [...prev, ...data.hits]));
      setTotalHits(data.totalHits);
    } catch (err) {
      setError("Помилка завантаження зображень");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, page, apiKey]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const searchImages = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  const loadMore = () => setPage((prev) => prev + 1);

  return {
    images,
    loading,
    error,
    totalHits,
    searchImages,
    loadMore,
  };
};
