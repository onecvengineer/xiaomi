import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

class Footer {
  constructor(el) {
    this.name = 'Footer';
    this.tol = tpl;
    this.$el = el;

    this.init();
  }
  init() {
    this.render();
  }

  render() {
    this.$el.append(tplReplace(tpl));
  }
}

export default Footer;
