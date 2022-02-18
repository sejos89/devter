/* eslint-disable no-unused-expressions */
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '@c/AppLayout';
import Devit from '@c/Devit';
import Create from '@c/Icons/Create';
import { fetchLatestDevits } from 'firebase/client';
import useUser from 'hooks/useUser';
import { useEffect, useState } from 'react';
import Home from '@c/Icons/Home';
import Search from '@c/Icons/Search';
import { colors } from 'styles/theme';

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user & fetchLatestDevits().then(setTimeline);
  }, [user]);
  return (
    <>
      <AppLayout>
        <Head>
          <title>Inicio / Devter</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ avatar, content, createdAt, id, img, userId, userName }) => (
              <Devit
                avatar={avatar}
                content={content}
                createdAt={createdAt}
                id={id}
                img={img}
                key={id}
                userId={userId}
                userName={userName}
              />
            )
          )}
        </section>
        <nav>
          <Link href="/home">
            <a>
              <Home width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Search width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create width={32} height={32} stroke="#09f" />
            </a>
          </Link>
        </nav>
      </AppLayout>

      <style jsx>
        {`
          header {
            align-items: center;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
            bottom: 0;
            border-bottom: 1px solid #eee;
            height: 49px;
            position: sticky;
            top: 0;
            width: 100%;
          }

          section {
            flex: 1;
          }

          h2 {
            font-size: 21px;
            font-weight: 800;
            padding-left: 15px;
          }

          nav {
            background: #fff;
            bottom: 0;
            border-top: 1px solid #eee;
            display: flex;
            height: 49px;
            position: sticky;
            width: 100%;
          }

          nav a {
            align-items: center;
            display: flex;
            flex: 1 1 auto;
            height: 100%;
            justify-content: center;
          }

          nav a:hover {
            background: radial-gradient(#0099ff22 15%, transparent 16%);
            background-size: 180px 180px;
            background-position: center;
          }

          nav a:hover > :global(svg) {
            stroke: ${colors.primary};
          }
        `}
      </style>
    </>
  );
}
