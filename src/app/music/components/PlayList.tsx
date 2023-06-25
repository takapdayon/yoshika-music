import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useState } from 'react';

const PlayListTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs variant="fullWidth" value={value} onChange={handleChange}>
      <Tab icon={<MusicNoteIcon />} />
      <Tab icon={<PlaylistAddIcon />} />
    </Tabs>
  );
};

export const PlayList = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxHeight: 1 }} component={Paper}>
      <PlayListTabs />
      <Box sx={{ maxHeight: 1 }}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          subheader={<ListSubheader>次に再生</ListSubheader>}
          sx={{ overflow: 'auto' }}
        >
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={event => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={event => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={event => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          {/* <ListItemButton
            selected={selectedIndex === 5}
            onClick={event => handleListItemClick(event, 5)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 6}
            onClick={event => handleListItemClick(event, 6)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 7}
            onClick={event => handleListItemClick(event, 7)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 8}
            onClick={event => handleListItemClick(event, 8)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton> */}
        </List>
      </Box>
    </Box>
  );
};
