$(function(){
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
})