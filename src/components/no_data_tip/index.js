import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

class NoDataTip {
  constructor() {
    this.name = 'NoDataTip';
  }

  tpl(text) {
    return tplReplace(tpl, { text });
  }
}

export default NoDataTip;
