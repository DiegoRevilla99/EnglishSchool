import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import FilesTab from './FilesTab';
import LinksTab from './LinksTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box
          bgcolor="#e1e1e1"
          sx={{
            paddingX: 3,
            borderBottomLeftRadius: '1rem',
            borderBottomRightRadius: '1rem',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

const MaterialTabs = () => {
  const [value, setValue] = React.useState(0);

  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Archivos" />
          <Tab label="Enlaces" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FilesTab files={files} setFiles={setFiles} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LinksTab links={links} setLinks={setLinks} />
      </TabPanel>
    </Box>
  );
};

export default MaterialTabs;
