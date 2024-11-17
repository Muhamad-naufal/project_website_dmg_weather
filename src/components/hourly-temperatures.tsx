import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ForecastData } from "../api/types";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { Tooltip } from "recharts";

interface HourlyTemperaturesProps {
  data: ForecastData;
}

const HourlyTemperatures = ({ data }: HourlyTemperaturesProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "HH:mm"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Temperatur Hari Ini</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#9CA3AF"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9CA3AF"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°C`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[.70rem] uppercase text-muted-foreground">
                              Suhu
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°C
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[.70rem] uppercase text-muted-foreground">
                              Terasa Seperti
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°C
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null; // Ensure null is returned if tooltip is inactive or has no payload
                }}
              />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#6B7280"
                strokeWidth={2}
                dot={false}
                strokeDasharray={"5 5"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperatures;
