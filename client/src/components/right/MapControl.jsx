import React, { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Tooltip from "@mui/joy/Tooltip";
import { Box, Stack } from "@mui/joy";

const MapControl = ({ map }) => {
  return (
    <Box sx={{ position: "absolute", top: 70, right: 10, zIndex: 1000 }}>
      <Stack
        id="custom-zoom-control"
        direction="column"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonGroup
          orientation="vertical"
          color="neutral"
          variant="soft"
          sx={{
            width: 35,
            gap: "5px",
            "--ButtonGroup-separatorColor": "transparent",
            boxShadow: "sm",
          }}
        >
          <Button
            className="glass"
            sx={{ fontSize: "1.5rem" }}
            onClick={(e) => {
              e.stopPropagation();
              map.zoomIn();
            }}
          >
            <AddIcon />
          </Button>
          <Button
            className="glass"
            sx={{ fontSize: "1.5rem" }}
            onClick={(e) => {
              e.stopPropagation();
              map.zoomOut();
            }}
          >
            <RemoveIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default MapControl;
