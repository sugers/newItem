$(function() {
    var tipBool = false;
    // 案件块的显示与隐藏
    $('#tip').click(function () {
        if (tipBool) {
            $(this).css('left', 0);
            console.log($(this).find('img').attr('src', '../img/icon-rightArrow.png'))
            $('.fixedBox').width(0).find('.cases').css({ 'display': 'none' });
        } else {
            console.log($(this).find('img').attr('src','../img/icon-leftArrow.png'))
            $(this).css('left', '300px');
            $('.fixedBox').width(300).find('.cases').css({ 'display': 'block' });
        }
        tipBool = !tipBool
    });
    // 显示与隐藏左目录块
    $('#catalog').click(function() {
        $('.leftSide').slideToggle(100);
    })
    // 左目录块，显示与隐藏目录列表
    $('.leftSide').on('click', '.muluName', function() {
        $(this).next().fadeToggle(10);
        // $('.muluName').fadeToggle()
        $(this).parent().siblings('.juanItem').fadeToggle(10);
    });
    // 左目录块，点击目录名字展示对应的右图片区
    $('.leftSide').on('click', '.muluList li', function() {
        var showName = $(this).attr('name');
        $(this).addClass('active').siblings('li').removeClass('active');
        for (var i = 0; i < $('.rightSide').find('ul').length; i++) {
            if ($('.rightSide').find('ul').eq(i).attr('name') == showName) {
                console.log($('.rightSide').find('ul').eq(i).attr('name'))
                $('.rightSide').find('ul').eq(i).css('display', 'block').siblings('ul').css('display', 'none')
            }
        }
    });
});