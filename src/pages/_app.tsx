import { Raleway } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";
import '../app/globals.css';


const RalewayFont = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
      <I18nextProvider i18n={i18n}>
      <div className={RalewayFont.className}>
          <Component {...pageProps} />
        </div>
        </I18nextProvider>
       
      </Provider>
    </SessionProvider>
  );
};

export default appWithTranslation(MyApp);
