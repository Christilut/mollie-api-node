import { IMandate } from '../mandate';
import { IList } from '../list';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, mandate?: IMandate) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, mandate?: IMandate) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, mandates?: IList<IMandate>) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type RevokeCallback = (error: any, success?: boolean) => void;