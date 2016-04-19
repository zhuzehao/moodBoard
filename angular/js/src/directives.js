/**
 * Created with JetBrains WebStorm.
 * User: ty
 * Date: 14-7-24
 * Time: 下午3:10
 * To change this template use File | Settings | File Templates.
 */
var directives=angular.module("directives",["services","models"]);
directives.directive("controlScroll", ["$timeout","$window","$document","Clothes","Config","Storage",
    function ($timeout,$window,$document,Clothes,Config,Storage) {
        return {
            link: function(scope, element, attrs) {
                var elem=element[0],
                    clientH=elem.clientHeight,
                    oldScrollTop=0;

                var mousewheelEvt= $document[0].onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
                var mousewheelHandler=function (evt) {
                    evt = window.event || evt;
                    if(evt.wheelDelta <0 || evt.detail>0){
                        //下滚
                        if(oldScrollTop+clientH<=elem.scrollHeight){
                            elem.scrollTop=oldScrollTop+clientH;
                            oldScrollTop=elem.scrollTop;
                            console.log(oldScrollTop);
                            if(Storage.lastLoadedCount!=Config.hasNoMoreFlag){
                                Clothes.query(function(data){
                                    scope.items=scope.items.concat(data.items);
                                    if(data.hasNoMore){
                                        Storage.lastLoadedCount=Config.hasNoMoreFlag;
                                    }
                                });
                            }
                        }
                    }else{
                        if(oldScrollTop-clientH>=0){
                            elem.scrollTop=oldScrollTop-clientH;
                            oldScrollTop=elem.scrollTop;
                            console.log(oldScrollTop);
                        }
                    }

                    //兼容ie
                    if(evt.preventDefault){
                        evt.preventDefault();
                    }else{
                        evt.returnValue=false;
                    }
                    //evt.preventDefault();
                };

                $window.addEventListener(mousewheelEvt, mousewheelHandler);
            }
        }
    }]);