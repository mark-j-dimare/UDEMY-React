export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) { // 400, 500 error
        const throwError = new Error('Failed to fetch places data.');
        throw throwError;
    }
    return resData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({ places: places }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();

    if (!response.ok) { // 400, 500 error
        const throwError = new Error('Failed to update user data.');
        throw throwError;
    }
    return resData.message;
}