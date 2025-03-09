import Head from 'next/head';

/**
 * Rendered in case if we have 404 error
 */
const NotFound2 = (): JSX.Element => (
  <>
    <Head>
      <title>500: ERROR</title>
    </Head>
    <div style={{ padding: 10 }}>
      <h1>Crashed</h1>
      <p>Crashed</p>
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

export default NotFound2;
