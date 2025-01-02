// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ComplexStatisticsCard({ color, title, count, percentage, icon }) {
  return (
    <Paper outlined="variant" sx={{p: '4px', borderRadius: '20px', borderColor: 'purple'}}>
      <Box display="flex" justifyContent="space-between" pt={1} px={2}>
        <Box
          variant="gradient"
          coloredShadow={color}
          borderRadius={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="5rem"
          height="2rem"
          mt={-3}
        >
        </Box>
        <Box textAlign="right" lineHeight={1.25}>
          <Typography variant="button" fontWeight="bold" color="text">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="green">{count}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box pb={2} px={2}>
        <Typography component="p" variant="button" color="purple" display="flex">
          <Typography
            component="span"
            variant="button"
            fontWeight="light"
            color={percentage.color}
          >
            {percentage.amount}
          </Typography>
          &nbsp;{percentage.label}
        </Typography>
      </Box>
    </Paper>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
