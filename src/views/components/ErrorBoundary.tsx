import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

export default class ErrorBoundary extends React.Component<
  { children: ReactElement },
  { hasError: boolean }
> {
  constructor(props: Readonly<{ children: ReactElement }>) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            position: "relative",
            top: 0,
            left: 0,
            zIndex: 1,
            display: "flex",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Typography sx={{ margin: "auto" }} variant="h1">
            Something went wrong.
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}
