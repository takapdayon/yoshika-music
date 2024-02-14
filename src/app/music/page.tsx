import { kv } from '@vercel/kv';

import ClientPage from './clientPage';
import { InputMusic, Music } from './types';

const { MUSICLIST_KEYNAME = '' } = process.env;

const getMusicList = async () => {
  console.log(MUSICLIST_KEYNAME);
  const musicListFromKV = await kv.lrange<InputMusic>(MUSICLIST_KEYNAME, 0, -1);
  console.log('log deteyone', musicListFromKV);
  return musicListFromKV.map(music => {
    const parsedMusic = Music.parse(music);
    return parsedMusic;
  });
};

const Page = async () => {
  const musicList = await getMusicList();
  return <ClientPage musicList={musicList} />;
};

export default Page;
