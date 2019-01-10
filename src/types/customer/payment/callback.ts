import { ICustomer } from '../../customer';
import { List } from '../../list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, customer?: ICustomer) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, customers?: List<ICustomer>) => void;