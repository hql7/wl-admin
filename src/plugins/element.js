import Vue from "vue";
import { 
  Button, 
  Menu, 
  Submenu, 
  MenuItem, 
  MenuItemGroup, 
  Scrollbar,
  Main,
  Container,
  Header,
  Dialog,
  Aside,
  Footer,
  Form,
  FormItem,
  Input,
  ColorPicker,
  Option,
  Select,
  Tabs,
  TabPane,
  Icon
} from "element-ui";

Vue.prototype.$ELEMENT = { size: 'small' };

Vue.use(Menu);
Vue.use(Button);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Scrollbar);
Vue.use(MenuItemGroup);
Vue.use(Main);
Vue.use(Container);
Vue.use(Header);
Vue.use(Dialog);
Vue.use(Aside); 
Vue.use(Footer);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(ColorPicker);
Vue.use(Option);
Vue.use(Select);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Icon);

