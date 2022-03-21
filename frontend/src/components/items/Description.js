 import * as React from 'react';
 import Accordion from '@mui/material/Accordion';
 import AccordionDetails from '@mui/material/AccordionDetails';
 import AccordionSummary from '@mui/material/AccordionSummary';
 import Typography from '@mui/material/Typography';
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 import { styled } from '@mui/material/styles';

/**
 * CSW | 2022.03.21 | UPDATE
 * @name Description
 * @des itemDetail Description 컴포넌트
 */

 export default function ControlledAccordions() {
   const [expanded, setExpanded] = React.useState(false);
 
   const handleChange = (panel) => (event, isExpanded) => {
     setExpanded(isExpanded ? panel : false);
   };
 
   return (
     <div style={{border:'1px solid rgba(0, 0, 0, 0.1)', borderRadius:10, width: "85%", height:"100%"}}>
       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1bh-content"
           id="panel1bh-header"
         >
           <Typography sx={{ width: '33%', flexShrink: 0, textAlign:'center' }}>
             Description
           </Typography>
         </AccordionSummary>
         <AccordionDetails sx={{backgroundColor: 'rgba(249, 249, 249, 1)'}}>
           <Typography>
             Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
             Aliquam eget maximus est, id dignissim quam.
           </Typography>
         </AccordionDetails>
       </Accordion>
       <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel2bh-content"
           id="panel2bh-header"
         >
           <Typography sx={{ width: '33%', flexShrink: 0, textAlign:'center' }}>Author</Typography>

         </AccordionSummary>
         <AccordionDetails sx={{backgroundColor: 'rgba(249, 249, 249, 1)'}}>
           <Typography>
             Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
             varius pulvinar diam eros in elit. Pellentesque convallis laoreet
             laoreet.
           </Typography>
         </AccordionDetails>
       </Accordion>
       <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel3bh-content"
           id="panel3bh-header"
         >
           <Typography sx={{ width: '33%', flexShrink: 0, textAlign:'center' }}>
             Category
           </Typography>
         </AccordionSummary>
         <AccordionDetails sx={{backgroundColor: 'rgba(249, 249, 249, 1)'}}>
           <Typography>
             Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
             amet egestas eros, vitae egestas augue. Duis vel est augue.
           </Typography>
         </AccordionDetails>
       </Accordion>
       <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel4bh-content"
           id="panel4bh-header"
         >
           <Typography sx={{ width: '33%', flexShrink: 0, textAlign:'center' }}>Contract</Typography>
         </AccordionSummary>
         <AccordionDetails sx={{backgroundColor: 'rgba(249, 249, 249, 1)'}}>
           <Typography>
             Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
             amet egestas eros, vitae egestas augue. Duis vel est augue.
           </Typography>
         </AccordionDetails>
       </Accordion>
     </div>
   );
 }
 