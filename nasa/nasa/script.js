// WeatherWise - NASA Space App Challenge
// JavaScript for Weather Activity Analyzer
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jyfkkmufpnzulyspqkwb.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
class WeatherWise {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupDefaultValues();
    }

    init() {
        // Initialize all components
        this.locationDetection = new LocationDetectionService();
        this.weatherAnalyzer = new WeatherAnalysisService();
        this.activityRecommender = new ActivityRecommendationService();
        this.nearbyLocations = new NearbyLocationService();
        
        // DOM elements
        this.elements = {
            form: document.getElementById('weatherForm'),
            findNearbyBtn: document.getElementById('findNearbyBtn'),
            weatherResults: document.getElementById('weatherResults'),
            recommendedActivities: document.getElementById('recommendedActivities'),
            nearbyLocations: document.getElementById('nearbyLocations'),
            loadingOverlay: document.getElementById('loadingOverlay')
        };

        // Activity data
        this.activities = {
            hiking: {
                name: 'Hiking',
                icon: 'fas fa-hiking',
                optimalConditions: {
                    temperature: { min: 10, max: 25 },
                    windSpeed: { max: 30 },
                    precipitation: { max: 20 },
                    humidity: { max: 80 }
                },
                description: 'Perfect for mountain trails and nature walks'
            },
            camping: {
                name: 'Camping',
                icon: 'fas fa-campground',
                optimalConditions: {
                    temperature: { min: 5, max: 30 },
                    windSpeed: { max: 40 },
                    precipitation: { max: 10 },
                    humidity: { max: 85 }
                },
                description: 'Ideal for overnight outdoor adventures'
            },
            fishing: {
                name: 'Fishing',
                icon: 'fas fa-fish',
                optimalConditions: {
                    temperature: { min: 15, max: 30 },
                    windSpeed: { max: 25 },
                    precipitation: { max: 30 },
                    humidity: { max: 90 }
                },
                description: 'Great for lakes, rivers, and coastal areas'
            },
            cycling: {
                name: 'Cycling',
                icon: 'fas fa-bicycle',
                optimalConditions: {
                    temperature: { min: 10, max: 35 },
                    windSpeed: { max: 35 },
                    precipitation: { max: 15 },
                    humidity: { max: 85 }
                },
                description: 'Perfect for road and trail cycling'
            },
            picnic: {
                name: 'Picnic',
                icon: 'fas fa-utensils',
                optimalConditions: {
                    temperature: { min: 15, max: 30 },
                    windSpeed: { max: 20 },
                    precipitation: { max: 10 },
                    humidity: { max: 75 }
                },
                description: 'Enjoy outdoor dining and relaxation'
            },
            beach: {
                name: 'Beach Day',
                icon: 'fas fa-umbrella-beach',
                optimalConditions: {
                    temperature: { min: 20, max: 35 },
                    windSpeed: { max: 30 },
                    precipitation: { max: 5 },
                    humidity: { max: 80 }
                },
                description: 'Perfect for coastal activities and sunbathing'
            },
            photography: {
                name: 'Photography',
                icon: 'fas fa-camera',
                optimalConditions: {
                    temperature: { min: 5, max: 30 },
                    windSpeed: { max: 25 },
                    precipitation: { max: 20 },
                    humidity: { max: 85 }
                },
                description: 'Capture nature\'s beauty in optimal conditions'
            },
            stargazing: {
                name: 'Stargazing',
                icon: 'fas fa-star',
                optimalConditions: {
                    temperature: { min: 0, max: 25 },
                    windSpeed: { max: 20 },
                    precipitation: { max: 5 },
                    humidity: { max: 70 }
                },
                description: 'Observe the night sky in clear conditions'
            }
        };

        // Mock location data for nearby locations with detailed information
        this.mockLocations = {
            hiking: [
                { 
                    name: 'Mountain Trail Park', 
                    distance: 2.3, 
                    rating: 4.8, 
                    type: 'Trail',
                    coordinates: { lat: 40.7128, lng: -74.0060 },
                    details: {
                        description: 'A beautiful mountain trail park featuring scenic views, well-maintained paths, and diverse wildlife. Perfect for both beginners and experienced hikers.',
                        features: ['Scenic Views', 'Wildlife Spotting', 'Picnic Areas', 'Parking Available', 'Restrooms'],
                        difficulty: 'Moderate',
                        duration: '2-4 hours',
                        bestTime: 'Early morning or late afternoon',
                        tips: 'Bring water, wear comfortable hiking boots, and check weather conditions before heading out.',
                        facilities: ['Parking', 'Restrooms', 'Picnic Tables', 'Trail Maps', 'Emergency Phone']
                    }
                },
                { 
                    name: 'Nature Reserve', 
                    distance: 5.1, 
                    rating: 4.6, 
                    type: 'Park',
                    coordinates: { lat: 40.7589, lng: -73.9851 },
                    details: {
                        description: 'A protected nature reserve with pristine wilderness, rare bird species, and educational trails.',
                        features: ['Bird Watching', 'Educational Trails', 'Wildlife Photography', 'Nature Center'],
                        difficulty: 'Easy to Moderate',
                        duration: '1-3 hours',
                        bestTime: 'Morning for bird watching',
                        tips: 'Bring binoculars for bird watching and stay on marked trails.',
                        facilities: ['Nature Center', 'Parking', 'Trail Maps', 'Guided Tours']
                    }
                },
                { 
                    name: 'Forest Path', 
                    distance: 8.7, 
                    rating: 4.5, 
                    type: 'Trail',
                    coordinates: { lat: 40.6892, lng: -74.0445 },
                    details: {
                        description: 'A challenging forest trail through dense woodland with natural obstacles and stunning canopy views.',
                        features: ['Forest Canopy', 'Natural Obstacles', 'Wildlife', 'Photography Spots'],
                        difficulty: 'Challenging',
                        duration: '3-5 hours',
                        bestTime: 'All day',
                        tips: 'Wear sturdy boots and bring a map. Trail can be muddy after rain.',
                        facilities: ['Trail Head Parking', 'Trail Markers', 'Emergency Contact Info']
                    }
                }
            ],
            camping: [
                { 
                    name: 'Riverside Campground', 
                    distance: 12.4, 
                    rating: 4.7, 
                    type: 'Campground',
                    coordinates: { lat: 40.7505, lng: -73.9934 },
                    details: {
                        description: 'A family-friendly campground along a peaceful river with modern amenities and beautiful natural surroundings.',
                        features: ['River Access', 'Fire Pits', 'Modern Bathrooms', 'RV Hookups', 'Playground'],
                        difficulty: 'Easy',
                        duration: 'Overnight',
                        bestTime: 'Spring through Fall',
                        tips: 'Book in advance during peak season. Bring fishing gear for river fishing.',
                        facilities: ['RV Hookups', 'Bathrooms', 'Showers', 'Laundry', 'Store', 'Playground']
                    }
                },
                { 
                    name: 'Mountain View RV Park', 
                    distance: 18.2, 
                    rating: 4.4, 
                    type: 'RV Park',
                    coordinates: { lat: 40.6782, lng: -73.9442 },
                    details: {
                        description: 'A premium RV park with stunning mountain views, full hookups, and recreational facilities.',
                        features: ['Mountain Views', 'Full Hookups', 'WiFi', 'Pool', 'Laundry'],
                        difficulty: 'Easy',
                        duration: 'Extended stay',
                        bestTime: 'Year-round',
                        tips: 'Reserve early for peak season. Great for families with children.',
                        facilities: ['Full Hookups', 'WiFi', 'Pool', 'Laundry', 'Store', 'Recreation Room']
                    }
                },
                { 
                    name: 'Wilderness Camp', 
                    distance: 25.8, 
                    rating: 4.9, 
                    type: 'Wilderness',
                    coordinates: { lat: 40.6892, lng: -74.1745 },
                    details: {
                        description: 'A primitive wilderness camping experience for experienced campers seeking solitude and adventure.',
                        features: ['Primitive Camping', 'Wilderness Experience', 'Hiking Access', 'Wildlife'],
                        difficulty: 'Advanced',
                        duration: 'Multi-day',
                        bestTime: 'Late Spring to Early Fall',
                        tips: 'Requires wilderness permit. Bring all necessary supplies and emergency equipment.',
                        facilities: ['Primitive Sites', 'Water Source', 'Bear Boxes', 'Trail Access']
                    }
                }
            ],
            fishing: [
                { 
                    name: 'Crystal Lake', 
                    distance: 3.2, 
                    rating: 4.6, 
                    type: 'Lake',
                    coordinates: { lat: 40.7614, lng: -73.9776 },
                    details: {
                        description: 'A pristine mountain lake known for its crystal-clear waters and excellent trout fishing.',
                        features: ['Trout Fishing', 'Boat Rentals', 'Scenic Views', 'Fishing Pier'],
                        difficulty: 'Easy to Moderate',
                        duration: 'Half day to full day',
                        bestTime: 'Early morning or evening',
                        tips: 'Fishing license required. Best fishing is in spring and fall.',
                        facilities: ['Boat Rentals', 'Fishing Pier', 'Bait Shop', 'Parking', 'Restrooms']
                    }
                },
                { 
                    name: 'River Bend', 
                    distance: 7.8, 
                    rating: 4.3, 
                    type: 'River',
                    coordinates: { lat: 40.7505, lng: -73.9934 },
                    details: {
                        description: 'A peaceful river spot perfect for fly fishing and enjoying nature.',
                        features: ['Fly Fishing', 'River Access', 'Scenic Views', 'Wildlife'],
                        difficulty: 'Moderate',
                        duration: 'Half day',
                        bestTime: 'Early morning',
                        tips: 'Bring waders and fly fishing gear. Check water levels before going.',
                        facilities: ['River Access', 'Parking', 'Trail to River']
                    }
                },
                { 
                    name: 'Coastal Pier', 
                    distance: 15.1, 
                    rating: 4.7, 
                    type: 'Coast',
                    coordinates: { lat: 40.6892, lng: -73.9442 },
                    details: {
                        description: 'A popular fishing pier with easy access to deep water fishing and beautiful ocean views.',
                        features: ['Deep Water Fishing', 'Pier Access', 'Ocean Views', 'Bait Shop'],
                        difficulty: 'Easy',
                        duration: 'Half day to full day',
                        bestTime: 'Early morning or evening',
                        tips: 'Tide charts recommended. Bring warm clothing as it can be windy.',
                        facilities: ['Fishing Pier', 'Bait Shop', 'Parking', 'Restrooms', 'Snack Bar']
                    }
                }
            ],
            cycling: [
                { 
                    name: 'City Bike Trail', 
                    distance: 1.5, 
                    rating: 4.5, 
                    type: 'Trail',
                    coordinates: { lat: 40.7589, lng: -73.9851 },
                    details: {
                        description: 'A well-maintained urban bike trail perfect for casual cycling and commuting.',
                        features: ['Paved Path', 'City Views', 'Bike Lanes', 'Rest Stops'],
                        difficulty: 'Easy',
                        duration: '30 minutes to 2 hours',
                        bestTime: 'All day',
                        tips: 'Watch for pedestrians. Great for families with children.',
                        facilities: ['Bike Racks', 'Water Fountains', 'Rest Areas', 'Trail Maps']
                    }
                },
                { 
                    name: 'Country Road Route', 
                    distance: 4.3, 
                    rating: 4.4, 
                    type: 'Road',
                    coordinates: { lat: 40.6782, lng: -73.9442 },
                    details: {
                        description: 'A scenic country road route with rolling hills and beautiful countryside views.',
                        features: ['Scenic Views', 'Rolling Hills', 'Low Traffic', 'Countryside'],
                        difficulty: 'Moderate',
                        duration: '1-3 hours',
                        bestTime: 'Morning or evening',
                        tips: 'Wear bright clothing. Watch for farm vehicles.',
                        facilities: ['Roadside Parking', 'Rest Areas']
                    }
                },
                { 
                    name: 'Mountain Bike Park', 
                    distance: 11.2, 
                    rating: 4.8, 
                    type: 'Park',
                    coordinates: { lat: 40.6892, lng: -74.1745 },
                    details: {
                        description: 'A challenging mountain bike park with technical trails and jumps for experienced riders.',
                        features: ['Technical Trails', 'Jumps', 'Downhill Sections', 'Skills Area'],
                        difficulty: 'Advanced',
                        duration: '2-4 hours',
                        bestTime: 'All day',
                        tips: 'Wear full protective gear. Not suitable for beginners.',
                        facilities: ['Trail Head', 'Parking', 'Skills Area', 'Bike Wash']
                    }
                }
            ],
            picnic: [
                { 
                    name: 'Central Park', 
                    distance: 0.8, 
                    rating: 4.7, 
                    type: 'Park',
                    coordinates: { lat: 40.7829, lng: -73.9654 },
                    details: {
                        description: 'A beautiful central park with open green spaces, playgrounds, and picnic areas.',
                        features: ['Open Green Spaces', 'Playgrounds', 'Picnic Tables', 'Walking Paths'],
                        difficulty: 'Easy',
                        duration: '1-4 hours',
                        bestTime: 'All day',
                        tips: 'Popular on weekends. Arrive early for best spots.',
                        facilities: ['Picnic Tables', 'Playgrounds', 'Restrooms', 'Parking', 'Walking Paths']
                    }
                },
                { 
                    name: 'Lakeside Gardens', 
                    distance: 2.1, 
                    rating: 4.6, 
                    type: 'Garden',
                    coordinates: { lat: 40.7505, lng: -73.9934 },
                    details: {
                        description: 'A peaceful lakeside garden with beautiful flower displays and serene water views.',
                        features: ['Flower Gardens', 'Lake Views', 'Peaceful Atmosphere', 'Walking Paths'],
                        difficulty: 'Easy',
                        duration: '1-3 hours',
                        bestTime: 'Spring and summer',
                        tips: 'Perfect for romantic picnics. Bring a camera for photos.',
                        facilities: ['Garden Paths', 'Benches', 'Parking', 'Restrooms']
                    }
                },
                { 
                    name: 'Botanical Reserve', 
                    distance: 6.4, 
                    rating: 4.8, 
                    type: 'Reserve',
                    coordinates: { lat: 40.6782, lng: -73.9442 },
                    details: {
                        description: 'A botanical reserve featuring rare plants, educational displays, and peaceful picnic areas.',
                        features: ['Rare Plants', 'Educational Displays', 'Nature Trails', 'Quiet Atmosphere'],
                        difficulty: 'Easy',
                        duration: '2-4 hours',
                        bestTime: 'All day',
                        tips: 'Great for learning about local flora. Bring a field guide.',
                        facilities: ['Visitor Center', 'Educational Displays', 'Nature Trails', 'Parking']
                    }
                }
            ],
            beach: [
                { 
                    name: 'Sunset Beach', 
                    distance: 5.7, 
                    rating: 4.9, 
                    type: 'Beach',
                    coordinates: { lat: 40.6892, lng: -73.9442 },
                    details: {
                        description: 'A pristine beach known for its spectacular sunsets and clean, sandy shores.',
                        features: ['Sandy Beach', 'Sunset Views', 'Swimming', 'Beach Volleyball'],
                        difficulty: 'Easy',
                        duration: 'Half day to full day',
                        bestTime: 'Summer months',
                        tips: 'Bring sunscreen and beach chairs. Great for families.',
                        facilities: ['Beach Chairs', 'Umbrellas', 'Restrooms', 'Snack Bar', 'Parking']
                    }
                },
                { 
                    name: 'Crystal Cove', 
                    distance: 12.3, 
                    rating: 4.6, 
                    type: 'Cove',
                    coordinates: { lat: 40.7505, lng: -73.9934 },
                    details: {
                        description: 'A sheltered cove with calm waters, perfect for swimming and water activities.',
                        features: ['Calm Waters', 'Swimming', 'Snorkeling', 'Rock Formations'],
                        difficulty: 'Easy',
                        duration: 'Half day to full day',
                        bestTime: 'All day',
                        tips: 'Great for snorkeling. Bring underwater camera.',
                        facilities: ['Beach Access', 'Parking', 'Restrooms', 'Snorkel Rental']
                    }
                },
                { 
                    name: 'Paradise Bay', 
                    distance: 18.9, 
                    rating: 4.8, 
                    type: 'Bay',
                    coordinates: { lat: 40.6782, lng: -73.9442 },
                    details: {
                        description: 'A beautiful bay with turquoise waters and excellent conditions for water sports.',
                        features: ['Turquoise Waters', 'Water Sports', 'Boat Rentals', 'Scenic Views'],
                        difficulty: 'Easy to Moderate',
                        duration: 'Full day',
                        bestTime: 'All day',
                        tips: 'Perfect for water sports. Book boat rentals in advance.',
                        facilities: ['Boat Rentals', 'Water Sports Equipment', 'Restaurants', 'Parking']
                    }
                }
            ],
            photography: [
                { 
                    name: 'Sunrise Point', 
                    distance: 3.4, 
                    rating: 4.9, 
                    type: 'Viewpoint',
                    coordinates: { lat: 40.7614, lng: -73.9776 },
                    details: {
                        description: 'A spectacular viewpoint offering panoramic sunrise views and excellent photography opportunities.',
                        features: ['Sunrise Views', 'Panoramic Vistas', 'Photography Spots', 'Hiking Access'],
                        difficulty: 'Easy to Moderate',
                        duration: '1-3 hours',
                        bestTime: 'Early morning for sunrise',
                        tips: 'Arrive before dawn for best sunrise photos. Bring tripod.',
                        facilities: ['Viewing Platform', 'Parking', 'Trail Access']
                    }
                },
                { 
                    name: 'Historic District', 
                    distance: 1.2, 
                    rating: 4.5, 
                    type: 'Historic',
                    coordinates: { lat: 40.7589, lng: -73.9851 },
                    details: {
                        description: 'A charming historic district with well-preserved architecture and cultural significance.',
                        features: ['Historic Architecture', 'Cultural Sites', 'Walking Tours', 'Museums'],
                        difficulty: 'Easy',
                        duration: '2-4 hours',
                        bestTime: 'All day',
                        tips: 'Great for architectural photography. Join guided tours.',
                        facilities: ['Museums', 'Guided Tours', 'Restaurants', 'Parking']
                    }
                },
                { 
                    name: 'Waterfall Trail', 
                    distance: 9.8, 
                    rating: 4.7, 
                    type: 'Nature',
                    coordinates: { lat: 40.6892, lng: -74.1745 },
                    details: {
                        description: 'A scenic trail leading to a beautiful waterfall, perfect for nature photography.',
                        features: ['Waterfall', 'Nature Photography', 'Hiking Trail', 'Wildlife'],
                        difficulty: 'Moderate',
                        duration: '2-4 hours',
                        bestTime: 'Morning or late afternoon',
                        tips: 'Best photos after rain when waterfall is full. Bring waterproof camera bag.',
                        facilities: ['Trail Head', 'Parking', 'Trail Markers']
                    }
                }
            ],
            stargazing: [
                { 
                    name: 'Observatory Hill', 
                    distance: 14.2, 
                    rating: 4.9, 
                    type: 'Observatory',
                    coordinates: { lat: 40.7505, lng: -73.9934 },
                    details: {
                        description: 'A high-altitude location with minimal light pollution, perfect for stargazing and astronomy.',
                        features: ['Dark Sky', 'Telescope Access', 'Educational Programs', 'Panoramic Views'],
                        difficulty: 'Easy',
                        duration: '2-4 hours',
                        bestTime: 'Clear nights',
                        tips: 'Check weather conditions. Bring warm clothing and red flashlight.',
                        facilities: ['Telescope Access', 'Educational Center', 'Parking', 'Restrooms']
                    }
                },
                { 
                    name: 'Dark Sky Reserve', 
                    distance: 22.7, 
                    rating: 4.8, 
                    type: 'Reserve',
                    coordinates: { lat: 40.6782, lng: -73.9442 },
                    details: {
                        description: 'A designated dark sky reserve with exceptional stargazing conditions and minimal light pollution.',
                        features: ['Minimal Light Pollution', 'Dark Sky Designation', 'Wildlife', 'Peaceful Setting'],
                        difficulty: 'Easy',
                        duration: '2-6 hours',
                        bestTime: 'New moon nights',
                        tips: 'Best during new moon. Bring telescope or binoculars.',
                        facilities: ['Dark Sky Area', 'Parking', 'Trail Access']
                    }
                },
                { 
                    name: 'Mountain Peak', 
                    distance: 31.5, 
                    rating: 4.7, 
                    type: 'Mountain',
                    coordinates: { lat: 40.6892, lng: -74.1745 },
                    details: {
                        description: 'A high mountain peak offering unobstructed views of the night sky and spectacular stargazing.',
                        features: ['High Altitude', 'Unobstructed Views', 'Clear Skies', 'Mountain Setting'],
                        difficulty: 'Challenging',
                        duration: 'Overnight',
                        bestTime: 'Clear nights',
                        tips: 'Requires hiking experience. Bring camping gear and warm clothing.',
                        facilities: ['Trail Access', 'Primitive Camping', 'Emergency Shelter']
                    }
                }
            ]
        };
    }

    bindEvents() {
        // Form submission
        this.elements.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Find nearby locations button
        this.elements.findNearbyBtn.addEventListener('click', () => this.handleFindNearby());
        
        // Activity card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.activity-card')) {
                const activityCard = e.target.closest('.activity-card');
                const activity = activityCard.dataset.activity;
                this.selectActivity(activity);
            }
        });

        // Location filter changes
        document.getElementById('activityFilter').addEventListener('change', (e) => {
            this.filterLocations();
        });

        document.getElementById('distanceFilter').addEventListener('change', (e) => {
            this.filterLocations();
        });

        document.getElementById('findLocationsBtn').addEventListener('click', () => {
            this.handleFindLocations();
        });

        // Date preset buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('date-preset-btn')) {
                this.handleDatePreset(e.target);
            }
            
            // Date navigation buttons
            if (e.target.closest('#prevDay')) {
                this.navigateDate(-1, 'day');
            } else if (e.target.closest('#nextDay')) {
                this.navigateDate(1, 'day');
            } else if (e.target.closest('#prevWeek')) {
                this.navigateDate(-7, 'days');
            } else if (e.target.closest('#nextWeek')) {
                this.navigateDate(7, 'days');
            }
            
        // Calendar toggle button
        if (e.target.closest('#calendarToggle')) {
            this.toggleCalendar();
        }
        
        // Location card buttons
        if (e.target.closest('.directions-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const button = e.target.closest('.directions-btn');
            const locationName = button.getAttribute('data-location');
            console.log('Directions button clicked for:', locationName);
            this.openDirections(locationName);
        }
        
        if (e.target.closest('.details-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const button = e.target.closest('.details-btn');
            const locationName = button.getAttribute('data-location');
            console.log('Details button clicked for:', locationName);
            this.showLocationDetails(locationName);
        }
        
        // Modal close button
        if (e.target.closest('#closeModal')) {
            this.closeLocationModal();
        }
        
        // Close modal when clicking outside content
        if (e.target.classList.contains('location-modal')) {
            this.closeLocationModal();
        }
        });
    }

    setupDefaultValues() {
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
        
        // Set minimum date to today (can't select past dates)
        document.getElementById('date').min = today;
        
        // Set maximum date to 1 year from today
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        document.getElementById('date').max = maxDate.toISOString().split('T')[0];
    }

    handleDatePreset(button) {
        const days = parseInt(button.dataset.days);
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + days);
        
        const dateString = targetDate.toISOString().split('T')[0];
        document.getElementById('date').value = dateString;
        
        // Update active state
        document.querySelectorAll('.date-preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Show notification
        const presetText = button.textContent;
        this.showNotification(`Date set to ${presetText.toLowerCase()}`, 'success');
        
        // Remove active state after 2 seconds
        setTimeout(() => {
            button.classList.remove('active');
        }, 2000);
    }

    navigateDate(amount, type) {
        const currentDate = new Date(document.getElementById('date').value);
        const newDate = new Date(currentDate);
        
        if (type === 'day') {
            newDate.setDate(currentDate.getDate() + amount);
        } else if (type === 'days') {
            newDate.setDate(currentDate.getDate() + amount);
        }
        
        // Check if new date is within allowed range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (newDate < today) {
            this.showNotification('Cannot select a past date', 'warning');
            return;
        }
        
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        
        if (newDate > maxDate) {
            this.showNotification('Date is too far in the future', 'warning');
            return;
        }
        
        const dateString = newDate.toISOString().split('T')[0];
        document.getElementById('date').value = dateString;
        
        // Clear any active preset buttons
        document.querySelectorAll('.date-preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show notification
        const direction = amount > 0 ? 'forward' : 'backward';
        const unit = type === 'day' ? 'day' : 'week';
        this.showNotification(`Date moved ${direction} by ${Math.abs(amount)} ${unit}${Math.abs(amount) > 1 ? 's' : ''}`, 'info');
    }

    toggleCalendar() {
        const dateInput = document.getElementById('date');
        
        // Focus and show the native date picker
        dateInput.focus();
        dateInput.showPicker?.();
        
        // Show notification
        this.showNotification('Calendar opened - select your preferred date', 'info');
        
        // Add visual feedback to the toggle button
        const toggleBtn = document.getElementById('calendarToggle');
        toggleBtn.style.transform = 'translateY(-50%) scale(1.2)';
        setTimeout(() => {
            toggleBtn.style.transform = 'translateY(-50%) scale(1)';
        }, 200);
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.elements.form);
        const activity = formData.get('activity');
        const location = formData.get('location');
        const date = formData.get('date');

        if (!activity || !location || !date) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        this.showLoading();
        
        try {
            // Simulate weather analysis
            const weatherData = await this.weatherAnalyzer.analyzeWeather(location, date);
            const suitabilityScore = this.calculateSuitabilityScore(activity, weatherData);
            
            // Show weather results
            this.displayWeatherResults(weatherData, suitabilityScore, activity, location, date);
            this.generateRecommendations(weatherData, activity, suitabilityScore);
            
            // Automatically find and show nearby locations for the selected activity
            await this.autoFindNearbyLocations(activity, location);
            
            // Scroll to results
            this.elements.weatherResults.scrollIntoView({ behavior: 'smooth' });
            
            // Show success notification with location info
            this.showNotification(`Weather analyzed! Found ${this.getLocationCount(activity)} nearby ${activity} locations`, 'success');
            
        } catch (error) {
            console.error('Weather analysis error:', error);
            this.showNotification('Failed to analyze weather conditions. Please try again.', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async handleFindNearby() {
        const location = document.getElementById('location').value;
        
        if (!location) {
            this.showNotification('Please enter a location first', 'warning');
            return;
        }

        this.showLoading();
        
        try {
            // Simulate finding nearby locations
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.displayNearbyLocations();
            this.elements.nearbyLocations.style.display = 'block';
            this.elements.nearbyLocations.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Location search error:', error);
            this.showNotification('Failed to find nearby locations', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async autoFindNearbyLocations(activity, location) {
        try {
            // Simulate location search delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Set the activity filter to the selected activity
            document.getElementById('activityFilter').value = activity;
            
            // Display nearby locations for the specific activity
            this.displayNearbyLocations();
            
            // Show the nearby locations section
            this.elements.nearbyLocations.style.display = 'block';
            
            // Add auto-generated indicator
            this.addAutoGeneratedIndicator(activity);
            
            // Add a small delay before scrolling to nearby locations
            setTimeout(() => {
                this.elements.nearbyLocations.scrollIntoView({ behavior: 'smooth' });
            }, 500);
            
        } catch (error) {
            console.error('Auto location search error:', error);
            // Don't show error notification for auto search to avoid spam
        }
    }

    addAutoGeneratedIndicator(activity) {
        // Add a special indicator that this was auto-generated
        const sectionHeader = document.querySelector('#nearbyLocations .section-header');
        
        // Remove existing indicator if any
        const existingIndicator = sectionHeader.querySelector('.auto-generated-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // Create new indicator
        const indicator = document.createElement('div');
        indicator.className = 'auto-generated-indicator';
        indicator.innerHTML = `
            <i class="fas fa-magic"></i>
            <span>Auto-generated based on your ${this.activities[activity]?.name || activity} selection</span>
        `;
        
        // Add indicator after the title
        const title = sectionHeader.querySelector('h2');
        title.insertAdjacentElement('afterend', indicator);
    }

    getLocationCount(activity) {
        const locations = this.mockLocations[activity] || [];
        return locations.length;
    }

    openDirections(locationName) {
        console.log('openDirections called with:', locationName);
        
        // Find the location data
        let locationData = null;
        for (const activity in this.mockLocations) {
            const location = this.mockLocations[activity].find(loc => loc.name === locationName);
            if (location) {
                locationData = location;
                break;
            }
        }

        if (!locationData) {
            console.log('Location not found:', locationName);
            this.showNotification('Location not found', 'error');
            return;
        }

        console.log('Found location data:', locationData);

        // Get user's current location or use a default
        const userLocation = this.getUserLocation();
        const destination = `${locationData.coordinates.lat},${locationData.coordinates.lng}`;
        const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : '';

        // Create Google Maps URL
        let mapsUrl;
        if (origin) {
            mapsUrl = `https://www.google.com/maps/dir/${origin}/${destination}`;
        } else {
            mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
        }

        console.log('Opening maps URL:', mapsUrl);

        // Open in new tab
        window.open(mapsUrl, '_blank');
        
        // Show notification
        this.showNotification(`Opening directions to ${locationName}`, 'success');
    }

    getUserLocation() {
        // Try to get from location input if coordinates are stored
        const locationInput = document.getElementById('location');
        if (locationInput.dataset.latitude && locationInput.dataset.longitude) {
            return {
                lat: parseFloat(locationInput.dataset.latitude),
                lng: parseFloat(locationInput.dataset.longitude)
            };
        }
        return null;
    }

    showLocationDetails(locationName) {
        console.log('showLocationDetails called with:', locationName);
        
        // Find the location data
        let locationData = null;
        for (const activity in this.mockLocations) {
            const location = this.mockLocations[activity].find(loc => loc.name === locationName);
            if (location) {
                locationData = location;
                break;
            }
        }

        if (!locationData) {
            console.log('Location details not found:', locationName);
            this.showNotification('Location details not found', 'error');
            return;
        }

        console.log('Found location details:', locationData);

        // Update modal content
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        modalTitle.innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            ${locationData.name}
        `;

        modalContent.innerHTML = `
            <div class="location-details">
                <h4>Description</h4>
                <p>${locationData.details.description}</p>
                
                <h4>Features</h4>
                <div class="location-features">
                    ${locationData.details.features.map(feature => 
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                </div>
                
                <h4>Activity Details</h4>
                <ul>
                    <li><strong>Difficulty:</strong> ${locationData.details.difficulty}</li>
                    <li><strong>Duration:</strong> ${locationData.details.duration}</li>
                    <li><strong>Best Time:</strong> ${locationData.details.bestTime}</li>
                    <li><strong>Distance:</strong> ${locationData.distance} km away</li>
                    <li><strong>Rating:</strong> ${locationData.rating}/5 stars</li>
                </ul>
                
                <h4>Tips & Recommendations</h4>
                <p>${locationData.details.tips}</p>
                
                <h4>Facilities Available</h4>
                <ul>
                    ${locationData.details.facilities.map(facility => 
                        `<li>${facility}</li>`
                    ).join('')}
                </ul>
                
                <div style="margin-top: 2rem; text-align: center;">
                    <button class="directions-btn" onclick="weatherWise.openDirections('${locationData.name}')">
                        <i class="fas fa-directions"></i>
                        Get Directions
                    </button>
                </div>
            </div>
        `;

        // Show modal
        const modal = document.getElementById('locationModal');
        modal.classList.add('show');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeLocationModal() {
        const modal = document.getElementById('locationModal');
        modal.classList.remove('show');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    selectActivity(activity) {
        document.getElementById('activity').value = activity;
        this.showNotification(`Selected ${this.activities[activity].name}`, 'success');
    }

    displayWeatherResults(weatherData, suitabilityScore, activity, location, date) {
        // Update location display
        document.getElementById('locationDisplay').innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            ${location} - ${date}
        `;

        // Update weather values
        document.getElementById('temperature').textContent = `${weatherData.temperature}°C`;
        document.getElementById('windSpeed').textContent = `${weatherData.windSpeed} km/h`;
        document.getElementById('precipitation').textContent = `${weatherData.precipitation}%`;
        document.getElementById('humidity').textContent = `${weatherData.humidity}%`;

        // Update suitability score
        document.getElementById('suitabilityScore').textContent = suitabilityScore;
        document.getElementById('scoreDescription').textContent = this.getScoreDescription(suitabilityScore, activity);

        // Update factor bars
        this.updateFactorBars(weatherData, activity);

        // Show results section
        this.elements.weatherResults.style.display = 'block';
    }

    generateRecommendations(weatherData, activity, score) {
        const recommendationsDiv = document.getElementById('recommendationsGrid');
        const altActivitiesDiv = document.getElementById('alternativeActivities');
        
        recommendationsDiv.innerHTML = '';
        altActivitiesDiv.innerHTML = '';

        // Generate main recommendation
        const recommendation = this.createRecommendationCard(activity, score, weatherData);
        recommendationsDiv.appendChild(recommendation);

        // Generate alternative activities
        const alternatives = this.getAlternativeActivities(activity, weatherData);
        alternatives.forEach(altActivity => {
            const altDiv = document.createElement('div');
            altDiv.className = 'alt-activity';
            altDiv.innerHTML = `
                <i class="${this.activities[altActivity].icon}"></i>
                ${this.activities[altActivity].name}
            `;
            altDiv.addEventListener('click', () => this.selectActivity(altActivity));
            altActivitiesDiv.appendChild(altDiv);
        });

        // Show recommendations section
        this.elements.recommendedActivities.style.display = 'block';
    }

    createRecommendationCard(activity, score, weatherData) {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        
        const activityData = this.activities[activity];
        const scoreColor = this.getScoreColor(score);
        const scoreIcon = this.getScoreIcon(score);
        
        card.innerHTML = `
            <div class="recommendation-header">
                <div class="recommendation-icon">
                    <i class="${activityData.icon}"></i>
                </div>
                <div class="recommendation-score">
                    <span class="score-value" style="color: ${scoreColor}">${score}</span>
                    <span class="score-label">Score</span>
                </div>
            </div>
            <h3>${activityData.name}</h3>
            <p>${activityData.description}</p>
            <div class="recommendation-status">
                <i class="${scoreIcon}"></i>
                <span>${this.getScoreDescription(score, activity)}</span>
            </div>
        `;
        
        return card;
    }

    displayNearbyLocations() {
        const locationsGrid = document.getElementById('locationsGrid');
        const activityFilter = document.getElementById('activityFilter').value;
        const distanceFilter = parseFloat(document.getElementById('distanceFilter').value);
        
        locationsGrid.innerHTML = '';
        
        const activitiesToShow = activityFilter === 'all' ? Object.keys(this.activities) : [activityFilter];
        
        activitiesToShow.forEach(activity => {
            const locations = this.mockLocations[activity] || [];
            const filteredLocations = locations.filter(loc => loc.distance <= distanceFilter);
            
            filteredLocations.forEach(location => {
                const locationCard = this.createLocationCard(location, activity);
                locationsGrid.appendChild(locationCard);
            });
        });

        // Show/hide no locations message
        const noLocations = document.getElementById('noLocations');
        const hasLocations = locationsGrid.children.length > 0;
        noLocations.style.display = hasLocations ? 'none' : 'block';
        
        // Update section header for auto-generated results
        if (activityFilter !== 'all') {
            const sectionHeader = document.querySelector('#nearbyLocations .section-header p');
            const activityName = this.activities[activityFilter]?.name || activityFilter;
            sectionHeader.textContent = `Perfect ${activityName.toLowerCase()} spots near your location - automatically found based on your weather analysis`;
        }
    }

    createLocationCard(location, activity) {
        const card = document.createElement('div');
        card.className = 'location-card';
        
        const activityData = this.activities[activity];
        
        card.innerHTML = `
            <div class="location-card-header">
                <div class="location-icon">
                    <i class="${activityData.icon}"></i>
                </div>
                <div class="location-info">
                    <h3>${location.name}</h3>
                    <p class="location-type">${location.type}</p>
                </div>
                <div class="location-distance">
                    <span>${location.distance} km</span>
                </div>
            </div>
            <div class="location-card-body">
                <div class="location-rating">
                    <div class="stars">
                        ${this.generateStars(location.rating)}
                    </div>
                    <span class="rating-value">${location.rating}</span>
                </div>
                <div class="location-activity">
                    <span class="activity-tag">${activityData.name}</span>
                </div>
            </div>
            <div class="location-card-footer">
                <button type="button" class="directions-btn" data-location="${location.name}">
                    <i class="fas fa-directions"></i>
                    Get Directions
                </button>
                <button type="button" class="details-btn" data-location="${location.name}">
                    <i class="fas fa-info-circle"></i>
                    Details
                </button>
            </div>
        `;
        
        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    calculateSuitabilityScore(activity, weatherData) {
        const conditions = this.activities[activity].optimalConditions;
        let score = 100;

        // Temperature scoring
        const tempRange = conditions.temperature.max - conditions.temperature.min;
        const tempDeviation = Math.max(
            Math.abs(weatherData.temperature - conditions.temperature.min),
            Math.abs(weatherData.temperature - conditions.temperature.max)
        );
        if (weatherData.temperature < conditions.temperature.min || 
            weatherData.temperature > conditions.temperature.max) {
            score -= Math.min(30, tempDeviation * 2);
        }

        // Wind scoring
        if (weatherData.windSpeed > conditions.windSpeed.max) {
            score -= Math.min(25, (weatherData.windSpeed - conditions.windSpeed.max) * 2);
        }

        // Precipitation scoring
        if (weatherData.precipitation > conditions.precipitation.max) {
            score -= Math.min(35, (weatherData.precipitation - conditions.precipitation.max) * 3);
        }

        // Humidity scoring
        if (weatherData.humidity > conditions.humidity.max) {
            score -= Math.min(15, (weatherData.humidity - conditions.humidity.max) * 0.5);
        }

        return Math.max(0, Math.min(100, Math.round(score)));
    }

    updateFactorBars(weatherData, activity) {
        const conditions = this.activities[activity].optimalConditions;
        
        // Temperature comfort
        const tempScore = Math.max(0, 100 - Math.abs(weatherData.temperature - 20) * 3);
        document.getElementById('tempComfort').style.width = `${tempScore}%`;
        document.getElementById('tempScore').textContent = Math.round(tempScore);
        
        // Wind comfort
        const windScore = Math.max(0, 100 - (weatherData.windSpeed - 15) * 2);
        document.getElementById('windComfort').style.width = `${windScore}%`;
        document.getElementById('windScore').textContent = Math.round(windScore);
        
        // Precipitation comfort
        const precipScore = Math.max(0, 100 - weatherData.precipitation * 2);
        document.getElementById('precipComfort').style.width = `${precipScore}%`;
        document.getElementById('precipScore').textContent = Math.round(precipScore);
    }

    getScoreDescription(score, activity) {
        if (score >= 80) return `Excellent conditions for ${activity}! Perfect weather to enjoy your outdoor adventure.`;
        if (score >= 60) return `Good conditions for ${activity}. Weather is suitable with minor considerations.`;
        if (score >= 40) return `Fair conditions for ${activity}. Some weather factors may affect your experience.`;
        if (score >= 20) return `Poor conditions for ${activity}. Weather may significantly impact your activity.`;
        return `Unsuitable conditions for ${activity}. Consider alternative activities or reschedule.`;
    }

    getScoreColor(score) {
        if (score >= 80) return '#00ff88';
        if (score >= 60) return '#00d4ff';
        if (score >= 40) return '#ffb347';
        return '#ff6b35';
    }

    getScoreIcon(score) {
        if (score >= 80) return 'fas fa-check-circle';
        if (score >= 60) return 'fas fa-thumbs-up';
        if (score >= 40) return 'fas fa-exclamation-triangle';
        return 'fas fa-times-circle';
    }

    getAlternativeActivities(currentActivity, weatherData) {
        const alternatives = Object.keys(this.activities).filter(activity => activity !== currentActivity);
        
        // Score all alternatives and return top 3
        const scoredAlternatives = alternatives.map(activity => ({
            activity,
            score: this.calculateSuitabilityScore(activity, weatherData)
        }));
        
        scoredAlternatives.sort((a, b) => b.score - a.score);
        
        return scoredAlternatives.slice(0, 3).map(item => item.activity);
    }

    filterLocations() {
        this.displayNearbyLocations();
    }

    handleFindLocations() {
        this.displayNearbyLocations();
    }

    showLoading() {
        this.elements.loadingOverlay.style.display = 'flex';
    }

    hideLoading() {
        this.elements.loadingOverlay.style.display = 'none';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Location Detection Service
class LocationDetectionService {
    constructor() {
        this.detectBtn = document.getElementById('detectLocationBtn');
        this.locationInput = document.getElementById('location');
        this.locationStatus = document.getElementById('locationStatus');
        this.isDetecting = false;
        
        this.bindEvents();
    }
    
    bindEvents() {
        this.detectBtn.addEventListener('click', () => this.detectLocation());
    }
    
    async detectLocation() {
        if (this.isDetecting) return;
        
        this.isDetecting = true;
        this.updateStatus('detecting', 'fas fa-spinner fa-spin', 'Detecting your location...');
        this.detectBtn.disabled = true;
        
        try {
            if (!navigator.geolocation) {
                throw new Error('Geolocation is not supported by this browser');
            }
            
            const position = await this.getCurrentPosition();
            const locationData = await this.reverseGeocode(position.coords.latitude, position.coords.longitude);
            
            this.locationInput.value = locationData.address;
            this.updateStatus('success', 'fas fa-check-circle', `Location detected: ${locationData.city}, ${locationData.country}`);
            
            // Store coordinates for later use
            this.locationInput.dataset.latitude = position.coords.latitude;
            this.locationInput.dataset.longitude = position.coords.longitude;
            
        } catch (error) {
            console.error('Location detection error:', error);
            this.updateStatus('error', 'fas fa-exclamation-triangle', this.getErrorMessage(error));
        } finally {
            this.isDetecting = false;
            this.detectBtn.disabled = false;
            
            // Clear status after 5 seconds
            setTimeout(() => {
                this.clearStatus();
            }, 5000);
        }
    }
    
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }
    
    async reverseGeocode(lat, lng) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
            );
            
            if (!response.ok) {
                throw new Error('Failed to get location information');
            }
            
            const data = await response.json();
            
            const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            const city = data.address?.city || data.address?.town || data.address?.village || 'Unknown';
            const country = data.address?.country || 'Unknown';
            
            return {
                address,
                city,
                country,
                latitude: lat,
                longitude: lng
            };
        } catch (error) {
            // Fallback to coordinates if API fails
            return {
                address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
                city: 'Unknown',
                country: 'Unknown',
                latitude: lat,
                longitude: lng
            };
        }
    }
    
    updateStatus(type, icon, message) {
        this.locationStatus.className = `location-status ${type}`;
        this.locationStatus.innerHTML = `<i class="${icon}"></i>${message}`;
    }
    
    clearStatus() {
        this.locationStatus.className = 'location-status';
        this.locationStatus.innerHTML = '';
    }
    
    getErrorMessage(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                return 'Location access denied. Please allow location access and try again.';
            case error.POSITION_UNAVAILABLE:
                return 'Location information unavailable. Please try again.';
            case error.TIMEOUT:
                return 'Location request timed out. Please try again.';
            default:
                return 'Unable to detect location. Please enter manually.';
        }
    }
}

// Weather Analysis Service
class WeatherAnalysisService {
    async analyzeWeather(location, date) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate mock weather data
        return {
            temperature: Math.round(Math.random() * 30 + 5), // 5-35°C
            windSpeed: Math.round(Math.random() * 40 + 5), // 5-45 km/h
            precipitation: Math.round(Math.random() * 50), // 0-50%
            humidity: Math.round(Math.random() * 60 + 30), // 30-90%
            uvIndex: Math.round(Math.random() * 8 + 2), // 2-10
            visibility: Math.round(Math.random() * 15 + 5), // 5-20 km
            pressure: Math.round(Math.random() * 50 + 1010), // 1010-1060 hPa
            cloudCover: Math.round(Math.random() * 100) // 0-100%
        };
    }
}

// Activity Recommendation Service
class ActivityRecommendationService {
    constructor() {
        // This service handles activity recommendations
        // Could be extended to use machine learning models
    }
}

// Nearby Location Service
class NearbyLocationService {
    constructor() {
        // This service handles nearby location discovery
        // Could be extended to use real mapping APIs
    }
}

// Notification Styles (inline for simplicity)
const notificationStyles = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(10, 10, 15, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        color: white;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-color: #00ff88;
        background: rgba(0, 255, 136, 0.1);
    }
    
    .notification-error {
        border-color: #ff6b35;
        background: rgba(255, 107, 53, 0.1);
    }
    
    .notification-warning {
        border-color: #ffb347;
        background: rgba(255, 179, 71, 0.1);
    }
    
    .notification-info {
        border-color: #00d4ff;
        background: rgba(0, 212, 255, 0.1);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification-success .notification-content i {
        color: #00ff88;
    }
    
    .notification-error .notification-content i {
        color: #ff6b35;
    }
    
    .notification-warning .notification-content i {
        color: #ffb347;
    }
    
    .notification-info .notification-content i {
        color: #00d4ff;
    }
`;

// Add notification styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize the application when DOM is loaded
let weatherWise;
document.addEventListener('DOMContentLoaded', () => {
    weatherWise = new WeatherWise();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeatherWise, LocationDetectionService, WeatherAnalysisService };
}
