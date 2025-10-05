import { useState } from "react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import WeatherForm from "@/components/WeatherForm";
import WeatherResults from "@/components/WeatherResults";
import ActivityRecommendations from "@/components/ActivityRecommendations";
import NearbyLocations from "@/components/NearbyLocations";
import { toast } from "sonner";

const Index = () => {
  const [weatherData, setWeatherData] = useState<{
    activity: string;
    location: string;
    date: string;
  } | null>(null);

  const handleFormSubmit = (data: { activity: string; location: string; date: string }) => {
    toast.success("Analyzing weather conditions...");
    setTimeout(() => {
      setWeatherData(data);
      toast.success("Weather analysis complete!");
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <BackgroundEffects />
      <Header />
      
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <WeatherForm onSubmit={handleFormSubmit} />
          
          {weatherData && (
            <>
              <WeatherResults data={weatherData} />
              <ActivityRecommendations selectedActivity={weatherData.activity} />
              <NearbyLocations mainLocation={weatherData.location} />
            </>
          )}
        </div>
      </main>

      <footer className="glass-card border-t border-white/10 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            <span className="text-primary font-semibold">WeatherWise</span> • NASA Space Apps Challenge 2024
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Powered by NASA Earth Observation Satellites
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
