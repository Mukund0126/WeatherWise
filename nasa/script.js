// WeatherWise - NASA Space App Challenge
// JavaScript for Weather Activity Analyzer

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

        // Mock location data for nearby locations
        this.mockLocations = {
            hiking: [
                { name: 'Mountain Trail Park', distance: 2.3, rating: 4.8, type: 'Trail' },
                { name: 'Nature Reserve', distance: 5.1, rating: 4.6, type: 'Park' },
                { name: 'Forest Path', distance: 8.7, rating: 4.5, type: 'Trail' }
            ],
            camping: [
                { name: 'Riverside Campground', distance: 12.4, rating: 4.7, type: 'Campground' },
                { name: 'Mountain View RV Park', distance: 18.2, rating: 4.4, type: 'RV Park' },
                { name: 'Wilderness Camp', distance: 25.8, rating: 4.9, type: 'Wilderness' }
            ],
            fishing: [
                { name: 'Crystal Lake', distance: 3.2, rating: 4.6, type: 'Lake' },
                { name: 'River Bend', distance: 7.8, rating: 4.3, type: 'River' },
                { name: 'Coastal Pier', distance: 15.1, rating: 4.7, type: 'Coast' }
            ],
            cycling: [
                { name: 'City Bike Trail', distance: 1.5, rating: 4.5, type: 'Trail' },
                { name: 'Country Road Route', distance: 4.3, rating: 4.4, type: 'Road' },
                { name: 'Mountain Bike Park', distance: 11.2, rating: 4.8, type: 'Park' }
            ],
            picnic: [
                { name: 'Central Park', distance: 0.8, rating: 4.7, type: 'Park' },
                { name: 'Lakeside Gardens', distance: 2.1, rating: 4.6, type: 'Garden' },
                { name: 'Botanical Reserve', distance: 6.4, rating: 4.8, type: 'Reserve' }
            ],
            beach: [
                { name: 'Sunset Beach', distance: 5.7, rating: 4.9, type: 'Beach' },
                { name: 'Crystal Cove', distance: 12.3, rating: 4.6, type: 'Cove' },
                { name: 'Paradise Bay', distance: 18.9, rating: 4.8, type: 'Bay' }
            ],
            photography: [
                { name: 'Sunrise Point', distance: 3.4, rating: 4.9, type: 'Viewpoint' },
                { name: 'Historic District', distance: 1.2, rating: 4.5, type: 'Historic' },
                { name: 'Waterfall Trail', distance: 9.8, rating: 4.7, type: 'Nature' }
            ],
            stargazing: [
                { name: 'Observatory Hill', distance: 14.2, rating: 4.9, type: 'Observatory' },
                { name: 'Dark Sky Reserve', distance: 22.7, rating: 4.8, type: 'Reserve' },
                { name: 'Mountain Peak', distance: 31.5, rating: 4.7, type: 'Mountain' }
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
            
            // Show results
            this.displayWeatherResults(weatherData, suitabilityScore, activity, location, date);
            this.generateRecommendations(weatherData, activity, suitabilityScore);
            
            // Scroll to results
            this.elements.weatherResults.scrollIntoView({ behavior: 'smooth' });
            
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
                <button class="directions-btn">
                    <i class="fas fa-directions"></i>
                    Get Directions
                </button>
                <button class="details-btn">
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
document.addEventListener('DOMContentLoaded', () => {
    new WeatherWise();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeatherWise, LocationDetectionService, WeatherAnalysisService };
}
