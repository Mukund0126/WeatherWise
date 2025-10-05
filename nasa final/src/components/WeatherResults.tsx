import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Wind, Eye, Sun, Cloud, CloudRain } from "lucide-react";

interface WeatherResultsProps {
  data: {
    activity: string;
    location: string;
    date: string;
  };
}

const WeatherResults: React.FC<WeatherResultsProps> = ({ data }) => {
  // Mock weather data - in a real app, this would come from a weather API
  const weatherData = {
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    condition: "partly-cloudy",
    description: "Partly cloudy with occasional sun",
    uvIndex: 6,
    precipitation: 0,
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-400" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-400" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };

  const getActivityRecommendation = (activity: string, condition: string) => {
    const recommendations = {
      hiking: condition === "sunny" ? "Perfect weather for hiking! Don't forget sunscreen." : "Good conditions, but bring layers.",
      cycling: condition === "sunny" ? "Excellent cycling weather! Stay hydrated." : "Be cautious of wind conditions.",
      beach: condition === "sunny" ? "Perfect beach day! UV index is moderate." : "Not ideal beach weather today.",
      picnic: condition === "sunny" ? "Great picnic weather! Enjoy the outdoors." : "Consider indoor alternatives.",
      gardening: condition === "sunny" ? "Perfect for gardening! Plants will love this weather." : "Good for light gardening tasks.",
      photography: condition === "partly-cloudy" ? "Ideal lighting conditions for photography!" : "Challenging but creative lighting.",
      running: condition === "sunny" ? "Great running weather! Early morning recommended." : "Good for indoor running.",
      camping: condition === "sunny" ? "Perfect camping weather! Clear skies expected." : "Check weather updates before going.",
    };
    return recommendations[activity as keyof typeof recommendations] || "Weather conditions are suitable for your activity.";
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
            {getConditionIcon(weatherData.condition)}
            Weather Analysis for {data.location}
          </CardTitle>
          <CardDescription className="text-white/80 text-lg">
            {weatherData.description} • {new Date(data.date).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Thermometer className="h-5 w-5 text-blue-400 mr-1" />
                <span className="text-white font-semibold">Temperature</span>
              </div>
              <p className="text-2xl font-bold text-white">{weatherData.temperature}°C</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Droplets className="h-5 w-5 text-blue-400 mr-1" />
                <span className="text-white font-semibold">Humidity</span>
              </div>
              <p className="text-2xl font-bold text-white">{weatherData.humidity}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Wind className="h-5 w-5 text-blue-400 mr-1" />
                <span className="text-white font-semibold">Wind</span>
              </div>
              <p className="text-2xl font-bold text-white">{weatherData.windSpeed} km/h</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-5 w-5 text-blue-400 mr-1" />
                <span className="text-white font-semibold">Visibility</span>
              </div>
              <p className="text-2xl font-bold text-white">{weatherData.visibility} km</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Activity Recommendation</h3>
              <p className="text-white/90 bg-white/10 p-4 rounded-lg">
                {getActivityRecommendation(data.activity, weatherData.condition)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                UV Index: {weatherData.uvIndex}
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-200 border-green-400/30">
                Precipitation: {weatherData.precipitation}mm
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                Data Source: NASA Satellites
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherResults;
