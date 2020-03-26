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
  Icon,
  Message,
  MessageBox,
  Table,
  TableColumn,
  DatePicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Upload,
  Tree,
  Popover,
  Autocomplete
} from "element-ui";


Vue.use(Autocomplete);
Vue.use(Popover);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
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
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);

/**
 * message方法 默认可关闭
 * @param {*} options 消息 | 配置项
 */
function wlMessage(options) {
  Object.prototype.toString.call(options) === '[object Object]'
    ? Message({
      showClose: true,
      ...options
    })
    : Message({
      showClose: true,
      message: options
    })
}

/**
 * 确认框，默认确定取消按钮，警告状态
 * @param {*} message 提示语
 * @param {*} title 标题
 * @param {*} options 配置
 */
function wlConfirm(message, title = "提示", options = {}) {
  let _options = {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    ...options
  }
  return MessageBox.confirm(message, title, _options)
}

Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$message = wlMessage;
Vue.prototype.$confirm = wlConfirm;