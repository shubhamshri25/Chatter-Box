import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <SocketProvider>
      <BrowserRouter>
        <App />
        <Toaster closeButton />
      </BrowserRouter>
    </SocketProvider>
  </>
  //  </StrictMode>
);
