import tpl from './tpl/index.tpl';
import imgTpl from './tpl/imgItem.tpl';
import paginationTpl from './tpl/paginationItem.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

class Carousel {
  constructor(el, data) {
    this.name = 'Carousel';
    this.$el = el;
    this.data = data;
    this.dataLen = this.data.length;
    this.currentIdx = 0;
    this.timer = null;
    this.init();
  }

  async init() {
    await this.render();
    this.autoPlay();
    this.addEvent();
  }

  async render() {
    const el = tplReplace(tpl, {
      imgItem: this.getTpl()._imgTpl,
      paginationItem: this.getTpl()._paginationTpl,
    });

    await $(this.$el).append(el);

    this.$car = $('.J_carousel');
    this.$carImg = this.$car.find('.car-img');
    this.$carPagination = this.$car.find('.car-pagination');
  }

  getTpl() {
    let tpl = {
      _imgTpl: '',
      _paginationTpl: '',
    };
    this.data.forEach((item, idx) => {
      tpl._imgTpl += tplReplace(imgTpl, {
        id: item.phone_id,
        pic: item.pic,
        name: item.alt,
        isCurrent: idx === this.currentIdx ? 'current' : '',
      });

      tpl._paginationTpl += tplReplace(paginationTpl, {
        isActive: idx === this.currentIdx ? 'active' : '',
      });
    });

    return tpl;
  }

  autoPlay() {
    this.timer = setInterval(() => {
      this.setIndex('next');
    }, 3000);
  }

  setIndex(dir) {
    let oldIdx = 0;
    switch (dir) {
      case 'next':
        oldIdx = this.currentIdx;
        this.currentIdx++;
        if (this.currentIdx > this.dataLen - 1) {
          this.currentIdx = 0;
        }
        break;
      case 'pre':
        oldIdx = this.currentIdx;
        this.currentIdx--;

        if (this.currentIdx < 0) {
          this.currentIdx = this.dataLen - 1;
        }
        break;
      default:
        break;
    }
    this.changeItem(oldIdx, this.currentIdx);
  }

  changeItem(oldIdx, newIdx) {
    this.$carImg.eq(oldIdx).fadeOut(800);
    this.$carImg.eq(newIdx).fadeIn(800);

    this.$carPagination.eq(newIdx).addClass('active');
    this.$carPagination.eq(oldIdx).removeClass('active');
  }

  addEvent() {
    this.$car.on('mouseenter', this.mouseInOut.bind(this));
    this.$car.on('mouseleave', this.mouseInOut.bind(this));

    this.$car.on('click', this.carClick.bind(this));
  }

  mouseInOut(e) {
    const type = e.type;
    switch (type) {
      case 'mouseenter':
        clearInterval(this.timer);
        break;
      case 'mouseleave':
        this.autoPlay();
        break;
      default:
        break;
    }
  }

  carClick(e) {
    const tar = e.target,
      className = tar.className.trim(),
      $tar = $(tar);
    switch (className) {
      case 'car-pagination':
        const oldIdx = this.currentIdx;
        this.currentIdx = $tar.index();
        this.changeItem(oldIdx, this.currentIdx);
        break;
      case 'car-btn pre':
        this.setIndex('pre');
        break;
      case 'car-btn next':
        this.setIndex('next');
        break;
      default:
        break;
    }
  }
}

export default Carousel;
