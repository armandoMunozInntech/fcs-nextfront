import React from "react";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import TabsWithForms from "@/component/common/TabWithForms";

interface FCSContProps {
  //   function: (values: LoginValues) => void;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const FCSCont: React.FC<FCSContProps> = ({}) => {
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3, width: "100%" }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container
      sx={{
        m: 2,
        paddingLeft: "0 !important",
        paddingRight: "0 !important",
        width: "100% !important",
      }}
    >
      <TabsWithForms />
    </Container>
  );
};

export default FCSCont;
