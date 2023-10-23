import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

export const WelcomeCard = ({
  title = '',
  subtitle = '',
  description = '',
  image = '',
  grid = [12, 6],
}) => {
  return (
    <Grid item xs={grid[0]} md={grid[1]} height="auto">
      <Box bgcolor="white" height="100%" p="30px">
        <h3 className="block-title">{title}</h3>
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={7}>
            <Box>
              <h6>{subtitle}</h6>
              <p
                style={{
                  textAlign: 'justify',
                  wordBreak: 'normal',
                }}
              >
                {description}
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <img src={image} width="100%" alt="" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

{
  /* <div className="welcome-block block">
        <div className="content">
        <h3 className="block-title">{title}</h3>
          <div className="intro">
            <h6>{subtitle}</h6>
            <p>{description}</p>
            <div className="source"></div>
          </div>
        </div>

        <div className="figure">
          <img src={image} alt="" />
        </div>
      </div> */
}
