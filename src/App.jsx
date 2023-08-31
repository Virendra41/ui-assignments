import "./App.css";
import { RouterProvider } from "react-router-dom";
import "../styles/mixins/index.scss";
import router from "./routes/routes";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster
        containerStyle={{
          zIndex: "999999999999999999999999999",
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
