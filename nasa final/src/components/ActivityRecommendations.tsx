import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

interface ActivityRecommendationsProps {
  selectedActivity: string;
}

const ActivityRecommendations: React.FC<ActivityRecommendationsProps> = ({ selectedActivity }) => {
  const getActivityTips = (activity: string) => {
    const tips = {
      hiking: [
        { type: "success", text: "Wear comfortable hiking boots with good traction" },
        { type: "success", text: "Bring plenty of water (at least 2L per person)" },
        { type: "warning", text: "Apply sunscreen every 2 hours" },
        { type: "info", text: "Check trail conditions before heading out" },
        { type: "success", text: "Pack a first aid kit and emergency supplies" },
      ],
      cycling: [
        { type: "success", text: "Wear a properly fitted helmet" },
        { type: "success", text: "Check tire pressure and brakes before riding" },
        { type: "warning", text: "Be visible with bright clothing and lights" },
        { type: "info", text: "Plan your route and inform someone of your plans" },
        { type: "success", text: "Bring water and energy snacks" },
      ],
      beach: [
        { type: "success", text: "Apply broad-spectrum sunscreen (SPF 30+)" },
        { type: "warning", text: "Reapply sunscreen every 2 hours and after swimming" },
        { type: "success", text: "Bring plenty of water and stay hydrated" },
        { type: "info", text: "Check tide times and water conditions" },
        { type: "success", text: "Pack a beach umbrella for shade" },
      ],
      picnic: [
        { type: "success", text: "Pack food in coolers with ice packs" },
        { type: "success", text: "Bring plenty of water and non-alcoholic drinks" },
        { type: "warning", text: "Keep perishable foods cold until serving" },
        { type: "info", text: "Choose a shaded spot if possible" },
        { type: "success", text: "Don't forget plates, utensils, and napkins" },
      ],
      gardening: [
        { type: "success", text: "Wear gardening gloves to protect your hands" },
        { type: "warning", text: "Work in the early morning or evening to avoid heat" },
        { type: "success", text: "Stay hydrated and take breaks in the shade" },
        { type: "info", text: "Check soil moisture before watering" },
        { type: "success", text: "Use proper tools for the task" },
      ],
      photography: [
        { type: "success", text: "Golden hour (1 hour after sunrise/before sunset) is best" },
        { type: "warning", text: "Protect your camera from dust and moisture" },
        { type: "success", text: "Bring extra batteries and memory cards" },
        { type: "info", text: "Use a polarizing filter for better sky contrast" },
        { type: "success", text: "Pack a tripod for stable shots" },
      ],
      running: [
        { type: "success", text: "Wear moisture-wicking clothing" },
        { type: "warning", text: "Start slowly and listen to your body" },
        { type: "success", text: "Stay hydrated before, during, and after" },
        { type: "info", text: "Choose well-lit, safe routes" },
        { type: "success", text: "Warm up and cool down properly" },
      ],
      camping: [
        { type: "success", text: "Check weather forecast and pack accordingly" },
        { type: "warning", text: "Bring extra layers for temperature changes" },
        { type: "success", text: "Pack a reliable tent and sleeping bag" },
        { type: "info", text: "Inform someone of your camping location" },
        { type: "success", text: "Bring a first aid kit and emergency supplies" },
      ],
    };
    return tips[activity as keyof typeof tips] || [];
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-400" />;
      default:
        return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  const tips = getActivityTips(selectedActivity);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-400" />
          Tips for {selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1)}
        </CardTitle>
        <CardDescription className="text-white/80">
          Essential recommendations to make your {selectedActivity} experience safe and enjoyable
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
            >
              {getIcon(tip.type)}
              <p className="text-white/90 text-sm leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-5 w-5 text-blue-400" />
            <h4 className="font-semibold text-white">Pro Tip</h4>
          </div>
          <p className="text-white/90 text-sm">
            Weather conditions can change quickly. Always check the latest forecast before heading out and be prepared for unexpected changes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityRecommendations;
