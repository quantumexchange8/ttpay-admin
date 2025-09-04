import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { I18nextProvider } from 'react-i18next';
import i18n from './Composables/i18n';
import AntThemeCustomizationProvider from './Layouts/AntThemeCustomizationProvider';

const appName = import.meta.env.VITE_APP_NAME || 'TTPay Admin';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AntThemeCustomizationProvider>
                <I18nextProvider i18n={i18n}>
                    <App {...props} />
                </I18nextProvider>
            </AntThemeCustomizationProvider>
        );
    },
    progress: {
        color: '#713BFF',
    },
});
