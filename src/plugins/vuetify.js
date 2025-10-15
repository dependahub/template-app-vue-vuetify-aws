import 'vuetify/styles';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

/* optional italic styles */
import '@fontsource/roboto/100-italic.css';
import '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/500-italic.css';
import '@fontsource/roboto/700-italic.css';
import '@fontsource/roboto/900-italic.css';
import '@mdi/font/css/materialdesignicons.css';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: 'mdi',
	},
});
