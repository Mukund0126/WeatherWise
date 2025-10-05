import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface WeatherFormProps {
  onSubmit: (data: { activity: string; location: string; date: string }) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit }) => {
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activity && location && date) {
      onSubmit({
        activity,
        location,
        date: format(date, "yyyy-MM-dd"),
      });
    }
  };

  return (
    <Card className="glass-card max-w-2xl mx-auto mb-8">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          Get Weather-Based Activity Recommendations
        </CardTitle>
        <CardDescription className="text-white/80 text-lg">
          Tell us what you want to do and where, and we'll analyze the weather conditions for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="activity" className="text-white font-medium">
              What activity are you planning?
            </Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select an activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hiking">Hiking</SelectItem>
                <SelectItem value="cycling">Cycling</SelectItem>
                <SelectItem value="beach">Beach Day</SelectItem>
                <SelectItem value="picnic">Picnic</SelectItem>
                <SelectItem value="gardening">Gardening</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="camping">Camping</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-white font-medium">
              Where are you planning to go?
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="Enter city or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">
              When are you planning to go?
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                    !date && "text-white/60"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
            disabled={!activity || !location || !date}
          >
            Analyze Weather Conditions
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WeatherForm;
