import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-center"
        richColors
        closeButton
        theme="light"
        toastOptions={{
          style: {
            borderRadius: "0.875rem",
            padding: "1rem",
            fontFamily: "'Nunito Sans', sans-serif",
          },
        }}
      />
    </>
  );
}
