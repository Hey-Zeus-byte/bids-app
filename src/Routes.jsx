import {Routes as BrowserRoutes, Route} from "react-router-dom";
import ChangeOrderLog from "./ChangeOrderLog";
import Home from "./Home";

const Routes = () => {
  return (
    <BrowserRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/change_order_log" element={<ChangeOrderLog />} />
    </BrowserRoutes>
  );
};

export default Routes;
