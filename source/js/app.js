
   var downArrow = (function(){
       return {
           init: function(){
               $('.hiro__down-arrow').on('click',function (e) {
                   e.preventDefault();
                   var y = $('.hiro').height();
                   $('html, body').animate({scrollTop: y}, 1000);
               })
           }
       }
   }());

   var navBlog = (function(){
       this.navCreate = function(){
           $('.blog__articles-head').each(function(){
               var head = $(this).text(),
                   y = Math.round($(this).offset().top),
                   li = '<li class="blog__sidebar-item"><a href="#'+y+'" class="blog__sidebar-link">'+head+'</a></li>';

               $('.blog__sidebar-list').append(li);
           });
           $('.blog__sidebar-item').eq(0).addClass('blog__sidebar-item_active');
       }
       this.nav = function () {
           $('.blog__sidebar-link').click(function (e) {
               e.preventDefault();
               var y = $(this).attr('href').substr(1);
               $('html, body').animate({scrollTop: y}, 1000);
           });
       }
       this.navCheck = function () {
           $(window).scroll(function(){
               y = Math.round($(window).scrollTop());
               $($('.blog__sidebar-item').get().reverse()).each(function () {
                  var item = $(this),
                      link = $(this).find('a.blog__sidebar-link'),
                      d = link.attr('href').substr(1);
                  if(y >= d-300){
                    //console.log(y, d);
                    // тут надо сделать проверку на изменение - переключение
                    $('.blog__sidebar-item').removeClass('blog__sidebar-item_active');
                    item.addClass('blog__sidebar-item_active');
                    return false;
                  }
               });
           });
       }
       this.navPosition = function () {
           var start = $('.blog__sidebar').offset().top;
           $(window).scroll(function(){
               // тут надо сделать проверку на изменение - переключение
               y = Math.round($(window).scrollTop());
               console.log(start, y)
               if(y > start) {
                   navPosition2();
               }
               else {
                   navPosition1();
               }
           });
           function navPosition2() {
               $('.blog__sidebar').css({'position':'fixed', 'top': 0});
               $('.blog__articles').css({'margin-left':'330px'});
           }
           function navPosition1() {
               $('.blog__sidebar').css({'position':'unset'});
               $('.blog__articles').css({'margin-left':'0'});
           }
       }
       return {
           init: function () {
               navCreate();
               nav();
               navCheck();
               navPosition();
           }
       }
   }());

$(document).ready(function () {
    downArrow.init();
    navBlog.init();
});