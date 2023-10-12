import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.css';

import {createApp} from 'vue';
import App from './App.vue';

// only needed if you use ag-grid enterprise features
// import "ag-grid-enterprise";
// import {LicenseManager} from "ag-grid-enterprise";
// LicenseManager.setLicenseKey("your license key");

const app = createApp(App)
app.mount("#app")
