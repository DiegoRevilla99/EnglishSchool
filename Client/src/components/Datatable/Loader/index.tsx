import { Box } from "@mui/material";

interface LoaderProps {
  rows: number;
}

const Loader = ({ rows }: LoaderProps) => {
  return (
    <div>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div className="skeleton"></div>
        <div
          className="skeleton-row"
          style={{
            display: "grid",
            gridTemplateColumns: Array(rows + 2)
              .join("1fr ")
              .trimEnd(),
            gap: "10px",
          }}
        >
          {Array(3 * (rows + 1))
            .fill(0)
            .map((item, index) => {
              return <div key={index} className="skeleton"></div>;
            })}
        </div>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
      </Box>
    </div>
  );
};

export default Loader;
