'use client';

import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import docs from './informations.json';
import { getDictionary } from '@/lib/Languages';
import LangContext from '@/components/LangContext';
import SectionTitle from '@/components/SectionTitle';
import SectionWrapper from '@/components/SectionWrapper';

function getTranslation(t: Record<string, any>, key: string): any {
  return key.split('.').reduce((o, k) => (o ? o[k] : undefined), t) || key;
}

const renderDocs = (t: any, docs: any[], level = 0) =>
  docs.map((doc, index) => (
    <Accordion
      key={doc.id || index}
      disableGutters
      square
      defaultExpanded={doc.expand === true} // <-- expand if true
      sx={{ mb: 1, bgcolor: 'white', boxShadow: 1 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
        <Typography
          fontWeight={level === 0 ? 'bold' : 'medium'}
          variant={level === 0 ? 'h6' : 'subtitle1'}
          color="primary"
        >
          {getTranslation(t, doc.name)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 3, pt: 0 }}>
        {doc.desc && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            {getTranslation(t, doc.desc)}
          </Typography>
        )}
        {doc.docs && renderDocs(t, doc.docs, level + 1)}
      </AccordionDetails>
    </Accordion>
  ));

const InformationsSection = () => {
  const lang = useContext(LangContext);
  const t = getDictionary(lang);

  return (
    <SectionWrapper id="informations" heightCalc={{ xs: `calc(115dvh - 56px)` }}>
      {/* Title and subtitle - no overflow */}
      <SectionTitle title={t.informations.title} />
      <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px' }}>
        {t.informations.subTitle}
      </Typography>

      {/* Scrollable container only for accordions */}
      <Box
        sx={{
          maxHeight: '70dvh', // or any height you want to limit
          overflowY: 'auto',
          pr: 1, // add some padding for scrollbar
        }}
      >
        {renderDocs(t, docs)}
      </Box>
    </SectionWrapper>
  );
};

export default InformationsSection;
