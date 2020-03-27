import Vue from "vue";

import WlGantt from 'wl-gantt'
import "wl-gantt/lib/wl-gantt.css"
import WlExplorer from "wl-explorer";
import "wl-explorer/lib/wl-explorer.css"
import WlSelect from "wl-vue-select";
import "wl-vue-select/lib/wl-vue-select.css"
import WlTreeTransfer from 'wl-tree-transfer' 
import 'wl-tree-transfer/lib/wl-tree-transfer.css' 

Vue.use(WlTreeTransfer)
Vue.use(WlSelect);
Vue.use(WlExplorer);
Vue.use(WlGantt)