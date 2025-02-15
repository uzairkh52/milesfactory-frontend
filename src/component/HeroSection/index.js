import {
  Box,
  Card,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
  Container,
  CardContent,
  Avatar,
} from "@mui/material";
import styles from "@/src/styles/sass/components/Home.module.scss";
import searchResultStyles from "@/src/styles/sass/components/search-result/searchresult.module.scss";
import { useEffect, useState, useRef } from "react";
import LoadingArea from "../LoadingArea";
import IdeaDetailSection from "../home/IdeaDetailSection";
import { API_ENDPOINTS } from "@/src/store/api/apiEndpoints";
import api from "@/src/store/api";
import { formatTextWithBreaks } from "@/src/utils/utils";
import SearchCard from "../SearchResult/SearchCard";

const HeroSection = ({ isChatActive }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null); // For auto-scrolling

  // Fetch messages when the component mounts
  useEffect(() => {
    setIsLoading(true);
  
    api.get(API_ENDPOINTS.CHAT.GET_MESSAGE)
      .then((res) => {
        if (Array.isArray(res.data)) {
          const messagesWithFlights = [];
  
          res.data.forEach((item, index) => {
            const aiResponse = item.response;
            const flightResultsUrl = aiResponse?.results?.view_all_flight_result_api_url;

            let messageObject = { user: item.message, ai: aiResponse.message };

            
            
  
            if (flightResultsUrl) {
              api.get(`${flightResultsUrl}`)
                .then((flightRes) => {
                  console.log("flightRes", flightRes);
                })
                .catch((error) => console.error("Error fetching flight results:", error));
            } else {
              messagesWithFlights[index] = messageObject;
              setMessages([...messagesWithFlights]); // Update state
            }
          });
        }
      })
      .catch((error) => console.error("Error fetching messages:", error.response?.data || error))
      .finally(() => setIsLoading(false));
  }, []);

  
  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSearch = () => {
    if (!userMessage.trim()) return;
  
    setIsLoading(true);
    isChatActive?.(true); // Activate chat if function is provided
  
    api
      .post(API_ENDPOINTS.CHAT.SEND_MESSAGE, { user_message: userMessage })
      .then((res) => {
        console.log("res", res.data);
  
        if (res.data.results) {
          // Fetch detailed flight results
          fetchFlightResults(res.data.results);
        } else {
          // Just add AI response if no results found
          setMessages((prev) => [...prev, { user: userMessage, ai: res.data.message }]);
        }
  
        setUserMessage("");
      })
      .catch((error) => console.error("Error:", error.response?.data || error))
      .finally(() => setIsLoading(false));
  };
  
  // Function to fetch flight results
  const fetchFlightResults = (resultData) => {
    const flightResultsUrl = resultData.view_top_flight_result_api_url;
  
    api
      .get(flightResultsUrl)
      .then((res) => {
        console.log("Flight Search Results:", res.data);
  
        setMessages((prev) => [
          ...prev,
          {
            user: userMessage,
            ai: "Here are the top flight results:",
            flightResults: res.data, // Store the flight results
          },
        ]);
      })
      .catch((error) => console.error("Error fetching flights:", error.response?.data || error));
  };

  return (
    <section>
      <Container>
        <Box
          className={`${styles.HeroSection} ${
            messages.length > 0 ? styles.Active : ""
          }`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className={styles.Box}>
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="mb-40 align-center">
                <h1 className="darkgray">Travel made simple</h1>
                <p className="darkgray">
                  Your AI travel buddy, for smarter, stress-free trips
                </p>
              </div>
            )}

            {/* Search Box */}
            <section>
              <div
                className={`${searchResultStyles.SearchBoxSection} ${
                  messages.length > 0 ? searchResultStyles.active : ""
                } SearchBoxSection basecolor1-light-bg`}
              >
                <Container>
                  <Box
                    className={searchResultStyles.SearchBox}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <TextField
                      fullWidth
                      placeholder="Describe your trip, and I’ll do the rest"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleSearch}>
                              <i className="fa fa-arrow-right"></i>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </Box>
                </Container>
              </div>
            </section>

            {/* Chat Messages */}
            <section className={searchResultStyles.messageBody}>
              {messages.map((msg, index) => (
                <div key={index}>
                  <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Card
                      className={searchResultStyles.UserMessage}
                      sx={{ maxWidth: "75%" }}
                    >
                      {/* <Typography variant="body2">{msg.user}</Typography> */}
                    </Card>
                  </Box>

                  <Box display="flex" justifyContent="flex-start" mb={2}>
                    <Card
                      className={`${searchResultStyles.AiMessage} white-bg`}
                      variant="outlined"
                    >
                      <Typography variant="body2">
                        
                      </Typography>

                      {/* Show Flight Results */}
                      {/* {msg.flightResults
                        ? msg.flightResults.map((flight, i) => (
                            <SearchCard key={i} offerData={flight} />
                          ))
                        : ""} */}
                    </Card>
                  </Box>
                </div>
              ))}

              {isLoading && (
                <Box display="flex" justifyContent="center">
                  <LoadingArea />
                </Box>
              )}

              {/* Scroll to the latest message */}
              <div ref={messagesEndRef} />

              {/* Loading Indicator */}
            </section>

            {/* Suggestion Section */}
            {messages.length === 0 && <IdeaDetailSection />}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;
