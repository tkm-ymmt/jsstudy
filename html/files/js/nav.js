/**
 * Created with JetBrains WebStorm.
 * User: Kodkod
 * Date: 2012/08/31
 * Time: 8:27
 * To change this template use File | Settings | File Templates.
 */
// A thingy to handle the sections ----------------------------------------------

$(function(){
    function Navigator(){
        this.currentSectionNum = 0;
        this.init();
    };

    Navigator.prototype = {
        init: function(){
            this.nav = $("#navi");
            this.navPosition();
            this.getHeights();
            this.onMouseOver();
            //$("ul.indexList02").slideUp("fast");
        },
        navPosition: function(){
            var navTop = this.nav.offset().top,
                navLeft = this.nav.offset().left;

            this.onScroll(navTop, navLeft);
        },
        onScroll: function(t, l){
            var that = this;
            $(window).scroll(function () {
                var currentScrollTop = $(window).scrollTop();
                if(t >= currentScrollTop){
                    that.nav.css({position: "relative", left: 0});
                } else {
                    that.nav.css({position: "fixed", left: l, top: 0});
                }
                that.highLights(currentScrollTop);
            });
        },
        getHeights: function(){
            this.sectionOffset = $("div#main h2, h3, h4").map(function(idx, ele){
                return{
                    offset: Math.ceil($(this).offset().top),
                    text: $(this).text(),
                    id: $(this).attr("id")
                }
            }).get();

            this.heights = [];
            for(var i = 0, l = this.sectionOffset.length;i < l; i++){
                this.heights.push(this.sectionOffset[i].offset);
            }
            console.log(this.sectionOffset);
        },
        getHref: function(){
            this.naviHref = $("div#navi a").map(function(idx, ele){
               return{
                   href: $(this).attr("href").substring(1)
               };
            });
        },
        naviToggle: function(id, str){
            var t1 = $('div#navi li a[href="#'+id+'"]').closest("ul.indexList02"),
                t2 = $('div#navi li a[href="#'+id+'"] ~ ul.indexList02'),
                t = id.length >= 7 ? t1 : t2;

            console.log(t);
            var res = t.is(":visible");
            if(str == "show"){
                if(res) return;
                t.slideDown("fast");
            }else if(str == "hide"){
                if(!res) return;
                t.slideUp("fast");
            }
        },
        highLights: function(co){
            var newSectionNum =  this.currentSection(co, this.heights),
                newId = this.sectionOffset[newSectionNum].id,
                newNavi = $('div#navi li a[href="#'+newId+'"]'),
                currentId = this.sectionOffset[this.currentSectionNum].id,
                currentNavi = $('div#navi li a[href="#'+currentId+'"]');

            if(this.currentSectionNum == 0){
                currentNavi.addClass("active");
            }

            if (this.currentSectionNum != newSectionNum){
                console.log(newSectionNum + "currentOffset : " + co);
                //this.naviToggle(newId, "show");
                newNavi.addClass("active");
                //this.naviToggle(currentId, "hide");
                currentNavi.removeClass("active");
                this.currentSectionNum = newSectionNum;
            }
        },
        currentSection: function(obj, a){
            for(var i = 0, l = a.length-1; i < l; i++){
                if(a[i] > obj){
                    return 0 == i ? 0 : i - 1;
                }
            }
        },
        onMouseOver: function(){
            $("div#navi a").mouseover(function(){
                var s = $("this ~ ul").attr("class");
                console.log(s);
            });
        }
    };
    //var navTop = $("#navi").offset().top;

    var JS1 = new Navigator();

});
