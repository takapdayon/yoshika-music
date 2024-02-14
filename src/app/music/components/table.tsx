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

// function createData(
//   id: string,
//   youtubeUrl: string,
//   title: string,
//   artist: string,
//   playStartTime: number,
//   playEndTime: number,
//   youtubeTitle: string,
// ) {
//   return {
//     id,
//     youtubeUrl,
//     title,
//     artist,
//     playStartTime,
//     playEndTime,
//     youtubeTitle,
//   } as InputMusic;
// }

// const rows = [
//   createData(
//     '1',
//     'r12NHJD7i9Y',
//     'おじゃま虫',
//     'DECO*27',
//     276,
//     535,
//     '【歌ﾗｼﾞｵ/singing radio】寝起きの気まぐれ歌枠【Δ.DELUTAYA】',
//   ),
//   createData(
//     '2',
//     'r12NHJD7i9Y',
//     '夕景イエスタデイ',
//     'じん',
//     594,
//     680,
//     '【歌ﾗｼﾞｵ/singing radio】寝起きの気まぐれ歌枠【Δ.DELUTAYA】',
//   ),
//   createData(
//     '3',
//     'r12NHJD7i9Y',
//     'シリョクケンサ',
//     '40mP',
//     903,
//     1160,
//     '【歌ﾗｼﾞｵ/singing radio】寝起きの気まぐれ歌枠【Δ.DELUTAYA】',
//   ),
//   createData(
//     '4',
//     'r12NHJD7i9Y',
//     '曖昧さ回避',
//     'ポリスピカデリー',
//     1342,
//     1540,
//     '【歌ﾗｼﾞｵ/singing radio】寝起きの気まぐれ歌枠【Δ.DELUTAYA】',
//   ),
//   createData(
//     '5',
//     'r12NHJD7i9Y',
//     'ビースト・ダンス',
//     '和田たけあき',
//     1953,
//     2151,
//     '【深夜の歌枠/singing stream】みんな寝る❔🎵【Δ.DELUTAYA】',
//   ),
//   createData(
//     '6',
//     'besuSojWkAg',
//     'No title',
//     'REOL',
//     3250,
//     3494,
//     '【深夜の歌枠/singing stream】みんな寝る❔🎵【Δ.DELUTAYA】',
//   ),
//   createData(
//     '7',
//     'besuSojWkAg',
//     'アヤノの幸福理論',
//     'じん',
//     4512,
//     4842,
//     '【深夜の歌枠/singing stream】みんな寝る❔🎵【Δ.DELUTAYA】',
//   ),
//   createData(
//     '8',
//     'besuSojWkAg',
//     '忘れじの言の葉',
//     '未来古代楽団',
//     5076,
//     5311,
//     '【深夜の歌枠/singing stream】みんな寝る❔🎵【Δ.DELUTAYA】',
//   ),
//   createData(
//     '9',
//     'besuSojWkAg',
//     'いかないで',
//     '想太',
//     1260,
//     1450,
//     '【深夜の歌枠/singing stream】みんな寝る❔🎵【Δ.DELUTAYA】',
//   ),
//   createData(
//     '10',
//     'BQOApjsgi8I',
//     'ポリリズム',
//     'Perfume',
//     303,
//     556,
//     '【歌枠】久しぶり【Singing❣】',
//   ),
//   createData(
//     '11',
//     'BQOApjsgi8I',
//     'とても素敵な六月でした',
//     'Eight',
//     787,
//     1063,
//     '【歌枠】久しぶり【Singing❣】',
//   ),
//   createData(
//     '12',
//     'BQOApjsgi8I',
//     '幸せになる隠しコマンドがあるらしい',
//     'うたたP',
//     1838,
//     2060,
//     '【歌枠】久しぶり【Singing❣】',
//   ),
//   createData(
//     '13',
//     'BQOApjsgi8I',
//     '妄想税',
//     'DECO*27',
//     3735,
//     3948,
//     '【歌枠】久しぶり【Singing❣】',
//   ),
//   createData(
//     '14',
//     'BQOApjsgi8I',
//     'CH4NGE',
//     'Giga',
//     5296,
//     5429,
//     '【歌枠】久しぶり【Singing❣】',
//   ),
//   createData(
//     '15',
//     'BQOApjsgi8I',
//     'CH4NGE',
//     'Giga',
//     5296,
//     5429,
//     '【歌枠】久しぶり【Singing❣】',
//   ),
// ];

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
            <TableCell component="th" scope="row">
              {row.title}
            </TableCell>
            <TableCell>{row.artist}</TableCell>
            <TableCell>{row.playEndTime - row.playStartTime}</TableCell>
            <TableCell>{row.youtubeTitle}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
