'use client';

import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import docs from './informations.json';
import SectionTitle from '@/components/SectionTitle';
import SectionWrapper from '@/components/SectionWrapper';
import { useTranslations } from 'next-intl';

function getTranslation(t: any, key: string): any {
  return t(key);
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

const Informations = () => {
  const t = useTranslations();

  return (
    <SectionWrapper
      id="informations"
      heightCalc={{ xs: `calc(115dvh - 56px)` }}
    >
      {/* Title and subtitle - no overflow */}
      <SectionTitle title={t('informations.title')} />
      <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px' }}>
        {t('informations.subTitle')}
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

export default Informations;
