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

                scope.newItem = function(){
                    scope.data.items.push(JSON.parse(JSON.stringify(newItem)));
                }

                scope.duplicate = function(item){
                    scope.data.items.push(JSON.parse(JSON.stringify(item)));
                }

                scope.remove = function(item){
                    scope.data.items.splice(scope.data.items.indexOf(item),1);
                }

                scope.clearImage = function(item){
                    item.img='';
                }

                scope.getTime = function(item){
                    vff.controller.currentTime().then(time => {
                        item.time = time;
                    });
                };
                scope.gotoTime = function(){
                    vff.controller.go(val);
                };

                scope.save = function(){
                    vff.state.take();
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