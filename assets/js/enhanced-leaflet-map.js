/**
 * Enhanced Leaflet Map for Jocelyne Saab Theme
 * Improved error handling, fallbacks, and functionality
 * Author: Enhanced by AI Assistant
 * Date: 2025-01-27
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // Configuration
    const MAP_CONFIG = {
        defaultCenter: [34.0, 18.0], // Mediterranean region
        defaultZoom: 2,
        minZoom: 1,
        maxZoom: 18,
        tileOpacity: 0.95,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
        attribution: '© OpenStreetMap contributors'
    };

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initEnhancedMap();
    });

    /**
     * Initialize the enhanced map
     */
    function initEnhancedMap() {
        console.log('Initializing enhanced Leaflet map...');
        
        const mapContainer = document.getElementById('leaflet-map');
        if (!mapContainer) {
            console.warn('Map container not found');
            return;
        }

        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.warn('Leaflet library not loaded, showing fallback');
            showMapFallback(mapContainer);
            return;
        }

        // Initialize map with error handling
        try {
            const map = createMap(mapContainer);
            if (map) {
                addTileLayer(map);
                addScreeningMarkers(map);
                addMapControls(map);
                setupMapEvents(map);
                console.log('Map initialized successfully');
            }
        } catch (error) {
            console.error('Error initializing map:', error);
            showMapFallback(mapContainer);
        }
    }

    /**
     * Create the map instance
     */
    function createMap(container) {
        try {
            const map = L.map(container, {
                scrollWheelZoom: MAP_CONFIG.scrollWheelZoom,
                zoomControl: MAP_CONFIG.zoomControl,
                attributionControl: MAP_CONFIG.attributionControl,
                preferCanvas: true, // Better performance
                worldCopyJump: true, // Handle world wrapping
                maxBounds: [[-90, -180], [90, 180]], // Prevent infinite panning
                maxBoundsViscosity: 1.0
            }).setView(MAP_CONFIG.defaultCenter, MAP_CONFIG.defaultZoom);

            // Add loading indicator
            container.classList.add('map-loading');
            
            return map;
        } catch (error) {
            console.error('Error creating map:', error);
            return null;
        }
    }

    /**
     * Add tile layer to the map
     */
    function addTileLayer(map) {
        try {
            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                minZoom: MAP_CONFIG.minZoom,
                maxZoom: MAP_CONFIG.maxZoom,
                opacity: MAP_CONFIG.tileOpacity,
                attribution: MAP_CONFIG.attribution,
                errorTileUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSIjOWNhM2FmIj5NYXAgVGlsZSBOb3QgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='
            });

            tileLayer.addTo(map);

            // Remove loading indicator when tiles load
            tileLayer.on('load', function() {
                const container = map.getContainer();
                container.classList.remove('map-loading');
            });

            return tileLayer;
        } catch (error) {
            console.error('Error adding tile layer:', error);
            return null;
        }
    }

    /**
     * Add screening location markers
     */
    function addScreeningMarkers(map) {
        const locations = getScreeningLocations();
        
        if (!locations || locations.length === 0) {
            console.warn('No screening locations found');
            addSampleMarkers(map);
            return;
        }

        console.log(`Adding ${locations.length} screening markers`);
        
        const markers = [];
        const markerIcon = createCustomMarkerIcon();

        locations.forEach((location, index) => {
            try {
                if (!isValidLocation(location)) {
                    console.warn('Invalid location data:', location);
                    return;
                }

                const marker = L.marker([location.lat, location.lng], { 
                    icon: markerIcon,
                    title: location.title || 'Screening Location',
                    alt: location.title || 'Screening Location'
                }).addTo(map);

                // Create popup content
                const popupContent = createPopupContent(location);
                marker.bindPopup(popupContent, {
                    maxWidth: 300,
                    className: 'custom-popup'
                });

                // Add click handler
                marker.on('click', function() {
                    if (location.permalink) {
                        // Add a small delay to allow popup to show
                        setTimeout(() => {
                            window.open(location.permalink, '_blank', 'noopener,noreferrer');
                        }, 100);
                    }
                });

                markers.push(marker);
            } catch (error) {
                console.error(`Error adding marker ${index}:`, error);
            }
        });

        // Fit map to show all markers if we have any
        if (markers.length > 0) {
            try {
                const group = new L.featureGroup(markers);
                map.fitBounds(group.getBounds().pad(0.1));
            } catch (error) {
                console.warn('Could not fit bounds to markers:', error);
            }
        }
    }

    /**
     * Get screening locations from various sources
     */
    function getScreeningLocations() {
        // Try multiple sources for screening locations
        if (window.saabScreeningLocations && Array.isArray(window.saabScreeningLocations)) {
            return window.saabScreeningLocations;
        }
        
        if (window.screeningLocations && Array.isArray(window.screeningLocations)) {
            return window.screeningLocations;
        }
        
        // Try to get from a global variable that might be set by WordPress
        if (window.saabMapData && window.saabMapData.locations) {
            return window.saabMapData.locations;
        }
        
        return null;
    }

    /**
     * Validate location data
     */
    function isValidLocation(location) {
        return location && 
               typeof location.lat === 'number' && 
               typeof location.lng === 'number' &&
               !isNaN(location.lat) && 
               !isNaN(location.lng) &&
               location.lat >= -90 && location.lat <= 90 &&
               location.lng >= -180 && location.lng <= 180;
    }

    /**
     * Create custom marker icon
     */
    function createCustomMarkerIcon() {
        return L.divIcon({
            className: 'custom-leaflet-marker',
            html: `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
                    </filter>
                </defs>
                <path d="M16 41C16 41 28 27.5 28 16C28 8.26801 21.732 2 14 2C6.26801 2 0 8.26801 0 16C0 27.5 16 41 16 41Z" fill="#FFD700" stroke="#FFA500" stroke-width="2" filter="url(#shadow)"/>
                <circle cx="16" cy="16" r="8" fill="#FFA500"/>
                <circle cx="16" cy="16" r="4" fill="#FFFFFF"/>
            </svg>`,
            iconSize: [32, 42],
            iconAnchor: [16, 42],
            popupAnchor: [0, -36]
        });
    }

    /**
     * Create popup content for a location
     */
    function createPopupContent(location) {
        const title = location.title || 'Screening Location';
        const description = location.description || '';
        const date = location.date || '';
        const venue = location.venue || '';
        const permalink = location.permalink || '';

        let content = `<div class="map-popup-content">`;
        content += `<h3 class="popup-title">${escapeHtml(title)}</h3>`;
        
        if (venue) {
            content += `<p class="popup-venue"><strong>Venue:</strong> ${escapeHtml(venue)}</p>`;
        }
        
        if (date) {
            content += `<p class="popup-date"><strong>Date:</strong> ${escapeHtml(date)}</p>`;
        }
        
        if (description) {
            content += `<p class="popup-description">${escapeHtml(description)}</p>`;
        }
        
        if (permalink) {
            content += `<p class="popup-link"><a href="${escapeHtml(permalink)}" target="_blank" rel="noopener noreferrer">View Details</a></p>`;
        }
        
        content += `</div>`;
        
        return content;
    }

    /**
     * Add sample markers for demonstration
     */
    function addSampleMarkers(map) {
        console.log('Adding sample markers for demonstration');
        
        const sampleLocations = [
            { lat: 33.8938, lng: 35.5018, title: 'Beirut, Lebanon', description: 'Film screening in Beirut' },
            { lat: 48.8566, lng: 2.3522, title: 'Paris, France', description: 'International film festival' },
            { lat: 40.7128, lng: -74.0060, title: 'New York, USA', description: 'Documentary showcase' },
            { lat: 51.5074, lng: -0.1278, title: 'London, UK', description: 'Cultural center screening' },
            { lat: 52.5200, lng: 13.4050, title: 'Berlin, Germany', description: 'Art house cinema' }
        ];

        const markerIcon = createCustomMarkerIcon();
        
        sampleLocations.forEach(location => {
            const marker = L.marker([location.lat, location.lng], { 
                icon: markerIcon,
                title: location.title
            }).addTo(map);
            
            const popupContent = createPopupContent(location);
            marker.bindPopup(popupContent);
        });
    }

    /**
     * Add additional map controls
     */
    function addMapControls(map) {
        try {
            // Add fullscreen control if available
            if (L.Control && L.Control.Fullscreen) {
                map.addControl(new L.Control.Fullscreen());
            }

            // Add scale control
            L.control.scale({
                position: 'bottomleft',
                metric: true,
                imperial: false
            }).addTo(map);

            // Add custom reset view control
            const resetControl = L.control({ position: 'topleft' });
            resetControl.onAdd = function() {
                const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                div.innerHTML = '<a href="#" title="Reset View" role="button" aria-label="Reset map view">🏠</a>';
                div.style.backgroundColor = 'white';
                div.style.width = '30px';
                div.style.height = '30px';
                div.style.lineHeight = '30px';
                div.style.textAlign = 'center';
                div.style.textDecoration = 'none';
                div.style.color = 'black';
                
                div.onclick = function(e) {
                    e.preventDefault();
                    map.setView(MAP_CONFIG.defaultCenter, MAP_CONFIG.defaultZoom);
                };
                
                return div;
            };
            resetControl.addTo(map);

        } catch (error) {
            console.warn('Error adding map controls:', error);
        }
    }

    /**
     * Setup map event handlers
     */
    function setupMapEvents(map) {
        try {
            // Handle map load errors
            map.on('tileerror', function(e) {
                console.warn('Tile load error:', e);
            });

            // Handle zoom events
            map.on('zoomend', function() {
                const zoom = map.getZoom();
                console.log('Map zoom level:', zoom);
            });

            // Handle map ready
            map.whenReady(function() {
                console.log('Map is ready');
                const container = map.getContainer();
                container.classList.add('map-ready');
                container.classList.remove('map-loading');
            });

            // Handle resize
            window.addEventListener('resize', function() {
                setTimeout(function() {
                    map.invalidateSize();
                }, 100);
            });

        } catch (error) {
            console.warn('Error setting up map events:', error);
        }
    }

    /**
     * Show fallback when map cannot be loaded
     */
    function showMapFallback(container) {
        console.log('Showing map fallback');
        
        container.innerHTML = `
            <div class="map-fallback">
                <div class="map-fallback-content">
                    <h3>Screening Locations</h3>
                    <p>Interactive map is currently unavailable.</p>
                    <p>Our screenings take place in various locations around the world.</p>
                    <div class="map-fallback-actions">
                        <button onclick="location.reload()" class="btn btn-primary">Retry Loading Map</button>
                    </div>
                </div>
            </div>
        `;
        
        container.classList.add('map-fallback-active');
    }

    /**
     * Utility function to escape HTML
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Expose functions for debugging
    window.saabMap = {
        initEnhancedMap,
        getScreeningLocations,
        showMapFallback
    };

})();

