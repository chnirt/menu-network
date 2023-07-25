import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, WaterMark } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import { router } from "./routes";
import { AuthProvider } from "./context/Auth";
import "./styles.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

document.documentElement.style.setProperty(
  "--vh",
  window.innerHeight * 0.01 + "px"
);

// const removeWatermark = () => {
//   const ids = [];
//   const iframes = document.body.querySelectorAll("iframe");
//   for (const iframe of iframes) {
//     if (iframe.id.startsWith("sb__open-sandbox")) ids.push(iframe.id);
//   }
//   for (const id of ids) {
//     const node = document.createElement("div");
//     node.style.setProperty("display", "none", "important");
//     node.id = id;
//     document.getElementById(id)?.remove();
//     document.body.appendChild(node);
//   }
// };

// setTimeout(removeWatermark, 1000);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ConfigProvider locale={enUS}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AuthProvider>
    <WaterMark
      {...{
        content: "Chnirt"
      }}
    />
  </React.StrictMode>
);
