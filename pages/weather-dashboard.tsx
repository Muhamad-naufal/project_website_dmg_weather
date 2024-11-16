import { Button } from "../src/components/ui/button";
import { RefreshCcw } from "lucide-react";

const WeatherDashboard = () => {
  return (
    <div>
      <h1>Lokasi Saya</h1>
      <Button variant={"outline"} size={"icon"}>
        <RefreshCcw />
      </Button>
    </div>
  );
};

export default WeatherDashboard;
