/// <reference path="IRect.ts" />

module app.game {

    import IRect = app.game.IRect;
    
    export class Utils {
        
        // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        static detectCollition( rect1: IRect, rect2: IRect): boolean {

            if (rect1.x < rect2.x + rect2.w &&
                rect1.x + rect1.w > rect2.x &&
                rect1.y < rect2.y + rect2.h &&
                rect1.h + rect1.y > rect2.y) {
                    return true;
                }
            return false;
        }

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