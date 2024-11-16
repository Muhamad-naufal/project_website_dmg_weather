import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { ThemeProvider } from "./components/theme-provider";
import WeatherDashboard from "../pages/weather-dashboard";
import CityDashboard from "../pages/city-dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/" element={<CityDashboard />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
