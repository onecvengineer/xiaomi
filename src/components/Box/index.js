import tpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';
import titleTpl from './tpl/title.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';
import NoDataTip from '../no_data_tip';

class Box {
  constructor(el, data, title) {
    this.name = 'Box';
    this.$el = el;
    this.title = title;
    this.data = data;
  }

  async init() {
    await this.render();
  }
  async render() {
    let boxTitle = '';
    if (this.title) {
      boxTitle = tplReplace(titleTpl, { title: this.title });
    }
    const el = tplReplace(tpl, {
      boxTitle,
      boxItem: this.getList(this.data) || new NoDataTip().tpl(),
    });
    this.$el.append(el);
  }

  getList(data) {
    let list = '';
    data.forEach((item, idx) => {
      list += tplReplace(itemTpl, {
        isFirst: idx % 5 === 0 ? 'first' : '',
        id: item.id,
        pic: JSON.parse(item.pics)[0][0][0],
        phoneName: item.phone_name,
        desc: item.slogan.substr(0, 10),
        price: item.default_price,
      });
    });

    return list;
  }
}

export default Box;
