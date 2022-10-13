import tpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';
import './index.scss';
import { debounce, tplReplace, trimSpace } from '../../utils/tools';
import Box from '../Box';
import NoDataTip from '../no_data_tip';

class Tab {
  constructor(el, data, keyword) {
    this.name = 'Tab';
    this.$el = el;
    this.phoneData = data.phone_data;
    this.fieldData = data.field_data;

    this.keyword = keyword;
    this.init();
  }

  async init() {
    this.initData();
    await this.render();
    this.bindEvent();
  }

  initData() {
    let data = this.phoneData;
    if (this.keyword) {
      data = this.fieldDataByKeyWord(this.keyword.toLowerCase());
    }
    this.box = new Box(this.$el, data);
  }

  async render() {
    const el = tplReplace(tpl, {
      tabItem: this.getList(),
    });

    this.$el.append(el);
    await this.box.init();
    this.$box = $('.J_box');
    this.$tab = $('.J_tab_class');
    this.$input = $('#J_tab_input');
    // console.log(this.$tab[0]);
  }

  getList() {
    let list = '';
    this.fieldData.forEach(item => {
      list += tplReplace(itemTpl, {
        series: item.series_name,
        field: item.field,
      });
    });
    return list;
  }

  bindEvent() {
    this.$tab.on('click', '.tab-item', this.tabClick.bind(this));
    this.$input.on('input', debounce(this.tabInput.bind(this)));
  }

  tabClick(e) {
    const tar = e.target,
      tagName = tar.tagName;

    //清空输入框
    this.$input.val('');

    if (tagName === 'A') {
      const $item = $(tar).parent(),
        field = $item.attr('data-field'),
        data = this.filterData(field);

      this.changeTab($item);
      this.changeBoxItem(data);
    }
  }

  changeTab(tar) {
    tar.addClass('current').siblings().removeClass('current');
  }

  tabInput(e) {
    const tar = e.target,
      value = trimSpace(tar.value);
    this.changeTab(this.$tab.find('.all'));
    if (value) {
      const data = this.fieldDataByKeyWord(value);
      this.changeBoxItem(data);
    } else {
      this.changeBoxItem(this.phoneData);
    }
  }

  changeBoxItem(data) {
    let list = '';
    if (data.length > 0) {
      list = this.box.getList(data);
    } else {
      list = new NoDataTip().tpl();
    }

    this.$box.html(list);
  }

  filterData(field) {
    if (field === 'all') return this.phoneData;
    return this.phoneData.filter(item => item.field === field);
  }

  fieldDataByKeyWord(keyword) {
    return this.phoneData.filter(item => {
      if (item.phone_name.toLowerCase().includes(keyword) || item.slogan.toLowerCase().includes(keyword)) {
        return item;
      }
    });
  }
}

export default Tab;
