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
    btnAble();
});
function btnAble (){
    // 右图片区，按钮对应功能
    $('.rightSide').on('click', 'li', function () {
        var imgSrc = $(this).find('img').attr('src');
        $('.picDetail').removeClass('dnone').find('img').attr('src', imgSrc);
        $('.rightSide').addClass('dnone');
        $('#toList').removeClass('dnone');
        $('#upload').addClass('dnone');
        $('#lookWrite').removeClass('dnone');
        $('#scanResult').removeClass('dnone');
    });
    $('#scanResult').click(function () {
        $('.picDetail').addClass('dnone');
        $('.ocrResult').removeClass('dnone');
        $('#scanResult').addClass('dnone');
        $('#returnDossier').removeClass('dnone');
    });
    $('#returnDossier').click(function () {
        $('.picDetail').removeClass('dnone');
        $('.ocrResult').addClass('dnone');
        $('#scanResult').removeClass('dnone');
        $('#returnDossier').addClass('dnone');
    });
    $('#toList').click(function () {
        $('.picDetail').addClass('dnone');
        $('.rightSide').removeClass('dnone');
        $('#toList').addClass('dnone');
        $('#upload').removeClass('dnone');
        $('#lookWrite').addClass('dnone');
        $('#scanResult').addClass('dnone');
    });
}