
import WlContainer from "./wl-container/";
import WlContextmenu from "./wl-contextmenu/";
import WlFadein from "./wl-fadein/";

const components = [WlContainer, WlContextmenu, WlFadein];

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
  WlContextmenu,
  WlFadein
};