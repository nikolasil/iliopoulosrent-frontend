'use client';

import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { SocialIcon } from 'react-social-icons';
import data from './items.json';
import SectionTitle from '@/components/SectionTitle';
import SectionWrapper from '@/components/SectionWrapper';
import { useTranslations } from 'next-intl';

const Contact: React.FC = () => {
  const emailAddress = 'iliop.rent@gmail.com';
  const phoneNumber = '+30 694 81 84 286';
  const t = useTranslations();

  const googleMapsSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3994.465192184291!2d23.971968602156686!3d38.09737453278036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a183eddc2f4a83%3A0xe898f9a5af70c6d!2sSeaside%20House%20in%20Nea%20Makri!5e0!3m2!1sen!2sgr!4v1696958072633!5m2!1sen!2sgr';

  return (
    <SectionWrapper id="contact">
      <SectionTitle title={t('contact.title')} />

      <Box>
        <Stack spacing={3}>
          {/* Email */}
          <Stack direction="row" spacing={2} alignItems="center">
            <EmailIcon color="primary" />
            <Typography variant="body1">
              <Link href={`mailto:${emailAddress}`} underline="hover">
                {t('contact.email')}: {emailAddress}
              </Link>
            </Typography>
          </Stack>

          {/* Phone */}
          <Stack direction="row" spacing={2} alignItems="center">
            <PhoneIcon color="primary" />
            <Typography variant="body1">
              <Link href={`tel:${phoneNumber}`} underline="hover">
                {t('contact.phone')}: {phoneNumber}
              </Link>
            </Typography>
          </Stack>

          <Box>
            <Typography variant="h6" gutterBottom>
              {t('contact.socials')}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              useFlexGap
              flexWrap="wrap"
              alignItems="center"
            >
              {data.map(({ name, link }) => (
                <SocialIcon
                  key={name}
                  url={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ height: 40, width: 40 }}
                  title={name}
                />
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              mt: 5,
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 3,
              width: '100%',
              height: { xs: 300, md: 500 },
            }}
          >
            <iframe
              src={googleMapsSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Maps Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Stack>
      </Box>
    </SectionWrapper>
  );
};

export default Contact;
