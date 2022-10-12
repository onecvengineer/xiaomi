import { tplReplace } from '../../../utils/tools';
import navTpl from './tpl/nav.tpl';
import navItemTpl from './tpl/navItem.tpl';
import './index.scss';
import NavMenu from './NavMenu';

class Nav {
  constructor() {
    this.name = 'nav';
    this.navMenu = new NavMenu();
    this.cache = {};
  }

  tpl(data) {
    let list = '';
    data.forEach(
      item =>
        (list += tplReplace(navItemTpl, {
          series: item.series_name,
          field: item.field,
        }))
    );
    return tplReplace(navTpl, {
      navItem: list,
      navMenu: this.navMenu.tpl(),
    });
  }

  mouseenter(e) {
    const tar = e.currentTarget,
      field = $(tar).attr('data-field'),
      data = e.data,
      phoneData = data.phoneData,
      nav = data.nav;

    let list = '';
    if (nav.cache[field]) {
      console.log('cache');
      list = nav.cache[field];
    } else {
      const currentPhoneData = phoneData.filter(value => field === value.field);
      currentPhoneData.forEach(item => {
        list += tplReplace(nav.navMenu.itemTpl, {
          pic: JSON.parse(item.pics)[0][0][0],
          phone_name: item.phone_name,
          default_price: item.default_price,
        });
      });
      nav.cache[field] = list;
    }

    $('.J_nav_menu').html(list);
  }
}

export default Nav;
