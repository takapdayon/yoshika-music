import DeleteIcon from '@mui/icons-material/Delete';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { IconButton, ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';

import { MusicType } from '@/types';

type PlayListProps = {
  musicList: MusicType[];
  playingMusicNum: number;
  delPlayList: (index: number) => void;
  selectPlayMusic: (selectedMusicNum: number) => void;
};

export const PlayList = ({
  musicList,
  playingMusicNum,
  delPlayList,
  selectPlayMusic,
}: PlayListProps) => (
  <Box sx={{ width: 1, height: 1 }} component={Paper}>
    <List
      component="nav"
      aria-label="main mailbox folders"
      subheader={<ListSubheader>再生リスト</ListSubheader>}
      sx={{ overflow: 'auto', maxHeight: 1 }}
    >
      {musicList.map((music, index) => (
        <ListItem
          // eslint-disable-next-line react/no-array-index-key
          key={`${index}${music.id}`}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => delPlayList(index)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemButton
            selected={playingMusicNum === index}
            onClick={() => {
              selectPlayMusic(index);
            }}
          >
            <ListItemIcon>
              {playingMusicNum === index ? (
                <HeadphonesIcon />
              ) : (
                <MusicNoteIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={music.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);
