// 모바일 햄버거 메뉴 클릭시
$(".trigger").on ({

    "click" : function() {
        
        // 햄버거 메뉴 버튼이 보일때 (햄버거 메뉴가 visible 상태인가? 로 판단)
        if($(".mobile.hamburger").is(":visible")) {
            // 모바일 닫기 버튼 show
            $(".mobile.hamburger").hide();
            $(".mobile.close").show();

            // 모바일 전체 메뉴 show
            $(".nav_wrap").height();
            $("#content_wrap").hide();
            $("#footer_wrap").hide();
            $(".under_line").hide();
            $(".mobile_menu").show();

        } else { /*닫기 메뉴 버튼이 보일때*/
            /* 모바일 햄버거 버튼 show */
                $(".mobile.hamburger").show();
                $(".mobile.close").hide();
                
                /*모바일 전체 메뉴 show*/
                $(".nav_wrap").height();
                $("#content_wrap").show();
                $("#footer_wrap").show();
                $(".mobile_menu").hide();
                $(".under_line").show();
            
        }
    }, 
    "mouseleave" : function() {
    }
});

$(window).resize(function() {
    var width = $(window).width();

    if(width > 1023) {
        if ($(".mobile_menu").is(":visible")) {
            $(".mobile.hamburger").show();
            $(".mobile.close").hide();

            $(".nav_wrap").height();
            $("#content_wrap").show();
            $("#footer_wrap").show();
            $(".mobile_menu").hide();
            $(".under_line").show();
        }
    }
});

//고정메뉴바높이만큼 모바일메뉴 화면 조정
var headerHeight = $('#header_wrap').height();
$('mobile_menu').css('margin-top', headerHeight); 