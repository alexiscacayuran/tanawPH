import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/joy/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, List, Typography, ListItem } from "@mui/joy";
import chroma from "chroma-js";
import overlayList from "./OverlayList";
import ToggleUnits from "./ToggleUnits";
import ForecastValue from "./ForecastValue";

const Legend = ({ isDiscrete, overlay, units, setUnits }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const getColorScale = () => {
    return overlayList.find((o) => o.name === overlay);
  };

  const [colorScale, setColorScale] = useState(null);

  useEffect(() => {
    const overlayData = getColorScale();
    setColorScale(() =>
      chroma.scale(overlayData.scale).domain(overlayData.domain)
    );
  }, [overlay]);

  const generateGradient = () => {
    if (!colorScale) return "transparent"; // Prevent error on first render
    const overlayData = getColorScale();
    return `linear-gradient(to ${
      !isMobile ? "top" : "right"
    }, ${overlayData.domain
      .map((val) => colorScale(val).alpha(0.8).css())
      .join(", ")})`;
  };

  const overlayData = getColorScale(); // Call once per render

  return (
    colorScale && (
      <Box
        className={!isMobile ? "glass" : ""}
        sx={{
          bgcolor: !isMobile ? "inherit" : "#696969",

          pointerEvents: "auto",
          userSelect: "none",
          boxShadow: "sm",
          display: "flex",
          flexShrink: 0,
          alignItems: "center",
          borderRadius: !isMobile ? "sm" : 0,
          flexDirection: !isMobile ? "column" : "row",
          width: !isMobile ? "auto" : "100vw",
          height: !isMobile ? "auto" : "min-content",
        }}
      >
        <Box
          sx={{
            bgcolor: !isMobile ? "transparent" : colorScale(0).alpha(0.8).css(),
            textAlign: "center",
            width: 36,
            px: !isMobile ? 0 : 1,
            height: !isMobile ? "auto" : 22,
            flexGrow: 0,
            color: !isMobile ? "auto" : "white",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 14,
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            <ToggleUnits
              context="legend"
              overlay={overlayData.name}
              units={units}
              setUnits={setUnits}
            />
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            bgcolor: "#696969",
          }}
        >
          <List
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0,
              m: 0,
              background: isDiscrete ? "none" : generateGradient(),
              height: !isMobile ? 300 : 22,
              width: !isMobile ? 36 : "100%",
              flexDirection: !isMobile ? "column-reverse" : "row",
            }}
          >
            {overlayData.domain.map((value, index) => (
              <ListItem
                key={index}
                sx={{
                  "--ListItem-minHeight": 0,
                  width: "100%",
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "white",
                  p: 0.5,
                  backgroundColor: isDiscrete
                    ? colorScale(value).alpha(0.8).css()
                    : "transparent",
                  borderBottomLeftRadius: index === 0 ? 6 : 0,
                  borderBottomRightRadius: index === 0 ? 6 : 0,
                }}
              >
                <ForecastValue
                  overlay={overlay}
                  units={units}
                  value={value}
                  context="legend"
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    )
  );
};

export default Legend;
