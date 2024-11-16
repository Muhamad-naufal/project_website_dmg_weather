import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ForecastData } from "../api/types";

interface HourlyTemperaturesProps {
  data: ForecastData;
}

const HourlyTemperatures = ({ data }: HourlyTemperaturesProps) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Temperatur Hari Ini</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full"></div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperatures;
