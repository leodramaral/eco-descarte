import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App.tsx";
import { store } from "./app/store";
import { ClarityProvider } from "./app/components/ClarityProvider";
import { ClarityConsentBanner } from "./app/components/ClarityConsentBanner";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ClarityProvider>
    <Provider store={store}>
      <App />
      <ClarityConsentBanner />
    </Provider>
  </ClarityProvider>,
);
