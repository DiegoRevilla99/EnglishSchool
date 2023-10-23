import { Link, Typography } from "@mui/material";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link
        underline="none"
        color="secondary"
        target="_blank"
        href="https://karimnot.com/public"
      >
        karimnot.com
      </Link>
      {" © "}
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
