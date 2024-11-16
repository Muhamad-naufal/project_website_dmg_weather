import { Button } from "../src/components/ui/button";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { useGeolocation } from "../hooks/use-geolocation";
import WeatherSkeleton from "../src/components/loading-skeleton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../src/components/ui/alert";

const WeatherDashboard = () => {
  const {
    getLocation,
    coordinates,
    error: locationError,
    isLoading: locationLoading,
  } = useGeolocation();

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      // fetchWeatherData(coordinates);
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
          <Button className="w-fit" onClick={getLocation} variant={"outline"}>
            <MapPin className="mr-2 h-4 w-4" />
            Coba Lagi
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription>
          <p>
            Tolong berikan izin lokasi agar kami dapat menampilkan informasi
          </p>
          <Button className="w-fit" onClick={getLocation} variant={"outline"}>
            <MapPin className="mr-2 h-4 w-4" />
            Coba Lagi
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  console.log(coordinates);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Lokasi Saya</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          // disabled={}
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WeatherDashboard;
