<section class="cart-list container">
  <div class="list-hd clearfix">
    <div class="list-hd-item">选择</div>
    <div class="list-hd-item ">图片</div>
    <div class="list-hd-item name">名称</div>
    <div class="list-hd-item">版本</div>
    <div class="list-hd-item">颜色</div>
    <div class="list-hd-item">价格</div>
    <div class="list-hd-item">删除</div>
  </div>
  <div class="list-bd J_cart_list">
    {{cartItem}}
  </div>
</section>

<section class="cart-footer J_cart_footer container clearfix">
  <div class="left">
    <a class="lk-to-index" href="./index.html">继续购物</a>
    <span class="cart-total">已选择<i class="total-num">{{totalNum}}</i>件</span>
  </div>
  <div class="right">
    <span class="cart-price">合计: <em class="total-price">{{totalPrice}}</em>元</span>
    <button {{disabled}} class="btn" href="javascript:;">结算</button>
  </div>
</section>