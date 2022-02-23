import Devit from '@c/Devit';

export default function DevitPage(props) {
  console.log(props);
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  );
}

export async function getServerSideProps() {}

DevitPage.getInitialProps = (context) => {
  console.log('getStaticProps');
  const { query, res } = context;
  const { id } = query;
  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json();
    if (res) {
      // res.writeHead(301, { location: '/home' }).end();
      res.writeHead(404).end();
    }
  });
};
