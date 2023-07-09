import HeadphonesIcon from '@mui/icons-material/Headphones';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
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
  selectPlayMusic: (selectedMusicNum: number) => void;
};

export const PlayList = ({
  musicList,
  playingMusicNum,
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
        <ListItemButton
          // eslint-disable-next-line react/no-array-index-key
          key={`${index}${music.id}`}
          selected={playingMusicNum === index}
          onClick={() => {
            selectPlayMusic(index);
          }}
        >
          <ListItemIcon>
            {playingMusicNum === index ? <HeadphonesIcon /> : <MusicNoteIcon />}
          </ListItemIcon>
          <ListItemText primary={music.title} />
        </ListItemButton>
      ))}
    </List>
  </Box>
);
