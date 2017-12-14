$(function() {
    // 初始请求数据（最近处理案件）
    $.ajax({
        url: 'http://192.168.2.186:8000/docs/',
        data: { 'q': 'history' },
        success(data) {
            console.log(data.result);
            var date = new Date(),
                day = date.getDate(),
                month = date.getMonth() + 1,
                leftDayStr = '',
                fileNum = 0;
            for (var i = 0; i < 7; i++) {
                leftDayStr += "<li class=\"" + (i ? '': 'active')  + "\"><a href=\"#D" + (day - i) + "\">" + month + "\u6708" + (day - i) + "\u65E5(" + fileNum + ")</a></li>";;
                $('.recent').html(leftDayStr);

            }
        },
        error(e) {
            console.log(e);
        }
    });
    $('body').click(function() {
        $('.searchRes').slideUp(200);
    });
    $('.InputSelect').find('input').focus(function (e) {
        var $this = $(this);
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

    // 点击搜索
    $('input[type=submit]').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        var searchYear = $('#searchYear').val(),
            searchKind = $('#searchKind').val(),
            searchTxt = $('#searchTxt').val(),
            status;
        switch (searchKind) {
            case '收案':
                status = 'accepted';
                break;
            case '立案':
                status = 'registered';
                break;
            case '不予受理':
                status = 'rejected';
                break;
            default:
                status = 'all';
                break;
        }
        jQuery.support.cors = true;
        $.ajax({
            url: 'http://192.168.2.186:8000/cases/',
            type: 'get',
            data: { 'q': 'cases', 'year': searchYear, 'status': status, 'name': searchTxt},
            success: function (data) {
                console.log(data);
                var str = '';
                for (var i = 0; i < data.result.length; i++) {
                    result = data.result[i];
                    console.log(!result.register_id)
                    if (!result.register_id) result.register_id = result.accept_id;
                    if (!result.register_date) result.register_date = '未处理';
                    if (!result.process_date) result.process_date = '未立案';
                    str += '<li><span class="caseNumber">' + result.register_id + '</span><span class="applicant">' + result.claimants.join('，') + '</span><span class="respondent">' + result.defendants.join('，') + '</span><span class="startTime">' + result.process_date + '</span><span class="dealTime">' + result.register_date + '</span></li>';
                }
                $('.searchResBody').find('ul').html(str);
                $('.searchRes').slideDown(300);
            },
            error: function(e) {
                console.log(e)
            }
        });
    });

    $('.Hyear').click(function() {
        // $(this).next().slideToggle();
    });
    $('.leftSide').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');
    })

    $('.nav').find('li').click(function() {
        $(this).addClass('active').siblings('li').removeClass('active');
        if ($(this).index() == 1) {
            //历史处理案件
            $.ajax({
                url: 'http://192.168.2.186:8000/cases/',
                data: { 'q': 'cases' },
                success(data) {
                    var date = new Date();
                    var day = date.getDate();
                    var Month = date.getMonth() + 1;
                    // console.log(data);
                },
                error(e) {
                    console.log(e);
                }
            })
            $('.historyLeft').removeClass('dnone');
            $('.historyRight').removeClass('dnone');
            $('.recent').addClass('dnone');
            $('.dateList').addClass('dnone');
        } else {
            // 最近处理案件
            $.ajax({
                url: 'http://192.168.2.186:8000/docs/',
                data: {'q': 'history'},
                success(data) {
                    console.log(data)
                    var date = new Date();
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var leftDayStr = '';
                    var fileNum = 5;
                    for (var i = 0; i < 7; i++) {
                        leftDayStr += "<li class=\"" + (i ? '' : 'active') + "\"><a href=\"#D" + (day - i) + "\">" + month + "\u6708" + (day - i) + "\u65E5(" + fileNum + ")</a></li>";; 
                        $('.recent').html(leftDayStr)
                    }
                },
                error(e) {
                    console.log(e);
                }
            });
            $('.historyLeft').addClass('dnone');
            $('.historyRight').addClass('dnone');
            $('.recent').removeClass('dnone');
            $('.dateList').removeClass('dnone');
        }
    });
})