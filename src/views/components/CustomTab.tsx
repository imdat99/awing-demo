import { Box, Tab, Tabs } from "@mui/material";
import React, { Fragment, useMemo, useState } from "react";

type PanelProps = {
  children: React.ReactNode;
  label: React.ReactNode;
};

type TabPros = JSX.Element & {
  props: PanelProps;
};

interface ITabProps {
  children: TabPros | TabPros[];
}

export const TabPanel: React.FC<PanelProps> = ({ children }) => {
  return <>{children}</>;
};

const CustomTab: React.FC<ITabProps> = ({ children }) => {
  const [value, setValue] = useState(0);
  const panels = useMemo(() => {
    const tmp = Array.isArray(children) ? children : [children];
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      // dev code
      tmp.forEach((el) => {
        if (typeof el.type === "string" || el.type?.name !== "TabPanel") {
          throw new Error("Children of CustomTab must be TabPanel!");
        }
      });
    }
    return tmp;
  }, [children]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {panels.map((panel, index) => (
            <Tab label={panel.props.label} key={index} />
          ))}
        </Tabs>
      </Box>
      {panels.map((panel, index) => (
        <Fragment key={index}>
          {value === index && <Box sx={{ p: 2 }}>{panel.props.children}</Box>}
        </Fragment>
      ))}
    </Box>
  );
};

export default CustomTab;
