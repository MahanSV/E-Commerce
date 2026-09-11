import 'yup';
import type { AnyObject, Flags, Maybe } from 'yup';

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = ''
  > {
    mobile(): this;
    nationalId(): this;
  }
}
