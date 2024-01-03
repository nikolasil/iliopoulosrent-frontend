import React, { useState, useEffect } from 'react';
import './informations.scss';
import { isMobile } from 'react-device-detect';
import Categories from './Categories';
import items from './items.json';
export default function Informations({ language }) {
  const [list, setList] = useState({});
  useEffect(() => {
    setList(items.find((i) => i.language === language.id).data);
  }, [language]);
  return (
    <div className="informations" id="informations">
      <h1>{list.title}</h1>
      <h2>{list.subTitle}</h2>
      <div className="categories">
        {list.docs && <Categories docs={list.docs} />}
      </div>
    </div>
  );
}
