import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { Payment } from 'src/entities/payment.entity';
import { DataSource, Repository } from 'typeorm';
import * as qs from 'qs';

@Injectable()
export class PaymentRepository {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}
  config = {
    app_id: '2554', // app_id của ngừoi nhận tiền (ngừoi đăng ký zalopay)
    key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
    key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create', // chạy với dev
  };
  async zalopayRepo(data: any): Promise<any> {
    const { total_amount } = data;
    console.log(data);

    const items =
      data.items.length > 0
        ? data.items.map((item) => ({
            product_id: item.product.product_id,
            size: item.size,
            color: item.color,
          }))
        : [{}];

    try {
      const embed_data = {
        redirecturl: 'http://localhost:5173/trang-thai-thanh-toan',
      };

      const transID = Math.floor(Math.random() * 1000000);
      const order = {
        app_id: this.config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
        app_user: 'user123',
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: total_amount,
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: '',
        callback_url: 'https://3bb3-1-53-8-226.ngrok-free.app/payment/callback', // sau khi thanh toán sẽ gọi đến api này
      };

      const data =
        this.config.app_id +
        '|' +
        order.app_trans_id +
        '|' +
        order.app_user +
        '|' +
        order.amount +
        '|' +
        order.app_time +
        '|' +
        order.embed_data +
        '|' +
        order.item;
      order['mac'] = CryptoJS.HmacSHA256(data, this.config.key1).toString();
      const result = await axios.post(this.config.endpoint, null, {
        params: order,
      });
      return { ...result.data, app_trans_id: order.app_trans_id };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async zalopayCallbackRepo(data: any): Promise<any> {
    try {
      let result = {};
      let dataStr = data.data;
      let reqMac = data.mac;

      let mac = CryptoJS.HmacSHA256(dataStr, this.config.key2).toString();
      console.log('mac =', mac);

      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result['return_code'] = -1;
        result['return_message'] = 'mac not equal';
      } else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng ở đây
        // let dataJson = JSON.parse(dataStr, this.config.key2);
        let dataJson = JSON.parse(dataStr);
        console.log(
          "update order's status = success where app_trans_id =",
          dataJson['app_trans_id']
        );

        result['return_code'] = 1;
        result['return_message'] = 'success';
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async zalopayCheckStatus(id: any): Promise<any> {
    const { app_trans_id } = id;
    console.log(app_trans_id);

    try {
      let postData = {
        app_id: this.config.app_id,
        app_trans_id,
      };

      let data =
        postData.app_id + '|' + postData.app_trans_id + '|' + this.config.key1;
      postData['mac'] = CryptoJS.HmacSHA256(data, this.config.key1).toString();

      let postConfig = {
        method: 'post',
        url: 'https://sb-openapi.zalopay.vn/v2/query',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(postData),
      };
      const result = await axios(postConfig);
      return result.data;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
