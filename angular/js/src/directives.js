/**
 * Created with JetBrains WebStorm.
 * User: ty
 * Date: 14-7-24
 * Time: 下午3:10
 * To change this template use File | Settings | File Templates.
 */
var directives=angular.module("directives",["services","models"]);
directives.directive("touchLoad", ["Clothes",
    function (Clothes) {
        return {
            link: function(scope, element, attrs) {
                var elem=element[0];
                function touchStart(event){

                }
                function touchMove(event){
                    event=event||window.event;
                    event.preventDefault();
                }
                function touchEnd(event){
                    Clothes.query(function(data){
                        scope.items=scope.items.concat(data.items);
                    });
                }

                function touchCancel(event){
                    event.preventDefault();
                }

                function touchLeave(event){
                    event.preventDefault();
                }

                elem.addEventListener("mousedown",touchStart,false);
                elem.addEventListener("mousemove",touchMove,false);
                elem.addEventListener("mouseup",touchEnd,false);
                elem.addEventListener("touchstart",touchStart,false);
                elem.addEventListener("touchmove",touchMove,false);
                elem.addEventListener("touchend",touchEnd,false);
                elem.addEventListener("touchcancel",touchCancel,false);
                elem.addEventListener("touchleave", touchLeave,false);


                //解除事件绑定
                scope.$on('$destroy', function () {
                    elem.removeEventListener("mousedown",touchStart);
                    elem.removeEventListener("mousemove",touchMove);
                    elem.removeEventListener("mouseup",touchEnd);
                    elem.removeEventListener("touchstart",touchStart);
                    elem.removeEventListener("touchmove",touchMove);
                    elem.removeEventListener("touchend",touchEnd);
                    elem.removeEventListener("touchcancel",touchCancel);
                    elem.removeEventListener("touchleave",touchLeave);
                });
            }
        }
    }]);