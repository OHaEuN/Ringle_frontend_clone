import { Dispatch, SetStateAction } from "react";
import { Box, Toolbar, IconButton, Button, AppBar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  currentCalendar,
  nextWeek,
  prevWeek,
  setDay,
} from "../../store/calendar";

import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import BI from "../../assets/images/gcBI.png";

interface HeaderProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setIsOpen }: HeaderProps) {
  const dispatch = useDispatch();
  const { current } = useSelector(currentCalendar);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            verticalAlign: "center",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={BI}
            alt="googleCalendar"
            loading="lazy"
            style={{ width: "40px", margin: "5px" }}
          />
          <Box sx={{ ml: "5px" }}>캘린더</Box>
          <Box sx={{ ml: "80px", display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                border: "1px solid #d8d8d8",
                color: "#353535",
                height: "80%",
              }}
              onClick={() => {
                dispatch(setDay(new Date().toString()));
              }}
            >
              오늘
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", margin: "20px" }}>
              <IconButton
                size="small"
                onClick={() => {
                  dispatch(prevWeek());
                }}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  dispatch(nextWeek());
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box>
              {current.year}년 {current.month}월
            </Box>
          </Box>
        </Box>
        <UselessIcons />
      </Toolbar>
    </AppBar>
  );
}

function UselessIcons() {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton size="large" color="secondary">
        <SearchIcon />
      </IconButton>
      <IconButton size="large" color="secondary">
        <HelpOutlineIcon />
      </IconButton>
      <IconButton size="large" edge="end" color="secondary">
        <SettingsIcon />
      </IconButton>
    </Box>
  );
}
