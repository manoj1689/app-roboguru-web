import { Raleway } from 'next/font/google';
import { Provider } from 'react-redux';
import  store  from '../redux/store';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import "../app/globals.css";
const RalewayFont = Raleway({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'], // Specify weights you need (e.g., regular and bold)
});



const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
      <div className={RalewayFont.className}>
      <Component {...pageProps} />
    </div>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
