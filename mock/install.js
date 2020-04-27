
import { mockXHR } from "wl-http"

import menu from './data/menu'
import login from "./data/login"
import explorer from './data/explorer'

const mocks = [
  {
    intercept: true,
    fetchs: login
  },
  {
    intercept: true,
    fetchs: menu
  },
  {
    intercept: true,
    fetchs: explorer
  }
];

mockXHR(mocks);
