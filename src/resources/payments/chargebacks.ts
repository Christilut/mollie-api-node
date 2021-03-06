import { defaults, get, startsWith } from 'lodash';

import PaymentsBaseResource from './base';
import Chargeback from '../../models/Chargeback';
import List from '../../models/List';
import Payment from '../../models/Payment';
import { IGetParams, IListParams } from '../../types/payment/chargeback/params';
import { GetCallback, ListCallback } from '../../types/payment/chargeback/callback';
import Resource from '../../resource';
import NotImplementedError from '../../errors/NotImplementedError';

/**
 * The `payments_chargebacks` resource
 *
 * @since 1.1.1
 */
export default class PaymentsChargebacksResource extends PaymentsBaseResource {
  public static resource = 'payments_chargebacks';
  public static model = Chargeback;
  public apiName = 'Chargebacks API';

  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public all = this.list;
  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   *
   * @public ✓ This method is part of the public API
   *
   * @alias list
   */
  public page = this.list;

  /**
   * Get a Payment Chargeback by ID
   *
   * @param id - Chargeback ID
   * @param params - Get Payment Chargeback parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The found Payment Chargeback object
   *
   * @since 1.1.1
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/get-chargeback
   *
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams | GetCallback, cb?: GetCallback): Promise<Chargeback> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const paymentId = get(params, 'paymentId') || this.parentId;
      if (!startsWith(id, Chargeback.resourcePrefix)) {
        Resource.createApiError('The chargeback id is invalid', typeof params === 'function' ? params : cb);
      }
      if (!startsWith(paymentId, Payment.resourcePrefix)) {
        Resource.createApiError('The payment id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(paymentId);

      return super.get(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Chargeback>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { paymentId, ...parameters } = defaults(params, { paymentId: this.parentId });
    if (!startsWith(id, Chargeback.resourcePrefix)) {
      Resource.createApiError('The chargeback id is invalid');
    }
    if (!startsWith(paymentId, Payment.resourcePrefix)) {
      Resource.createApiError('The payment id is invalid');
    }
    this.setParentId(paymentId);

    return (super.get(id, parameters, cb) as unknown) as Promise<Chargeback>;
  }

  /**
   * Retrieve a list of Payment Chargebacks
   *
   * @param params - Retrieve Payment Chargebacks list parameters
   * @param cb - Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found Payment Chargebacks
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/chargebacks-api/list-chargebacks
   *
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Chargeback>> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const paymentId = get(params, 'paymentId') || this.parentId;
      if (!startsWith(paymentId, Payment.resourcePrefix)) {
        Resource.createApiError('The payment id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(paymentId);

      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Chargeback>>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { paymentId, ...parameters } = defaults(params, { paymentId: this.parentId });
    if (!startsWith(paymentId, Payment.resourcePrefix)) {
      Resource.createApiError('The payment id is invalid');
    }
    this.setParentId(paymentId);

    return super.list(parameters, cb);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async create(): Promise<Chargeback> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async update(): Promise<Chargeback> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async cancel(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }

  /**
   * @deprecated 2.0.0. This method is not supported by the v2 API.
   */
  public async delete(): Promise<boolean> {
    throw new NotImplementedError('This method does not exist', this.apiName);
  }
}
