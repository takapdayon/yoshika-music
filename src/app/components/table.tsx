import {
  Hidden,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Music, OutputMusic } from '../types';

type MusicTableProps = {
  addPlayList: (selectedMusic: OutputMusic) => void;
  musicList: OutputMusic[];
};

const headers = [
  {
    name: 'タイトル',
    responsive: true,
  },
  {
    name: 'アーティスト',
    responsive: false,
  },
  {
    name: '再生時間',
    responsive: true,
  },
  {
    name: '動画タイトル',
    responsive: false,
  },
];

export const MusicTable = ({ addPlayList, musicList }: MusicTableProps) => (
  <TableContainer component={Paper} sx={{ height: 1 }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {headers.map(header => (
            <Hidden
              {...(!header.responsive ? { mdDown: true } : {})}
              key={header.name}
            >
              <TableCell sx={{ fontWeight: 'bold' }}>{header.name}</TableCell>
            </Hidden>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {musicList.map(row => (
          <TableRow
            hover
            onClick={() => addPlayList(Music.parse(row))}
            key={row.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              cursor: 'pointer',
            }}
          >
            <TableCell
              component="th"
              scope="row"
              sx={{
                maxWidth: 300,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {row.title}
            </TableCell>
            <Hidden mdDown>
              <TableCell
                sx={{
                  maxWidth: 200,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {row.artist}
              </TableCell>
            </Hidden>
            <TableCell>{row.formattedPlayTime}</TableCell>
            <Hidden mdDown>
              <TableCell
                sx={{
                  maxWidth: 400,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {row.youtubeTitle}
              </TableCell>
            </Hidden>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
