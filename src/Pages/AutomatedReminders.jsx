import React, { useState, useEffect } from "react";
import  Button from "../Ui/Button4";
import  Input  from "../Ui/input";
import { Card, CardContent } from "../Ui/card3";
import { MapPin, Power, Route, Bell } from "lucide-react";
import { div } from "@tensorflow/tfjs";
import NavBar from "../components/NavBar";
import LeftBar from "../components/LeftBar";

const AutomatedReminders = () => {
  const [reminder, setReminder] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const reminders = [
      "You left a device on standby! Switch it off to save power",
      "You haven’t logged your travel habits this week. Let’s check your footprint!"
    ];
    const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
    setReminder(randomReminder);
  }, []);

  const getDirections = () => {
  if (!origin || !destination) return;
  const url = `https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`;
  window.open(url, "_blank");
};

  const enableNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsEnabled(true);
          new Notification("Reminder Enabled", { body: "You will receive automated reminders!" });
        }
      });
    }
  };

  return (
    <div>
      <NavBar />
      <LeftBar/>
<div className="p-6 max-w-md mx-auto bg-gradient-to-r from-blue-500 mt-16 to-purple-500 text-white rounded-lg shadow-xl">
      <Card className="mb-4 p-4 bg-white text-gray-900 rounded-lg shadow-md">
        <CardContent>
          <h2 className="text-xl font-bold flex items-center gap-2"><Power className="text-red-500" /> Automated Reminder</h2>
          <p className="mt-2 text-gray-700">{reminder}</p>
          <Button onClick={enableNotifications} className="mt-2 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg">
            <Bell /> Enable Notifications
          </Button>
        </CardContent>
      </Card>
      
      <Card className="p-4 bg-white text-gray-900 rounded-lg shadow-md">
        <CardContent>
          <h3 className="text-lg font-semibold flex items-center gap-2"><Route className="text-blue-500" /> Get Directions</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
              <MapPin className="text-gray-500 mr-2" />
              <Input
                placeholder="Enter starting location"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="border-none bg-transparent flex-1"
              />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
              <MapPin className="text-gray-500 mr-2" />
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border-none bg-transparent flex-1"
              />
            </div>
            <Button onClick={getDirections} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">Get Directions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
    
  );
};

export default AutomatedReminders;