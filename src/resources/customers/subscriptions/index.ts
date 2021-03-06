import { defaults, get, startsWith } from 'lodash';

import Resource from '../../../resource';
import CustomersSubscriptionsBaseResource from '../base';
import Subscription from '../../../models/Subscription';
import List from '../../../models/List';
import { ICancelParams, ICreateParams, IGetParams, IListParams, IUpdateParams } from '../../../types/subscription/params';
import { CancelCallback, CreateCallback, GetCallback, ListCallback, UpdateCallback } from '../../../types/subscription/callback';
import Customer from '../../../models/Customer';

/**
 * The `customers_subscriptions` resource.
 *
 * @since 1.3.2
 */
export default class CustomersSubscriptionsResource extends CustomersSubscriptionsBaseResource {
  public static resource = 'customers_subscriptions';
  public static model = Subscription;
  public apiName = 'Subscriptions API';

  /**
   * Delete a customer subscription.
   *
   * @since 1.3.2
   *
   * @alias cancel
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public delete = this.cancel;
  /**
   * List the Customer's Subscriptions.
   *
   * @since 1.3.2
   *
   * @alias list
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   *
   * @public ✓ This method is part of the public API
   */
  public all = this.list;
  /**
   * List the Customer's Subscriptions.
   *
   * @since 3.0.0
   *
   * @alias list
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   *
   * @public ✓ This method is part of the public API
   */
  public page = this.list;

  /**
   * Create a customer subscription.
   *
   * @param params - Create Subscription parameters
   *
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Customer Subscription
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/create-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public async create(params: ICreateParams, cb?: CreateCallback): Promise<Subscription> {
    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
    if (!startsWith(params.customerId, Customer.resourcePrefix)) {
      Resource.createApiError('The customer id is invalid', cb);
    }
    this.setParentId(customerId);

    return super.create(parameters, cb) as Promise<Subscription>;
  }

  /**
   * Get a customer subscription.
   *
   * @param id - Subscription ID
   * @param params - Get Subscription parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @return Customer Subscription
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/get-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public async get(id: string, params?: IGetParams | GetCallback, cb?: GetCallback): Promise<Subscription> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(id, Subscription.resourcePrefix)) {
        Resource.createApiError('The subscription id is invalid', typeof params === 'function' ? params : cb);
      }
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.createApiError('The customer id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(customerId);

      return super.get(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Subscription>;
    }

    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
    if (!startsWith(id, Subscription.resourcePrefix)) {
      Resource.createApiError('The subscription id is invalid');
    }
    if (!startsWith(params.customerId, Customer.resourcePrefix)) {
      Resource.createApiError('The customer id is invalid');
    }
    this.setParentId(customerId);

    return super.get(id, parameters, cb) as Promise<Subscription>;
  }

  /**
   * Get all customer's subscriptions.
   *
   * @param params - List customer's subscriptions parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns A list of found subscriptions
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/list-subscriptions
   *
   * @public ✓ This method is part of the public API
   */
  public async list(params?: IListParams | ListCallback, cb?: ListCallback): Promise<List<Subscription>> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.createApiError('The customer id is invalid', cb);
      }
      this.setParentId(customerId);

      return super.list(typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<List<Subscription>>;
    }

    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
    if (!startsWith(customerId, Customer.resourcePrefix)) {
      Resource.createApiError('The customer id is invalid', cb);
    }
    this.setParentId(customerId);

    return super.list(parameters, cb) as Promise<List<Subscription>>;
  }

  /**
   * Update a customer's subscription.
   *
   * @param id - Subscription ID
   * @param params - Update customer subscription parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Customer Subscription object
   *
   * @since 2.0.0
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/update-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public async update(id: string, params: IUpdateParams | UpdateCallback, cb?: UpdateCallback): Promise<Subscription> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(id, Subscription.resourcePrefix)) {
        Resource.createApiError('The subscription id is invalid', typeof params === 'function' ? params : cb);
      }
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.createApiError('The customer id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(customerId);

      return super.update(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Subscription>;
    }

    if (!startsWith(id, Subscription.resourcePrefix)) {
      Resource.createApiError('The subscription id is invalid');
    }
    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
    if (!startsWith(params.customerId, Customer.resourcePrefix)) {
      Resource.createApiError('The subscription id is invalid');
    }
    this.setParentId(customerId);

    return super.update(id, parameters, cb) as Promise<Subscription>;
  }

  /**
   * Cancel a Subscription
   *
   * @param id - Subscription ID
   * @param params - Delete Subscription parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 1.3.2
   *
   * @see https://docs.mollie.com/reference/v2/subscriptions-api/cancel-subscription
   *
   * @public ✓ This method is part of the public API
   */
  public async cancel(id: string, params?: ICancelParams | CancelCallback, cb?: CancelCallback): Promise<Subscription> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Subscription.resourcePrefix)) {
        Resource.createApiError('The subscription id is invalid', typeof params === 'function' ? params : cb);
      }
      const customerId = get(params, 'customerId') || this.parentId;
      if (!startsWith(customerId, Customer.resourcePrefix)) {
        Resource.createApiError('The customer id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(customerId);

      return super.delete(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Subscription>;
    }

    if (!startsWith(id, Subscription.resourcePrefix)) {
      Resource.createApiError('The subscription id is invalid');
    }
    // defaults for .withParent() compatibility (DEPRECATED SINCE 3.0.0)
    const { customerId, ...parameters } = defaults(params, { customerId: this.parentId });
    if (!startsWith(params.customerId, Customer.resourcePrefix)) {
      Resource.createApiError('The customer id is invalid');
    }
    this.setParentId(customerId);

    return super.delete(id, parameters, cb) as Promise<Subscription>;
  }
}
