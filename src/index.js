import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';

import { Provider } from './context/Context';

ReactDOM.render(<SpeechProvider appId="65482ce6-54eb-47cc-9a17-f43367f67b3f" language="en-US">
    <Provider>
        <App />
    </Provider>
</SpeechProvider>
    , document.getElementById('root'));