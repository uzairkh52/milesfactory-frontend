import React from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import SearchCard from "../SearchCard";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { openPassengerDrawer } from "@/src/store/slices/passengerDrawerSlice";
import CollectPassengerInfo from "../../Checkout/CollectPassengerInfo";
import PassengerDrawerForm from "../../Checkout/passengerDrawerForm";

const AiMessage = ({ OfferMessage, aiMessage }) => {
  // const seeAllResultHandle = () => {
  //   console.log("All results:", OfferMessage?.ai?.all_search_results);
  // };
  console.log("aiMessage", aiMessage);

  const dispatch = useDispatch();
  const passengerDetails = useSelector(
    (state) => state.passengerDrawer.passengerDetails
  );
  
  // for passecnger drawer state updating open closing 
  const isPassengerDrawerOpen = useSelector((state) => state.passengerDrawer.isOpen);
  const getselectedFlight = useSelector((state) => state.booking.setselectedFlighDetail);
  console.log("selectedFlight111", getselectedFlight);
  


  return (
    <Box
      className={searchResultStyles.Aibox}
      flexDirection={"column"}
      display="flex"
      justifyContent="flex-start"
      mb={2}
    >
      {/* Show Top Offers if available */}

      {aiMessage?.ai?.offers ? (
        <>
          {aiMessage?.ai?.offers.map((getoffers, offerindex) => (
            <React.Fragment key={`${offerindex}-${getoffers.id}`}>
              <SearchCard
                offerData={getoffers}
                keyindex={`${offerindex + "-" + getoffers.id}`}
              />
            </React.Fragment>
          ))}
        </>
      ) : (
        <Card
          className={`${searchResultStyles.AiMessage} white-bg`}
          variant="outlined"
        >
          <Typography
            dangerouslySetInnerHTML={{
              __html:
                typeof aiMessage?.ai?.response === "string"
                  ? aiMessage.ai.response.replace(/\n/g, "<br>")
                  : aiMessage?.ai?.response
                  ? `<pre>${JSON.stringify(
                      aiMessage.ai.response,
                      null,
                      2
                    )}</pre>`
                  : "No response available",
            }}
          />
        </Card>
      )}
      {/* Show Passenger Information Form when a flight is booked */}

      

      {aiMessage?.ai?.response ===
        "You have selected the flight option below." && (
        <CollectPassengerInfo aiResponse={aiMessage?.ai?.response} />
      )}

      {isPassengerDrawerOpen &&
        aiMessage?.ai?.response ===
          "You have selected the flight option below." && (
          <PassengerDrawerForm />
        )}
      {/* Show AI Response if available */}

      {/* Render All Search Results */}
      {/* {OfferMessage?.ai?.all_search_results &&
        OfferMessage.ai.all_search_results.length > 0 && (
          <Box mt={2}>
            <Box my={3}>
              <Typography variant="h6">More tickets:</Typography>
            </Box>
            {OfferMessage.ai.all_search_results.map((offer, index) => (
              <SearchCard key={index} offerData={offer} />
            ))}
          </Box>
        )} */}
    </Box>
  );
};

export default AiMessage;
