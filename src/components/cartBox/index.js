import tpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';
import './index.scss';
import NoDataTip from '../no_data_tip';
import OrderModel from '../../models/OrderModel';
import { tplReplace } from '../../utils/tools';

class CartBox {
  constructor(el) {
    this.name = 'CartBox';
    this.$el = el;
    this.orderModel = new OrderModel();

    this.init();
  }

  async init() {
    this.initData();
    await this.render();
    this.bindEvent();
  }

  initData() {
    this.data = this.orderModel.getCartList();
    if (this.data && this.data.length > 0) {
      this.totalNum = this.getPickedList().length;
      this.totalPrice = this.getTotalPrice();
    }
  }

  async render() {
    let el = '';
    if (this.data && this.data.length > 0) {
      el = tplReplace(tpl, {
        cartItem: this.getHtml(),
        totalNum: this.totalNum,
        totalPrice: this.totalPrice,
        disabled: this.totalNum > 0 ? '' : 'disabled',
      });
    } else {
      el = new NoDataTip().tpl('您的购物车还是空的！');
    }
    await this.$el.append(el);
  }

  getHtml() {
    let html = '';
    this.data.forEach(item => {
      html += tplReplace(itemTpl, {
        checked: item.checked ? 'checked' : '',
        cartId: item.cartId,
        link: item.link,
        img: item.img,
        name: item.name,
        version: item.version,
        color: item.color,
        price: item.price,
      });
    });
    return html;
  }

  bindEvent() {
    this.$list = $('.J_cart_list');
    this.$footer = $('.J_cart_footer');

    this.$totalNum = this.$footer.find('.total-num');
    this.$totalPrice = this.$footer.find('.total-price');
    this.$btn = this.$footer.find('.btn');
    this.$btn.on('click', this.order.bind(this));
    this.$list.on('click', this.clickHandle.bind(this));
  }
  order() {
    const orderList = this.getPickedList();
    if (orderList.length > 0) {
      this.orderModel.purchaseAll(orderList);
      window.location.href = './order.html';
    }
  }

  clickHandle(e) {
    const tar = e.target,
      $tar = $(tar).parent().parent(),
      tagName = tar.tagName;
    const id = $tar.attr('data-id');
    switch (tagName) {
      case 'INPUT':
        if (tar.checked) {
          this.updatedFooter(id, 'add');
        } else {
          this.updatedFooter(id, 'minus');
        }
        break;
      case 'BUTTON':
        $tar.remove();
        this.updatedFooter(id, 'minus');
        this.orderModel.removeCartInfo(id);
        break;
      default:
        break;
    }
  }

  updatedFooter(id, action) {
    switch (action) {
      case 'add':
        this.data.some(item => {
          if (item.cartId === id) {
            item.checked = true;
            this.totalNum++;
            this.totalPrice += item.price;
          }
        });
        break;
      case 'minus':
        this.data.some(item => {
          if (item.cartId === id) {
            item.checked = false;
            this.totalNum--;
            this.totalPrice -= item.price;
          }
        });
        break;
      default:
        break;
    }

    this.totalNum > 0 ? this.$btn.attr('disabled', false) : this.$btn.attr('disabled', true);
    this.$totalNum.text(this.totalNum);
    this.$totalPrice.text(this.totalPrice);
    this.orderModel.setCartList(this.data);
  }

  getTotalPrice() {
    let price = 0;
    this.data.forEach(item => {
      if (item.checked) {
        price += item.price;
      }
    });

    return price;
  }

  getPickedList() {
    return this.data.filter(item => item.checked === true);
  }
}

export default CartBox;
