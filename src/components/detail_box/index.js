import tpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

class DetailBox {
  constructor(el, data) {
    this.name = 'DetailBox';
    this.$el = el;
    this.data = data;

    this.init();
  }

  async init() {
    this.initData();
    await this.render();
    this.bindEvent();
  }

  initData() {
    const data = this.data;
    data.color = JSON.parse(data.color);
    data.version_info = JSON.parse(data.version_info);
    data.pics = JSON.parse(data.pics);

    this.pickedInfo = {
      id: data.id,
      name: data.phone_name,
      version: data.version_info[0].version,
      price: data.version_info[0].price,
      color: data.color[0],
      img: data.pics[0][0][0],
    };
  }

  async render() {
    const info = this.pickedInfo,
      el = tplReplace(tpl, {
        pic: info.img,
        phone_name: info.name,
        desc: this.data.slogan,
        price: info.price,
        version: this.getList().visionList,
        color: this.getList().colorList,
      });

    await this.$el.append(el);
  }

  getList() {
    let list = { visionList: '', colorList: '' };
    this.data.version_info.forEach((v, idx) => {
      list.visionList += tplReplace(itemTpl, {
        isCurrent: idx === 0 ? 'current' : '',
        content: v.version,
      });
    });

    this.data.color.forEach((c, idx) => {
      list.colorList += tplReplace(itemTpl, {
        isCurrent: idx === 0 ? 'current' : '',
        content: c,
      });
    });

    return list;
  }

  bindEvent() {
    const $version = $('.J_version'),
      $color = $('.J_color');

    $version.on('click', '.op-item', this.versionSelect.bind(this));
    $color.on('click', '.op-item', this.colorSelect.bind(this));
  }

  versionSelect(e) {
    const tar = e.target,
      $tar = $(tar),
      idx = $tar.index() - 1,
      version = this.data.version_info[idx].version,
      price = this.data.version_info[idx].price;

    $('.J_price').html(price + '元');
    this.pickedInfo.version = version;
    this.pickedInfo.price = price;
    this.changeCurrent($tar);
  }
  colorSelect(e) {
    const tar = e.target,
      $tar = $(tar),
      idx = $tar.index(),
      color = this.data.color[idx - 1],
      img = this.data.pics[idx - 1][idx - 1][0];

    $('.J_img').attr('src', img);
    this.pickedInfo.color = color;
    this.pickedInfo.img = img;
    this.changeCurrent($tar);
  }

  changeCurrent(tar) {
    tar.addClass('current').siblings().removeClass('current');
  }
}

export default DetailBox;
