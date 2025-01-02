import React from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function HelpSupport() {

  return (
    <main className="">
      <div className=" min-h-screen flex items-center justify-center px-5">
        <div className="w-4/5">
          <Box sx={{ width: '100%', maxWidth: 4000, color: 'primary.main' }} style={{ justifyContent: 'center' }}>
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span class="block">We are ready to help!</span>
              <span class="block text-indigo-600">
                Use our portal to find answers for your questions!
              </span>
            </h2>
            <Box>
              <Stack spacing={3} direction="column" sx={{ m: 5 }} style={{ justifyContent: 'center' }}>
              </Stack>
            </Box>
          </Box>
          <Divider />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Who are we?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Manage-IT is your guide and helper in your project management journey!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>How can Manage-IT can help you?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                By signing up and becoming part of our platform you can immediately
                start to your way of excellence in project management!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel3a-header"
            >
              <Typography>What makes Manage-IT different?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                All other project management platforms you will use can support
                with their resources but never support you with a professional
                consultant who is experienced in his/her area.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel4a-header"
            >
              <Typography>Which payment models you offer?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                By becoming a member of our platform you can either pay per
                project or you can choose our subscription model!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel4a-header"
            >
              <Typography>How can I reach consultants if i needed any help?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                When you login to your account use our sidebar and click on
                consultation sessions! And arrange according to the time is best for you!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <Box>
        <Stack spacing={6} direction="column" sx={{ m: 5 }} style={{ justifyContent: 'center' }}>
        </Stack>
      </Box>

    </main>
  );
}
