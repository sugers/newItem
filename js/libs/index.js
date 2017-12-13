
$(function() {
    'user strict'
    $('.InputSelect').find('input').focus(function (e) {
        var $this = $(this);
        console.log(1)
        e.preventDefault();
        setTimeout(function () { $this.siblings('ul').slideDown(100);}, 1);

    });
    $('.InputSelect').find('input').blur(function (e) {
        var $this = $(this);
        e.preventDefault();
        setTimeout(function () {
            if ($this.val() == '案件性质') {
                $this.css('color', '#666');
            } else {
                $this.css('color', '#333');
            }
            $this.siblings('ul').slideUp(100);
        }, 100);
    });
    $('.InputSelect ul').find('li').click(function (e) {
        e.preventDefault();
        var value = $(this).text();
        $(this).parent().siblings('input').val(value);
    });

    $('.nav').find('li').click(function() {
        $(this).addClass('active').siblings('li').removeClass('active');
    });
})