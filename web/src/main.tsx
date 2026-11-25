import { createRoot } from 'react-dom/client';
import App from './components/App';

const root = document.querySelector('div');

if (root !== null) createRoot(root).render(<App />);
