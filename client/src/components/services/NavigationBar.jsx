import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Slide,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CanadaFlag from "../../assets/images/canada waving flag/Waving flag/for a white background/Canada-xs.gif";
import UKFlag from "../../assets/images/united-kingdom waving flag/Waving flag/for a white background/United-Kingdom-xs.gif";
import USAFlag from "../../assets/images/united-states waving flag/Waving flag/for a white background/United-States-xs.gif";

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: scrolled ? '#72A0C1' : 'white',
  width: '100%',
  transition: 'background-color 0.7s ease-in-out',
  boxShadow: 'none',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 240,
  },
}));

const Logo = styled('img')(({ theme }) => ({
  width: 130,
  height: 40,
  objectFit: 'auto',
  filter: 'invert(100%)',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 30,
  },
}));

const countries = [
  { name: 'Canada', gifUrl: CanadaFlag },
  { name: 'United Kingdom', gifUrl: UKFlag },
  { name: 'USA', gifUrl: USAFlag },
];

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    transition: 'width 1s ease-in-out',
  },
}));

const ResponsiveNavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'));
  const [scrolled, setScrolled] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <StyledAppBar position="fixed" scrolled={scrolled}>
        <Toolbar>
          {(isSmallScreen || isTabletScreen) && (
            <IconButton edge="start" color="error" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: { xs: 'center', sm: 'left'},
              fontFamily: 'Arial, sans-serif',
              color: scrolled ? 'white' : 'black',
            }}
          >
            PROSPER
          </Typography>
          {!isSmallScreen && !isTabletScreen && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {countries.map(country => (
                <div key={country.name} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                  <img
                    src={country.gifUrl}
                    alt={country.name}
                    style={{ width: '30px', height: '20px', margin: '2px' }}
                  />
                  <Button style={{ color: scrolled ? 'white' : 'black' }}>{country.name}</Button>
                </div>
              ))}
            </div>
          )}
        </Toolbar>
      </StyledAppBar>
      <div style={{ marginTop: '64px' }}>
        {!isSmallScreen && !isTabletScreen && (
          <Toolbar variant="dense" sx={{ backgroundColor: 'white', justifyContent: 'space-evenly' }}>
            <Button style={{color : "black"}}>Home</Button>
            <Button style={{color : "black"}}>About</Button>
            <Button style={{color : "black"}}>Services</Button>
            <Button style={{color : "black"}}>Contact</Button>
          </Toolbar>
        )}
      </div>
      {isSmallScreen && (
        <StyledDrawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button>
              <ListItemText primary="Home"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="About"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Services"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Contact"/>
            </ListItem>
          </List>
        </StyledDrawer>
      )}
    </div>
  );
};

export default ResponsiveNavBar;