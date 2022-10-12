import tpl from './index.tpl';
import './index.scss';
import { trimSpace } from '../../../utils/tools';

class Search {
  constructor() {
    this.name = 'Search';
    this.tpl = tpl;
  }
  search(e) {
    const value = trimSpace($('#search-input').val()),
      action = $('.search').attr('action');

    if (value) {
      const url = action + '?keyword=' + value;
      console.log(url);
      window.open(url);
    }
  }
}

export default Search;
