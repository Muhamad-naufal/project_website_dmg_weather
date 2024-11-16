import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { WeatherData } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;
  const getWindDirection = (degrees: number) => {
    const directions = [
      "Utara",
      "Timur Laut",
      "Timur",
      "Tenggara",
      "Selatan",
      "Barat Daya",
      "Barat",
      "Barat Laut",
    ];
    const index =
      Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Terbit",
      value: new Date(sys.sunrise * 1000).toLocaleTimeString(),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Terbenam",
      value: new Date(sys.sunset * 1000).toLocaleTimeString(),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Arah Angin",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Tekanan",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detail Cuaca</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium">{detail.title}</p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
