import React, { useEffect, useRef } from 'react';
import './reservation.scss';
import { Button } from '@mui/material';
import { isMobile } from 'react-device-detect';
export default function Reservation() {
  return (
    <div className="reservation" id="reservation">
      <h1>Reservation</h1>
      <div className="container">
        {isMobile ? (
          <>
            <h3>Our accommodation is available for rent all year round.</h3>
            <h3>
              You can book your stay by contacting us via phone, email or using
              any of the platforms below.
            </h3>
          </>
        ) : (
          <>
            <h2>Our accommodation is available for rent all year round.</h2>
            <h2>
              You can book your stay by contacting us via phone, email or using
              any of the platforms below.
            </h2>
          </>
        )}

        <div className={'platforms ' + (isMobile && 'mobile')}>
          <div
            className={'platform ' + (isMobile && 'mobile')}
            onClick={() => {
              window.open(
                'https://airbnb.com/h/seasidehouseinneamakri',
                '_blank'
              );
            }}
          >
            <img src="assets/airbnb.png" width="150" height="100" alt="" />
          </div>
          <div
            className={'platform ' + (isMobile && 'mobile')}
            onClick={() => {
              window.open(
                'https://booking.com/hotel/gr/seaside-house-in-nea-makri.el.html',
                '_blank'
              );
            }}
          >
            <img src="assets/booking.png" width="150" height="100" alt="" />
          </div>
          <div
            className={'platform ' + (isMobile && 'mobile')}
            onClick={() => {
              window.open(
                'https://www.vrbo.com/en-ca/cottage-rental/p3575497vb',
                '_blank'
              );
            }}
          >
            <img src="assets/vrbo.png" width="150" height="100" alt="" />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
