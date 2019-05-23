
   var downArrow = (function(){
       return {
           init: function(){
               $('.hiro__down-arrow').on('click',function (e) {
                   e.preventDefault();
                   var y = $('.hiro').height();
                   $('html, body').animate({scrollTop: y}, 1000);
                   //$("body").mCustomScrollbar("scrollTo",y+"px");
               })
           }
       }
   }());

   var navBlog = (function(){
       var mg = 0;
       this.navCreate = function(){
           $('.blog__articles-head').each(function(){
               var head = $(this).text(),
                   y = Math.round($(this).offset().top),
                   li = '<li class="blog__sidebar-item"><a href="#'+y+'" class="blog__sidebar-link">'+head+'</a></li>';
                   liMobil = '<li class="blog-mobil-menu__item"><a href="#'+y+'" class="blog-mobil-menu__link">'+head+'</a></li>';

               $('.blog__sidebar-list').append(li);
               $('.blog-mobil-menu__list').append(liMobil);
           });
           $('.blog__sidebar-item').eq(0).addClass('blog__sidebar-item_active');
       }
       this.nav = function () {
           $('.blog__sidebar-link, .blog-mobil-menu__link').click(function (e) {
               e.preventDefault();
               var y = $(this).attr('href').substr(1);
               $('html, body').animate({scrollTop: y}, 1000);
               //$("body").mCustomScrollbar("scrollTo",y+"px");
               navMobilBack();
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
                      //if(!item.hasClass('blog__sidebar-item_active')){
                          $('.blog__sidebar-item').removeClass('blog__sidebar-item_active');
                          item.addClass('blog__sidebar-item_active');
                          return false;
                      //}
                  }
               });
           });
       }
       this.navCheckMobil = function () {
           $(window).scroll(function(){
               y = Math.round($(window).scrollTop());
               $($('.blog-mobil-menu__item').get().reverse()).each(function () {
                   var item = $(this),
                       link = $(this).find('a.blog-mobil-menu__link'),
                       d = link.attr('href').substr(1);
                   if(y >= d-300){
                       $('.blog-mobil-menu__link').removeClass('blog-mobil-menu__link_active');
                       link.addClass('blog-mobil-menu__link_active');
                       return false;
                   }
               });
           });
       }
       this.navPosition = function () {
           var start = $('.blog__sidebar').offset().top,
               block = 0,
               block2 = 0;
           $(window).scroll(function(){
               y = Math.round($(window).scrollTop());
               if(y > start) {
                   if(!block) navPosition2();
               }
               else {
                   if(!block2) navPosition1();
               }
           });
           function navPosition2() {
               $('.blog__sidebar').css({'position':'fixed', 'top': 0});
               $('.blog__articles').css({'margin-left':'330px'});
               block = 1;
               block2 = 0;
           }
           function navPosition1() {
               $('.blog__sidebar').css({'position':'unset'});
               $('.blog__articles').css({'margin-left':'0'});
               block = 0;
               block2 = 1;
           }
       }
       this.navMobilGo = function () {
           $(".blog-mobil-menu__go").on("click", function () {
               if(!mg){
                   mg = $(".blog-mobil-menu").css("margin-left");
                   $(".blog-mobil-menu").css({"margin-left":0});
                   $(".blog-mobil-menu").removeClass("blog-mobil-menu_hover");
               }
               else{
                   navMobilBack();
               }
           });
       }
       this.navMobilClickBack = function () {
           $(document).on('click', function(e) {
               if (!$(e.target).closest(".blog-mobil-menu").length) {
                   if(mg){
                       navMobilBack();
                   }
               }
               e.stopPropagation();
           });
       }
       var navMobilBack = function () {
           $(".blog-mobil-menu").css({"margin-left":mg});
           $(".blog-mobil-menu").addClass("blog-mobil-menu_hover");
           mg = 0;
       }
       return {
           init: function () {
               navCreate();
               nav();
               if($(".blog__sidebar").css("display") != "none"){
                   navCheck();
                   navPosition();
               }
               else{
                   navCheckMobil();
                   navMobilGo();
                   navMobilClickBack();
               }
           }
       }
   }());

   var skillsAnimate = (function(){
       return {
           init: function(){
               i = 0;
               count = $(".user-skills__item").length;
               $(window).scroll(function(){
                   if (i < count) {
                       y = Math.round($(window).scrollTop());
                       $(".user-skills__item").each(function () {
                           yy = $(this).offset().top;
                           circle = $(this).find(".user-skills__circle-full");
                           stop = circle.attr("data-stop");
                           if (y > yy - 500 && stop == 0) {
                               p = circle.attr("data-p");
                               circle.attr("style", "stroke-dasharray: calc(258 * " + p + ") 258; opacity: " + p + ";");
                               circle.attr("data-stop", "1");
                               i++;
                           }
                       })
                   }
               });
           }
       }
   }());

   var form = (function(){
       this.validNameForm = function () {
           item = $(".form-commun__name");
           val = item.val();
           if(val){
               item.removeClass("form-commun_error");
               item.addClass("form-commun_success");
               return true;
           }
           else{
               item.removeClass("form-commun_success");
               item.addClass("form-commun_error");
               return false;
           }
       }
       this.validTextForm = function () {
           item = $(".form-commun__text");
           val = item.val();
           if(val){
               item.removeClass("form-commun_error");
               item.addClass("form-commun_success");
               return true;
           }
           else{
               item.removeClass("form-commun_success");
               item.addClass("form-commun_error");
               return false;
           }
       }
       this.validEmailForm = function () {
           item = $(".form-commun__email");
           val = item.val();
           if(val && val.search( /(\w)+@(\w)+/i ) != -1){
               item.removeClass("form-commun_error");
               item.addClass("form-commun_success");
               return true;
           }
           else{
               item.removeClass("form-commun_success");
               item.addClass("form-commun_error");
               return false;
           }
       }
       this.validForm = function () {
           $(".form-commun__name").blur(function () {
               validNameForm();
           });
           $(".form-commun__text").blur(function () {
               validTextForm();
           });
           $(".form-commun__email").blur(function () {
               validEmailForm();
           });
       }
       this.resetForm = function () {
           $(".form-commun__reset").on("click", function (e) {
               e.preventDefault();
               $(".form-commun__input").val("").removeClass("form-commun_error").removeClass("form-commun_success");
           })
       }
       this.submitForm = function () {
           $(".form-commun__submit").on("click", function (e) {
               e.preventDefault();
               v1 = validNameForm();
               v2 = validTextForm();
               v3 = validEmailForm();
               name = $(".form-commun__name").val();
               text = $(".form-commun__text").val();
               email = $(".form-commun__email").val();
               if(v1 && v2 && v3){
                   $(".thank").css({"display":"flex"}).fadeIn(500, function () {
                       setTimeout(function () {
                           $(".thank").fadeOut(500);
                       },2000);
                   })
                   /*$.ajax({
                       url: '/',
                       method: 'POST',
                       data: {name: name, text: text, email: email},
                        success: function(data){
                            console.log(data);
                        },
                        error: function(){
                            console.log('error');
                        }
                   });*/
               }
           })
       }
       return {
           init: function(){
               validForm();
               resetForm();
               submitForm();
           }
       }
   }());

   var formLogin = (function(){
       this.validName = function () {
           item = $(".welcome__form-input[name='login']");
           val = item.val();
           ico = item.siblings(".welcome__form-ico");
           if(val){
               ico.removeClass("welcome__form-ico_error");
               ico.addClass("welcome__form-ico_success");
               return true;
           }
           else{
               ico.removeClass("welcome__form-ico_success");
               ico.addClass("welcome__form-ico_error");
               return false;
           }
       }
       this.validPass = function () {
           item = $(".welcome__form-input[name='pass']");
           val = item.val();
           ico = item.siblings(".welcome__form-ico");
           if(val){
               ico.removeClass("welcome__form-ico_error");
               ico.addClass("welcome__form-ico_success");
               return true;
           }
           else{
               ico.removeClass("welcome__form-ico_success");
               ico.addClass("welcome__form-ico_error");
               return false;
           }
       }
       this.valid = function () {
           $(".welcome__form-input[name='login']").blur(function () {
               validName();
           });
           $(".welcome__form-input[name='pass']").blur(function () {
               validPass();
           });
       }
       this.submit = function () {
           $(".welcome__btn[type='submit']").on("click", function (e) {
               e.preventDefault();
               v1 = validName();
               v2 = validPass();
               login = $(".welcome__form-input[name='login']").val();
               pass = $(".welcome__form-input[name='pass']").val();
               capcha1 = Boolean($(".welcome__form-capcha-checkbox-input:checked").val());
               capcha2 = Boolean($(".welcome__form-capcha-radio-input:checked").val());
               if(v1 && v2 && capcha1 && capcha2){
                   console.log("lol");
                   /*$.ajax({
                       url: '/',
                       method: 'POST',
                       data: {login: login, pass: pass},
                        success: function(data){
                            console.log(data);
                        },
                        error: function(){
                            console.log('error');
                        }
                   });*/
               }
           });
       }
       this.capcha = function () {
           $(".welcome__form-capcha-label,.welcome__form-capcha-p").on("click", function () {
                var label = $(this).parent("div").find(".welcome__form-capcha-label"),
                    input = $(this).siblings("input"),
                    p = $(this).parent("div").find("p");
                if(input.prop("checked")){
                    label.removeClass("welcome__form-capcha-label_active");
                    input.prop("checked", false);
                }
                else{
                    if(input.attr("type") == "radio"){
                        $(".welcome__form-capcha-radio").removeClass("welcome__form-capcha-label_active");
                        $(".welcome__form-capcha-p").removeClass("welcome__form-capcha-p_active");
                        p.addClass("welcome__form-capcha-p_active");
                    }
                    label.addClass("welcome__form-capcha-label_active");
                    input.prop("checked", true);
                }
           });
       }
       return {
           init: function(){
               valid();
               capcha();
               submit();
           }
       }
   }());

   var hamburger = (function(){
       this.hamburgerSwicher = function () {
           i = 0;
           block = 0;
           $(".hiro__hamburger").on("click", function (e) {
               e.preventDefault();
               if(!block) {
                   if (i) {
                       block = 1;
                       $(".svg__hamburger-2").show();
                       $(".svg__hamburger-1").css({"transform": "translateY(0px) rotate(0deg)"})
                       $(".svg__hamburger-3").css({"transform": "translateY(0px) rotate(0deg)"})
                       $(".mobil-menu__list").hide();
                       $(".mobil-menu__list-link").css({"opacity":"0"});
                       $(".mobil-menu__part1").animate({"margin-right": "50%"}, 600);
                       $(".mobil-menu__part2").animate({"margin-left": "50%"}, 600, function () {
                           $(".hiro__hamburger").css({"position":"absolute"});
                           $(".mobil-menu").css({"display":"none"});
                           block = 0;
                           i = 0;
                       });
                   }
                   else {
                       $(".mobil-menu").css({"display":"flex"});
                       block = 1;
                       $(".svg__hamburger-2").hide();
                       $(".svg__hamburger-1").css({"transform": "translateY(2px) translateX(-1px) rotate(45deg)"})
                       $(".svg__hamburger-3").css({"transform": "translateY(-2px) translateX(1px) rotate(-45deg)"})
                       $(".mobil-menu__part1").animate({"margin-right": "0"}, 600);
                       $(".mobil-menu__part2").animate({"margin-left": "0"}, 600, function () {
                           $(".mobil-menu__list").show();

                           i = 0;
                           countListItem = $(".mobil-menu__list-link").length;
                           timeListItem = setInterval(function () {
                               if(i <= countListItem){
                                   $(".mobil-menu__list-link").eq(i-1).css({"opacity":"1"});
                                   i++;
                               } else clearInterval(timeListItem);
                           },150);

                           $(".hiro__hamburger").css({"position":"fixed"});
                           block = 0;
                           i = 1;
                       });
                   }
               }
           });
       }
       return {
           'init': function () {
               hamburgerSwicher();
           }
       }
   }());

   var portfolio = (function(){
     var counter = 0,
       next = 0,
       prev = 0,
       duration = 300,
       inProcess = false;

     var moveSlide = function(){
       var items = $('.my-works__main-img'),
         activeItem = items.filter('.my-works__main-img_active');

       if (counter >= items.length) counter = 0;
       if (counter < 0) counter = items.length - 1;

       var reqItem = items.eq(counter);

       activeItem.fadeOut(duration, function () {
         items.removeClass('my-works__main-img_active');
         reqItem.fadeIn(duration).addClass('my-works__main-img_active');
         inProcess = false;
         next = counter + 1;
         prev = counter - 1;
         if(next >= items.length) next = 0;
         if(prev < 0) prev = items.length - 1;
         $('.my-works__img_prev').attr('src','userfiles/site-'+prev+'.png');
         $('.my-works__img_next').attr('src','userfiles/site-'+next+'.png');
         moveText(counter);
       });
     }

     var moveText = function (counter) {
       var title, text, link;
       switch (counter){
         case 0:
           title = "Сайт школы онлайн Образования 1";
           text = "HTML, CSS, JAVASCRIPT 1";
           link = "#1";
           break;
         case 1:
           title = "Сайт школы онлайн Образования 2";
           text = "HTML, CSS, JAVASCRIPT 2";
           link = "#2";
           break;
         case 2:
           title = "Сайт школы онлайн Образования 3";
           text = "HTML, CSS, JAVASCRIPT 3";
           link = "#3";
           break;
         case 3:
           title = "Сайт школы онлайн Образования 4";
           text = "HTML, CSS, JAVASCRIPT 4";
           link = "#4";
           break;
         case 4:
           title = "Сайт школы онлайн Образования 5";
           text = "HTML, CSS, JAVASCRIPT 5";
           link = "#5";
           break;
         case 5:
           title = "Сайт школы онлайн Образования 6";
           text = "HTML, CSS, JAVASCRIPT 6";
           link = "#6";
           break;
         case 6:
           title = "Сайт школы онлайн Образования 7";
           text = "HTML, CSS, JAVASCRIPT 7";
           link = "#7";
           break;
         default:
           title = "Сайт школы онлайн Образования 1";
           text = "HTML, CSS, JAVASCRIPT 1";
           link = "#1";
       }
       $('.my-works__title-2').text(title);
       $('.my-works__teh').text(text);
       $('.my-works__link').attr('href',link);
     }

     return {
       init: function(){
         $('.my-works__prev-item_down').on('click', function (e) {
           e.preventDefault();
           if (!inProcess) {
             inProcess = true;
             counter--;
             moveSlide();
           }
         });
         $('.my-works__prev-item_up').on('click', function (e) {
           e.preventDefault();
           if (!inProcess) {
             inProcess = true;
             counter++;
             moveSlide();
           }
         });
       }
     }
   }())

   this.welcome = (function(){
       return {
           'init': function () {
               $(".welcome__canvas_1").css({"transform":"translate(-50%,-50%) rotateY(0deg) rotateX(0deg)"});
               i = 0;
                $(".welcome__login").on("click", function (e) {
                    e.preventDefault();
                    tr1 = $(".welcome__canvas_1").css("transform");
                    if(i){
                        tr1 = "translate(-50%,-50%) rotateY(0deg)";
                        tr2 = "translate(-50%,-50%) rotateY(-180deg)";

                        $(".welcome__canvas_2").css({"transform":tr2});
                        setTimeout(function () {
                            $(".welcome__canvas_1").css({"transform":tr1});
                        },100);

                        $(".welcome__login").text("Авторизоваться");

                        i = 0;
                    }
                    else{
                        tr1 = "translate(-50%,-50%) rotateY(180deg)";
                        tr2 = "translate(-50%,-50%) rotateY(0deg)";

                        $(".welcome__canvas_1").css({"transform":tr1});
                        setTimeout(function () {
                            $(".welcome__canvas_2").css({"transform":tr2});
                        },100);

                        $(".welcome__login").text("Назад");

                        i = 1;
                    }
                })
           }
       }
   }())

   var paralax = (function(){
       return {
           'init': function () {
               $(window).scroll(function(){
                    y = Math.round($(window).scrollTop());
                    res = y * 0.5;
                    $(".paralax-bg").css({"background-position-y":res+"px"});
               });
           }
       }
   }())

   var preloader = (function () {
     var percentsTotal = 0,
       preloader = $('.preloader');

     var imgPath = $('*').map(function (ndx, element) {
       var background = $(element).css('background-image'),
         img = $(element).is('img'),
         path = '';

       if (background != 'none') {
         path = background.replace('url("', '').replace('")', '');
       }
       if (img) {
         path = $(element).attr('src');
       }
       if (path) return path;
     });

     var setPercents = function (total, current) {
       var persents = Math.ceil(current / total * 100);

       $('.preloader__percents').text(persents + '%');

       if (persents >= 100) {
         preloader.fadeOut();
       }
     }

     var loadImages = function (images) {

       if (!images.length) preloader.fadeOut();

       images.forEach(function (img, i, images) {
         var fakeImage = $('<img>', {
           attr: {
             src: img
           }
         });

         fakeImage.on('load error', function () {
           percentsTotal++;
           setPercents(images.length, percentsTotal);
         });
       });
     }

     return {
       init: function () {
         var imgs = imgPath.toArray();

         loadImages(imgs);
       }
     }
   }());


$(document).ready(function () {
    preloader.init();
    if($("body").find(".hiro__down-arrow").length) downArrow.init();
    if($("body").find(".blog__sidebar").length) navBlog.init();
    if($("body").find(".user-skills__item").length) skillsAnimate.init();
    if($("body").find(".form-commun").length) form.init();
    if($("body").find(".welcome__form").length) formLogin.init();
    if($("body").find(".hiro__hamburger").length) hamburger.init();
    if($("body").find(".my-works").length) portfolio.init();
    if($("body").find(".welcome").length) welcome.init();
    paralax.init();

/*    $("body").mCustomScrollbar({
      theme:"minimal",
      callbacks:{
        onScroll:function(){
          y = parseInt(this.mcs.top) * -1;
          console.log(y);
        }
      }
    });*/

});