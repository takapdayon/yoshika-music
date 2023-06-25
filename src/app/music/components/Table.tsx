import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

function createData(
  title: string,
  artist: string,
  playTime: string,
  youtubeTitle: string,
) {
  return { title, artist, playTime, youtubeTitle };
}

const rows = [
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
  createData('ラビットホール', 'deco*27', '3:02', 'テスト的な何がし'),
];

const headers = ['タイトル', 'アーティスト', '再生時間', '動画タイトル'];
export const MusicTable = () => (
  <TableContainer component={Paper} sx={{ maxHeight: 1 }}>
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
        {rows.map((row, i) => (
          <TableRow
            key={`${row.title}${row.playTime}${row.youtubeTitle}${i}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.title}
            </TableCell>
            <TableCell>{row.artist}</TableCell>
            <TableCell>{row.playTime}</TableCell>
            <TableCell>{row.youtubeTitle}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
