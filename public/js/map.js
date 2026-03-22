    // Leaflet uses [latitude, longitude], while GeoJSON stores [longitude, latitude]
    let lat = 23.5880;
    let lng = 72.3693;

    if (Array.isArray(coordinates) && coordinates.length === 2 && !isNaN(coordinates[0])) {
        lng = coordinates[0]; // GeoJSON: [longitude, latitude]
        lat = coordinates[1];
    }

    // Initialize map
    const map = L.map('map').setView([lat, lng], 10);

    // Add OpenStreetMap tiles (FREE)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add Marker with Popup (opens on click)
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`
            <div class="map-popup" style="font-family: 'Poppins', sans-serif;">
                <h5 style="margin: 0; font-weight: 700; color: #222; font-size: 1.1rem;">${listingLocation}</h5>
                <p style="margin: 5px 0 0 0; color: #555; font-size: 0.9rem;">Exact Location provided after booking</p>
            </div>
        `);

    // Disable scroll zoom (same as Mapbox)
    map.scrollWheelZoom.disable();
