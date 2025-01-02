import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Consultants from "../components/Consultation/Consultants";
import SideBar from "../components/Sidebars/PmSidebar";
import Footer from "../components/Footers/Footer";
import ConsultantService from "../services/ConsultantService";

function ConsultationPage() {
  const [consultants, setConsultants] = React.useState([]);

  useEffect(() => {
    ConsultantService.get_consultants().then((consultants) => {
      setConsultants(consultants);
    });
  }, []);

  return (
    <div>
      <SideBar
        contents={
          <div>
            <Box sx={{ width: "100%", m: 2, textAlign: "center" }}>
              <Typography variant="h3" component="div" gutterBottom mt-2>
                Discover Consultants!
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%", maxWidth: 1800, m: 2, textAlign: "center" }}
            >
              <Typography variant="h6" component="div" gutterBottom mt-2>
                We are here to help you with your project's journey! Book a
                session now with our top consultants to boost your project
                performance!
              </Typography>
            </Box>
            <div className="grid grid-cols-4 gap-3 mb-28">
              {consultants.map((consultant) => {
                return <Consultants consultant={consultant} />;
              })}
            </div>
          </div>
        }
      ></SideBar>
      <Footer></Footer>
    </div>
  );
}

export default ConsultationPage;
