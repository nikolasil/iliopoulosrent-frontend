import React, { useEffect, useState } from 'react';
import './reservation.scss';
import items from './items.json';
import { isMobile } from 'react-device-detect';
export default function Reservation({ language }) {
  const [list, setList] = useState({});
  useEffect(() => {
    setList(items.find((i) => i.language === language.id).data);
  }, [language]);
  return (
    <div className={'reservation ' + (isMobile && 'mobile')} id="reservation">
      <h1>{list.title}</h1>
      <div className="container">
        {isMobile ? (
          <div>
            <h3>{list.subTitle1}</h3>
            <h3>{list.subTitle2}</h3>
          </div>
        ) : (
          <div>
            <h2>{list.subTitle1}</h2>
            <h2>{list.subTitle2}</h2>
          </div>
        )}
        <div className="platforms-container">
          <div className="platforms">
            <div
              className={'platform ' + (isMobile && 'mobile')}
              onClick={() => {
                window.open(
                  'https://airbnb.com/h/seasidehouseinneamakri',
                  '_blank'
                );
              }}
            >
              <img
                src="assets/airbnb.webp"
                width="150"
                height="100"
                alt="airbnb"
                title="airbnb"
                loading="lazy"
              />
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
              <img
                src="assets/booking.webp"
                width="150"
                height="100"
                alt="booking"
                title="booking"
                loading="lazy"
              />
            </div>
            {!isMobile && (
              <>
                <div
                  className={'platform ' + (isMobile && 'mobile')}
                  onClick={() => {
                    window.open(
                      'https://www.vrbo.com/en-ca/cottage-rental/p3575497vb',
                      '_blank'
                    );
                  }}
                >
                  <img
                    src="assets/vrbo.webp"
                    width="150"
                    height="100"
                    alt="vrbo"
                    title="vrbo"
                    loading="lazy"
                  />
                </div>
                <div
                  className={'platform ' + (isMobile && 'mobile')}
                  onClick={() => {
                    window.open(
                      'https://bnbingreece.com/en/room/10156',
                      '_blank'
                    );
                  }}
                >
                  <img
                    src="assets/bnbingreece.webp"
                    width="110"
                    height="110"
                    alt="bnbingreece"
                    title="bnbingreece"
                    loading="lazy"
                  />
                </div>
              </>
            )}
          </div>
          {isMobile && (
            <div className="platforms">
              <div
                className={'platform ' + (isMobile && 'mobile')}
                onClick={() => {
                  window.open(
                    'https://www.vrbo.com/en-ca/cottage-rental/p3575497vb',
                    '_blank'
                  );
                }}
              >
                <img
                  src="assets/vrbo.webp"
                  width="150"
                  height="100"
                  alt="vrbo"
                  title="vrbo"
                  loading="lazy"
                />
              </div>
              <div
                className={'platform ' + (isMobile && 'mobile')}
                onClick={() => {
                  window.open(
                    'https://bnbingreece.com/en/room/10156',
                    '_blank'
                  );
                }}
              >
                <img
                  src="assets/bnbingreece.webp"
                  width="110"
                  height="110"
                  alt="bnbingreece"
                  title="bnbingreece"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}
