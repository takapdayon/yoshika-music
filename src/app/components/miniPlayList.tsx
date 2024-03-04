import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { Box, IconButton, SwipeableDrawer } from '@mui/material';
import {
  KeyboardEvent,
  MouseEvent,
  SyntheticEvent,
  memo,
  useCallback,
  useState,
} from 'react';

import { PlayList, PlayListProps } from './playList';

type MiniPlayListProps = {
  isOpened: boolean;
  onToggleOpen: (open: boolean) => (event: KeyboardEvent | MouseEvent) => void;
} & PlayListProps;

const MiniPlayList = memo(
  ({ isOpened, onToggleOpen, ...playListProps }: MiniPlayListProps) => (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpened}
      onClose={onToggleOpen(false)}
      onOpen={onToggleOpen(true)}
    >
      <Box sx={{ height: '65dvh' }}>
        <PlayList {...playListProps} />
      </Box>
    </SwipeableDrawer>
  ),
);

type MiniPlayListWBProps = PlayListProps;

export const MiniPlayListWB = memo(
  ({ ...playListProps }: MiniPlayListWBProps) => {
    /*
  WB: withButtonって書くよりもなんかおしゃんな感じがした。おしゃん採用です
  */
    const [isOpened, setIsOpened] = useState(false);

    const onTogglePlayList = useCallback(
      (open: boolean) =>
        (event: SyntheticEvent | KeyboardEvent | MouseEvent) => {
          if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
              (event as React.KeyboardEvent).key === 'Shift')
          ) {
            return;
          }
          setIsOpened(open);
        },
      [],
    );

    return (
      <>
        <IconButton
          aria-label="playlist"
          onClick={onTogglePlayList(true)}
          size="small"
          sx={{
            position: 'fixed',
            bottom: 8,
            right: 8,
          }}
        >
          <PlaylistPlayIcon />
        </IconButton>
        <MiniPlayList
          isOpened={isOpened}
          onToggleOpen={onTogglePlayList}
          {...playListProps}
        />
      </>
    );
  },
);
