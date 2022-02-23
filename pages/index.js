import Head from 'next/head';
import { useEffect } from 'react';
import Button from '@c/Button';
import Github from '@c/Icons/Github';
import { loginWithGitHub } from 'firebase/client';
import { colors } from 'styles/theme';
import Logo from '@c/Icons/Logo';
import { useRouter } from 'next/router';
import useUser, { USER_STATES } from 'hooks/useUser';

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace('/home');
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch((error) => console.log(error));
  };
  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <Logo width="100" />
        <h1>Devter</h1>
        <h2>
          Talk about development
          <br /> with developers
        </h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <Github fill={colors.white} width={24} height={24} />
              Login with GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        section {
          display: grid;
          height: 100%;
          place-items: center;
          place-content: center;
        }
        h1 {
          color: ${colors.primary};
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  );
}
