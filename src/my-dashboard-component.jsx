import React from "react";
import { Box } from "@adminjs/design-system";
import { Checkbox } from "primereact/checkbox";

const Dashboard = (props) => {
  return (
    <Box>
      <div className="field-checkbox">
        <Checkbox inputId="binary" />
        <label htmlFor="binary">Remember Me</label>
      </div>
    </Box>
  );
};

export default Dashboard;
