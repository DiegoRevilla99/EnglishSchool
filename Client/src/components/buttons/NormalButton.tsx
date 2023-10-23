import { Button } from '@mui/material';

const NormalButton = ({ title = '', color = '#fff' }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 0,
        // border: '2px solid #fff',
        border: `2px solid ${color}`,
        color: { color },
        borderRadius: 0,
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.1)',
          boxShadow: 0,
        },
      }}
    >
      {title}
    </Button>
  );
};

export default NormalButton;
