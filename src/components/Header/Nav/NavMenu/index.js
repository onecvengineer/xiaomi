import navMenuTpl from './tpl/navMenu.tpl';
import navMenuItemTpl from './tpl/navMenuItem.tpl';
import './index.scss';
class NavMenu {
  constructor() {
    this.name = 'NavMenu';
    this.tpl = navMenuTpl;
    this.itemTpl = navMenuItemTpl;
  }
}

export default NavMenu;
