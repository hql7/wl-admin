
import WlContainer from "./wl-container/";
import WlContextmenu from "./wl-contextmenu/";

const components = [WlContainer, WlContextmenu];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  WlContainer,
  WlContextmenu
};