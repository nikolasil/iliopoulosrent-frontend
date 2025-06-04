"use client";
import React, { useState } from 'react';
import TopBar from './TopBar';
import MenuDrawer from './MenuDrawer';

const TopBarLayoutWrapper: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      <TopBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default TopBarLayoutWrapper;
