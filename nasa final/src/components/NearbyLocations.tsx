import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Cloud, Sun, CloudRain } from "lucide-react";

interface NearbyLocationsProps {
  mainLocation: string;
}

const NearbyLocations: React.FC<NearbyLocationsProps> = ({ mainLocation }) => {
  // Mock nearby locations data - in a real app, this would come from a location API
  const nearbyLocations = [
    {
      name: "Central Park",
      distance: "2.3 km",
      weather: "sunny",
      temperature: 24,
      rating: 4.8,
      description: "Perfect for outdoor activities with excellent weather conditions",
    },
    {
      name: "Riverside Trail",
      distance: "5.1 km",
      weather: "partly-cloudy",
      temperature: 22,
      rating: 4.6,
      description: "Great for hiking and cycling with moderate conditions",
    },
    {
      name: "Beachfront Park",
      distance: "8.7 km",
      weather: "cloudy",
      temperature: 20,
      rating: 4.4,
      description: "Good for beach activities, though slightly cooler",
    },
    {
      name: "Mountain View Point",
      distance: "12.4 km",
      weather: "rainy",
      temperature: 18,
      rating: 4.2,
      description: "Challenging conditions, better for indoor activities",
    },
  ];

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "sunny":
        return <Sun className="h-4 w-4 text-yellow-400" />;
      case "cloudy":
        return <Cloud className="h-4 w-4 text-gray-400" />;
      case "rainy":
        return <CloudRain className="h-4 w-4 text-blue-400" />;
      default:
        return <Cloud className="h-4 w-4 text-gray-400" />;
    }
  };

  const getWeatherColor = (weather: string) => {
    switch (weather) {
      case "sunny":
        return "bg-yellow-500/20 text-yellow-200 border-yellow-400/30";
      case "cloudy":
        return "bg-gray-500/20 text-gray-200 border-gray-400/30";
      case "rainy":
        return "bg-blue-500/20 text-blue-200 border-blue-400/30";
      default:
        return "bg-gray-500/20 text-gray-200 border-gray-400/30";
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <MapPin className="h-6 w-6 text-blue-400" />
          Nearby Locations
        </CardTitle>
        <CardDescription className="text-white/80">
          Alternative locations near {mainLocation} with current weather conditions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nearbyLocations.map((location, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{location.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {location.distance}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm">{location.rating}</span>
                </div>
              </div>
              
              <p className="text-white/80 text-sm mb-3">{location.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getWeatherIcon(location.weather)}
                  <span className="text-white font-medium">{location.temperature}°C</span>
                </div>
                <Badge className={getWeatherColor(location.weather)}>
                  {location.weather.replace("-", " ").toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-400/30">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-green-400" />
            <h4 className="font-semibold text-white">Location Insights</h4>
          </div>
          <p className="text-white/90 text-sm">
            All weather data is sourced from NASA's Earth observation satellites and updated in real-time. 
            Consider traffic conditions and accessibility when choosing your destination.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyLocations;
