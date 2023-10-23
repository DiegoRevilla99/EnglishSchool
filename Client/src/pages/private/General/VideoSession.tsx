import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Session from "@/models/Session";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { getSessionName } from "@/utils";

import ImageBanner from "@/assets/images/meetingHolder.jpg";

import ZoomFrame from "@/components/Zoom/Frame";
import HeroBanner from "@/components/Template/Header/HeroBannerForTables";
import SessionMaterial from "@/components/Forms/Session/SessionMaterial";

const VideoSession = () => {
  const [sessionSelected, setSessionSelected] = useState<Session>();
  const [tab, setTab] = useState("zoom");
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { session } = location.state;
      setSessionSelected(session);
    }
  }, []);

  return (
    <div>
      <HeroBanner
        title={getSessionName(sessionSelected)}
        image={ImageBanner}
        imagePosition="center"
      />

      <div className="main-cols-wrapper">
        <Box sx={{ width: 1, height: "100%", padding: 2 }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={(e, v) => setTab(v)} aria-label="videoSession">
                <Tab label="Videollamada" value="zoom" />
                <Tab label="Material de clase" value="material" />
              </TabList>
            </Box>
            <TabPanel value="zoom" sx={{ height: "80vh" }}>
              <ZoomFrame session={sessionSelected} />
            </TabPanel>
            <TabPanel value="material">
              <SessionMaterial lessons={sessionSelected?.lessons ?? []} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default VideoSession;
