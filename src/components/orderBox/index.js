import tpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';
import './index.scss';

import OrderModel from '../../models/OrderModel';
import NoDataTip from '../no_data_tip';
import { tplReplace } from '../../utils/tools';

class OrderBox {
  constructor(el) {
    this.name = 'OrderBox';
    this.$el = el;
    this.orderModel = new OrderModel();

    this.init();
  }

  init() {
    this.initData();
    this.render();
  }

  initData() {
    this.orderList = this.orderModel.getOrderList();
  }

  render() {
    let el = '';
    if (this.orderList && this.orderList.length > 0) {
      el = tplReplace(tpl, {
        orderItem: this.getHtml(),
      });
    } else {
      el = new NoDataTip().tpl('暂无购买记录');
    }

    this.$el.append(el);
  }
  getHtml() {
    let html = '';
    this.orderList.forEach(item => {
      html += tplReplace(itemTpl, {
        orderId: item.orderId,
        link: item.link,
        img: item.img,
        name: item.name,
        version: item.version,
        color: item.color,
        price: item.price,
        time: item.time,
      });
    });

    return html;
  }
}

export default OrderBox;
