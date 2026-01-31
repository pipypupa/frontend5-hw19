import { useEffect, useReducer, useCallback } from "react";

const PER_PAGE = 12;

const initialState = {
  query: "",
  images: [],
  page: 1,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload, page: 1, images: [] };
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        images: state.page === 1 ? action.payload : [...state.images, ...action.payload],
        loading: false,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
}

export const usePixabay = (apiKey) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchImages = useCallback(async () => {
    if (!state.query) return;

    dispatch({ type: "FETCH_START" });

    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${encodeURIComponent(
          state.query
        )}&page=${state.page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );
      const data = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data.hits });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, [state.query, state.page, apiKey]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const setQuery = (query) => dispatch({ type: "SET_QUERY", payload: query });
  const nextPage = () => dispatch({ type: "NEXT_PAGE" });

  return { ...state, setQuery, nextPage };
};
