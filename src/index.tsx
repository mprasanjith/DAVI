import App from './App';
import initializeI18Next from './i18n';
import { GlobalErrorBoundary } from './components/ErrorBoundary';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import { EtherSWRManager } from 'components/EtherSWRManager';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { chains, providers } from 'provider';
import { getConnectors } from 'provider/wallets';
import EnsureReadOnlyConnection from 'components/Web3Modals/EnsureReadOnlyConnection';
import SyncRouterWithWagmi from 'components/Web3Modals/SyncRouterWithWagmi';

const { provider, webSocketProvider } = configureChains(chains, providers);

const client = createClient({
  autoConnect: true,
  connectors: getConnectors(chains),
  provider,
  webSocketProvider,
});

initializeI18Next();

moment.updateLocale('en', {
  relativeTime: {
    s: '1 second',
    m: '1 minute',
    h: '1 hour',
    d: '1 day',
  },
});

const Root = () => {
  return (
    <GlobalErrorBoundary>
      <WagmiConfig client={client}>
        <HashRouter>
          <SyncRouterWithWagmi>
            <EtherSWRManager>
              <>
                <App />
                <EnsureReadOnlyConnection />
              </>
            </EtherSWRManager>
          </SyncRouterWithWagmi>
        </HashRouter>
      </WagmiConfig>
    </GlobalErrorBoundary>
  );
};
const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement);
root.render(<Root />);
// ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
