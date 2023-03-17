import { MonoTypeOperatorFunction } from '../types';
import { operate } from '../util/lift';
import { OperatorSubscriber } from './OperatorSubscriber';

/**
 * Emits only the first value emitted by the source Observable and Unsubscribe right after.
 *
 *
 * `autoUnsubscribe` returns an Observable that emits only the first value emitted
 * by the source Observable and Unsubscribe right after return the value.
 * 
 * If the source emits more than one value then the source emit only the first value and completes.
 *
 * ## Example
 *
 * Get only first value of an range of emmits
 *
 * ```ts
 * import { range, autoUnsubscribe } from 'rxjs';
 *
 * const rangeEmmits = range(1, 200);
 * const getOnce = rangeEmmits.pipe(autoUnsubscribe());
 * getOnce.subscribe(x => console.log(x));
 *
 * // Logs:
 * // 1
 *
 *
 * @return A function that returns an Observable that emits only the first
 *  value by the source Observable and Unsubscribe right after.
 * ```
 */

export function autoUnsubscribe<T>(): MonoTypeOperatorFunction<T> {
    return operate((source, subscriber) => {
      source.subscribe(
        new OperatorSubscriber<T>(subscriber, (value) => {
          subscriber.next(value);
          subscriber.complete();
          subscriber.unsubscribe();
        })
      );
    });
  }
  