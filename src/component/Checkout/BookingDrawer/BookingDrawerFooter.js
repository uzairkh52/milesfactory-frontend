import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import styles from "@/src/styles/sass/components/checkout/BookingDrawer.module.scss";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "@/src/store/slices/BookingflightSlice";

const BookingDrawerFooter = ({ getFlightDetails, onClose, onSelectFlight }) => {
  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(toggleDrawer(false)); 
  };

  return (
    <Box className={styles.checkoutDrowerFooter} position="absolute">
      <Divider />

      {/* Footer Content */}
      <Box className={styles.checkoutDrowerHeder} py={1} px={3} display="flex" flexDirection="column">
        <Typography variant="p" className="gray f12 p">
          *The airline policy will apply if you decide to cancel or modify your trip.
        </Typography>

        {/* Price Row */}
        <Box className={styles.priceRow} display="flex" justifyContent="space-between">
          {/* Price Section */}
          <Box display="flex" flexDirection="column">
            <Box className={styles.priceSection} display="flex" alignItems="center" gap={1}>
              <Typography variant="subtitle2" className={styles.priceLabel + " mb-0"}>
                Price:
              </Typography>
              <Typography variant="h3" className={styles.price + " h3 mb-0 basecolor1"}>
                <span>€ {getFlightDetails?.total_amount}</span>
              </Typography>
            </Box>
            <Box className={styles.totalPersonPrice}>
              <Typography variant="p" className="darkgray f14">
                Total per person: € {getFlightDetails?.per_passenger_amount}
              </Typography>
            </Box>
          </Box>

          {/* Actions Section */}
          <Box display="flex" justifyContent="flex-end" alignItems="center" gap={3}>
            {/* Close Button */}
            <Box display="flex" alignItems="center" gap={2} className="basecolor1 f14" onClick={handleCloseDrawer} style={{ cursor: "pointer" }}>
              <i className="fa fa-close fas"></i> <span>Close</span>
            </Box>

            {/* Select Flight Button */}
            <Box display="flex" alignItems="center" gap={2} className="basecolor1">
              <button className="btn btn-green btn-sm" onClick={onSelectFlight}>
                <Box display="flex" gap={1}>
                  <i className="fa fa-arrow-right"></i> <span>Select flight</span>
                </Box>
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDrawerFooter;
