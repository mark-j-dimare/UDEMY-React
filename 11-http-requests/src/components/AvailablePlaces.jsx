import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  // loading state
  const [isFetching, setIsFetching] = useState(false);
  // data
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // potential error state
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      try {
        const response = await fetch('http://locanlhost:3000/places');
        const resData = await response.json();

        if (!response.ok) { // 400, 500 error
          const throwError = new Error('Failed to fetch places data.');
          throw throwError;
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError(error);
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorPage title="An Error Occurred" message={error.message} />
    )
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
