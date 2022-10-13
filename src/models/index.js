import { API } from '../utils/config';

class IndexModel {
  getData(options) {
    const url = `getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`;
    return this.myAjax(url);
  }

  getPhoneInfo(id) {
    const url = `getPhoneInfo?id=${id}`;
    return this.myAjax(url);
  }

  myAjax(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: API.base_url + url,
        type: 'get',
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
