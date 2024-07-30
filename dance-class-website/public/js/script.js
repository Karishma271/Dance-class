function loadGoogleMapsAPI(callback) {
    const script = document.createElement('script');
    const mapApiKey = document.getElementById('map-container').getAttribute('data-api-key');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=${callback}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onerror = function() {
        console.error('Google Maps API failed to load');
    };
    document.body.appendChild(script);
}

function initMap() {
    const map = new google.maps.Map(document.getElementById('map-container'), {
        center: { lat: 43.82595886205766, lng: -79.53913318308567 },
        zoom: 15
    });

    displayNearbyDanceStudios(map);
}

function displayNearbyDanceStudios(map) {
    const request = {
        location: { lat: 43.82595886205766, lng: -79.53913318308567 },
        radius: 2000,
        type: 'gym', // Use 'gym' as 'DanceStudio' might not be recognized
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                const place = results[i];
                const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                    label: {
                        text: place.name,
                        color: 'black',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }
                });
                google.maps.event.addListener(marker, 'click', function() {
                    window.location.href = `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.place_id}`;
                });
            }
        } else {
            console.error('Error fetching nearby dance studios:', status);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        loadGoogleMapsAPI('initMap');
    }
});
