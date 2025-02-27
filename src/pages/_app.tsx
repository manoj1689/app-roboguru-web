import { Raleway } from 'next/font/google';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";
import '../app/globals.css';
import AuthHandler from "../components/AuthHandler";
import { PersistGate } from 'redux-persist/integration/react';


const RalewayFont = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <div className={RalewayFont.className}>
              <AuthHandler />
              <Component {...pageProps} />
            </div>
          </I18nextProvider>

        </Provider>

      </PersistGate>

    </SessionProvider>
  );
};

export default appWithTranslation(MyApp);
