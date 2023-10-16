import React, { useState } from 'react';
import './contact.scss';
import { isMobile } from 'react-device-detect';
import CircularProgress from '@mui/material/CircularProgress';
export default function Contact() {
  const [iframeLoading, setIframeLoading] = useState(true);
  
  return (
    <div className="contact" id="contact">
      <h1>Contact</h1>
      <div className={'container ' + (isMobile && 'mobile')}>
        <div className="left">
          {iframeLoading && <CircularProgress color="success" />}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3994.465192184291!2d23.971968602156686!3d38.09737453278036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a183eddc2f4a83%3A0xe898f9a5af70c6d!2sSeaside%20House%20in%20Nea%20Makri!5e0!3m2!1sen!2sgr!4v1696958072633!5m2!1sen!2sgr"
            width={!iframeLoading ? "400": "1"}
            height={!iframeLoading ? "300": "1"}
            allowfullscreen=""
            loading="lazy"
            onLoad={() => setIframeLoading(false)}
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="right">
          <h2>
            Email:{' '}
            <a href="mailto:iliop.rent@gmail.com">iliop.rent@gmail.com</a>
          </h2>
          <h2>
            Phone: <a href="tel:6948184286">6948184286</a>
          </h2>
        </div>
      </div>
      <div></div>
    </div>
  );
}
