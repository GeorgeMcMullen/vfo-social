angular.module('socialApp')
    .directive('timeline',function(){
        return{
            restrict: 'E',
            templateUrl:'/js/directives/timeline/timeline.html',
            replace:true,
            scope:{
                data : '=',
                edit: '='
            },
            link: function (scope) {
                let newItem = {
                    imgs:[],
                    header:"",
                    desc:"",
                    img: "",
                    time:0,
                    cta:""
                }

                scope.style = vff.style;

                scope.newItem = function(){
                    scope.data.items.push(JSON.parse(JSON.stringify(newItem)));
                }

                scope.duplicate = function(item){
                    //Use angular.toJson to strip $$hashKey (default track by value) from the object forcing the ng-repeat to create a new one
                    scope.data.items.splice(scope.data.items.indexOf(item),0,JSON.parse(angular.toJson(item)));
                }

                scope.remove = function(item){
                    if (window.confirm("Delete current item?")) { 
                        scope.data.items.splice(scope.data.items.indexOf(item),1);
                    }
                }

                scope.clearImage = function(item){
                    item.img='';
                }

                scope.getTime = function(item){
                    item.time = vff.video.currentTime;
                };
                scope.gotoTime = function(seconds){
                    try { seconds = parseFloat(seconds);} catch (e) { }
                    vff.video.goTo(seconds);
                };

                scope.save = function(){
                    scope.itemsMenu=false;
                    vff.send();
                }
            }
        }
    })

    .filter('timecode', function() {
        return function(timestamp) {
            let hours = Math.floor(timestamp / 60 / 60);
            let minutes = Math.floor(timestamp / 60) - (hours * 60);
            let seconds = Math.floor(timestamp % 60);
            return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        };
    });