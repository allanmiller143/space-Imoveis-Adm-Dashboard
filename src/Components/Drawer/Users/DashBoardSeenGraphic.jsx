/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import useMediaQuery from '@mui/material/useMediaQuery';

const otherSetting = {
  height: 300,
  yAxis: [{ label: 'Total' }],
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const valueFormatter = (value) => `${value}`;

export default function DashBoardSeenGraphic({ title, data }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const fontSize = isSmallScreen ? '1.2rem' : '1.5rem';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Typography variant="h5" gutterBottom style={{ position: 'absolute', top: -20, fontSize, color: '#092f46' }}>
        {title}
      </Typography>
      <div style={{ marginTop: '50px', width: '100%', height: '100%' }}>
        <BarChart
          dataset={data}
          sx={{
            width: '100%',
            height: '100%',
            paddingTop: '50px',
            color: '#092f46',
          }}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'month',
              valueFormatter: (month, context) =>
                context.location === 'tick'
                  ? `${month.slice(0, 3)} \n2024`
                  : `${month} 2024`,
            },
          ]}
          series={[
            {
              dataKey: 'value',
              valueFormatter,
              color: '#092f46', // Define the color of the bars here
            },
          ]}
          {...otherSetting}
        />
      </div>
    </div>
  );
}
