import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CampaignProvider } from "./store";
import ErrorBoundary from "./views/components/ErrorBoundary";
import DemoPage from "./views/demo-page";

const defaultTheme = createTheme({
  palette: {
    secondary: {
      main: "#f50057",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ErrorBoundary>
        <CampaignProvider>
          <DemoPage />
        </CampaignProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
