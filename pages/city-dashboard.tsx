import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../src/components/ui/alert";
import { useForecastQuery, useWeatherQuery } from "../hooks/use-weather";
import { useParams, useSearchParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import WeatherSkeleton from "../src/components/loading-skeleton";
import CurrentWeather from "../src/components/current-weather";
import HourlyTemperatures from "../src/components/hourly-temperatures";
import WeatherDetails from "../src/components/weather-details";
import WeatherForecast from "../src/components/weather-forecast";
import { FavoriteButton } from "../src/components/favorite-button";

const CityDashboard = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Ada yang salah dengan cuaca di kota ini.
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data || !params.name) {
    return <WeatherSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-6xl font-bold tracking-tight">
          {params.name}, {weatherQuery.data.sys.country}
        </h1>
        <div>
          <FavoriteButton data={{ ...weatherQuery.data, name: params.name }} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col md:flex-row gap-6">
          <CurrentWeather data={weatherQuery.data} />
          <WeatherDetails data={weatherQuery.data} />
        </div>

        {/* Right Column */}
        <div className="flex gap-6">
          {/* Make HourlyTemperatures slightly wider */}
          <div className="flex-1">
            <HourlyTemperatures data={forecastQuery.data} />
          </div>

          {/* Flexible Height for WeatherForecast */}
          <div className="flex-1 overflow-y-auto">
            <WeatherForecast data={forecastQuery.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDashboard;
