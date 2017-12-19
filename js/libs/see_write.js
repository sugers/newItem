$(function () {
    function tt(dd) {
        //alert(dd);
    }
    var GG = {
        "kk": function (mm) {
            // alert(mm);
        }
    }

    $("#page").initPage(71, 1, GG.kk);


    //底部固定
    var f_height = $('.historical').height()

    //删除
    del();

    function del() {
        $(".bottom ul li").find('.del').css('cursor', 'pointer')
        $(".bottom ul li").find('.last .del').click(function () {
            $(this).parent('.last').parent('li').remove()
        })
    }

    //切换

    $('.top').find('li:nth-of-type(1)').click(function () {
        $(this).css('background', '#4d8cf4').css('color', '#fff').siblings().css('background', '#fff').css('color', '#4d8cf4')
        $('.all').css('display', 'block')
        $('.all').siblings().css('display', 'none')
    });
    $('.top').find('li:nth-of-type(2)').click(function () {
        $(this).css('background', '#4d8cf4').css('color', '#fff').siblings().css('background', '#fff').css('color', '#4d8cf4')
        console.log(123)
        $('.shenxiao').css('display', 'block')
        $('.shenxiao').siblings().css('display', 'none')
    })
    $('.top').find('li:nth-of-type(3)').click(function () {
        $(this).css('background', '#4d8cf4').css('color', '#fff').siblings().css('background', '#fff').css('color', '#4d8cf4')
        $('.dingao').css('display', 'block')
        $('.dingao').siblings().css('display', 'none')
    })
    $('.top').find('li:nth-of-type(4)').click(function () {
        $(this).css('background', '#4d8cf4').css('color', '#fff').siblings().css('background', '#fff').css('color', '#4d8cf4')
        $('.weidingao').css('display', 'block')
        $('.weidingao').siblings().css('display', 'none')
    })
    $('.top').find('li:nth-of-type(5)').click(function () {
        $(this).css('background', '#4d8cf4').css('color', '#fff').siblings().css('background', '#fff').css('color', '#4d8cf4')
        $('.huishouzhan').css('display', 'block')
        $('.huishouzhan').siblings().css('display', 'none')
    });




})