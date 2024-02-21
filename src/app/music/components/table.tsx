import {
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

const headers = ['タイトル', 'アーティスト', '再生時間', '動画タイトル'];

export const MusicTable = ({ addPlayList, musicList }: MusicTableProps) => (
  <TableContainer component={Paper} sx={{ height: 1 }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {headers.map(header => (
            <TableCell sx={{ fontWeight: 'bold' }} key={header}>
              {header}
            </TableCell>
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
            <TableCell>{row.formattedPlayTime}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
