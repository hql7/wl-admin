import Vue from "vue";

import WlGantt from "wl-gantt";
import "wl-gantt/lib/wl-gantt.css";
import WlExplorer from "wl-explorer";
import "wl-explorer/lib/wl-explorer.css";
import WlSelect from "wl-vue-select";
import "wl-vue-select/lib/wl-vue-select.css";
import WlBimViewer from "wl-bim-viewer";
import "wl-bim-viewer/lib/wl-bim-viewer.css";
import WlAddress from "wl-address";
import "wl-address/lib/wl-address.css";

Vue.use(WlAddress);
Vue.use(WlBimViewer);
Vue.use(WlSelect);
Vue.use(WlExplorer);
Vue.use(WlGantt);
