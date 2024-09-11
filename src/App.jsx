import AppRoutes from "./routes/appRoutes";
import axios from "axios";
import { AntdCustomTheme } from "./theme/antd.config";
import { ConfigProvider } from "antd";
import { API_URL } from "./DataConfig";
axios.defaults.baseURL = `${API_URL}api/`;
import { useEffect } from "react";
function App() {
  // Disable if you are Debuging
  useEffect(() => {
    // console = {};
    // console.log = function () {};
    // console.info = function () {};
    // console.warn = function () {};
    // console.error = function () {};
  }, []);
  return (
    <>
      <ConfigProvider componentSize="large" theme={AntdCustomTheme}>
        <div className="items-center min-h-[100vh]">
          <AppRoutes />
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
