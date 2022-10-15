import { getNowTime, getRandomId } from '../utils/tools';

class OrderModel {
  addCartInfo(info, initCallBack, purchasedCallBack, successCallBack) {
    const cartList = this.getCartList() || [],
      orderList = this.getOrderList() || [];

    if (orderList.length > 0) {
      const flag = _isInit(orderList, info);
      if (flag) {
        purchasedCallBack();
        return;
      }
    }
    if (cartList.length > 0) {
      const isInit = _isInit(cartList, info);
      if (isInit) {
        initCallBack();
        return;
      }
    }

    _addToCart(cartList, info);
    successCallBack && successCallBack();
  }

  purchase(info, initCallBack, successCallBack) {
    let orderList = this.getOrderList() || [],
      cartList = this.getCartList() || [];
    if (orderList) {
      const isInit = _isInit(orderList, info);
      if (isInit) {
        initCallBack();
        return;
      }
    }

    _addToOrder(orderList, info);
    successCallBack && successCallBack();

    removeInfoFromCart.call(this, info);

    function removeInfoFromCart(tar) {
      if (cartList.length > 0) {
        cartList = cartList.filter(item => {
          if (item.id === item.id && item.color === tar.color && item.version === tar.version) {
            return false;
          } else {
            return item;
          }
        });

        this.setCartList(cartList);
      }
    }
  }

  purchaseAll(orderList) {
    const _orderList = this.getOrderList() || [];
    orderList.forEach(item => {
      _addToOrder(_orderList, item);
      this.removeCartInfo(item.cartId);
    });
  }

  getCartList() {
    const cartList = localStorage.getItem('cartList'),
      arr = JSON.parse(cartList);
    return arr;
  }

  setCartList(cartList) {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }

  removeCartInfo(cartId) {
    let cartList = this.getCartList() || [];
    cartList = cartList.filter(item => item.cartId !== cartId);
    this.setCartList(cartList);
  }

  getOrderList() {
    const orderList = localStorage.getItem('orderList'),
      arr = JSON.parse(orderList);
    return arr;
  }
}

function _addToCart(arr, tar) {
  tar.cartId = getRandomId(6);
  tar.checked = true;
  arr.push(tar);
  localStorage.setItem('cartList', JSON.stringify(arr));
}

function _addToOrder(arr, tar) {
  tar.time = getNowTime();
  tar.orderId = getRandomId(6);
  arr.push(tar);
  localStorage.setItem('orderList', JSON.stringify(arr));
}

function _isInit(arr, tar) {
  if (arr.length <= 0) return false;
  console.log(1);
  return arr.some(item => item.id === tar.id && item.color === tar.color && item.version === tar.version);
}

export default OrderModel;
