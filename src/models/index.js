import { API } from '../utils/config';

class IndexModel {
  getData(options) {
    const url = `getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: API.base_url + url,
        dataType: 'JSONP',
        jsonp: 'cb',
        success(data) {
          resolve(data);
        },
      });
    });
  }
}

export default IndexModel;
