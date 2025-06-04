import React, { useContext, useState } from 'react';
import TopBar from './TopBar';
import MenuDrawer from './MenuDrawer';
import LangContext from '../LangContext';

const TopBarLayoutWrapper: React.FC = () => {
  const lang = useContext(LangContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      <TopBar lang={lang} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <MenuDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lang={lang}
      />
    </>
  );
};

export default TopBarLayoutWrapper;
