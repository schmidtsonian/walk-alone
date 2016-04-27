module app {

    export class Utils {

        // https://davidwalsh.name/javascript-debounce-function
        static debounce(func: Function, wait: number, immediate?: boolean): Function {
            
            var timeout: number;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);

                if (callNow){
                    func.apply(context, args);
                }
            };
        }

        // https://remysharp.com/2010/07/21/throttling-function-calls
        static throttle( func: Function, threshhold: number = 250, scope?: any ) {
            
            var last: number;
            var deferTimer: number;
            
            return function () {
                var context = scope || this;

                var now = +new Date;
                var args = arguments;
                if (last && now < last + threshhold) {
                    
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        func.apply(context, args);
                    }, threshhold);
                } else {
                    last = now;
                    func.apply(context, args);
                }
            };
        }
    }
}