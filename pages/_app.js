import AppLayout from 'components/AppLayout';

export default function AppLaytout({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps}></Component>
    </AppLayout>
  );
}
