/**
 * 第一次点击到历史处理案件模块时
 * 1、拿到所有数据，包括 所有有案件的年和有案件的月份 最近有案件的年中最近有案件的月份的数据
 * 2、渲染：有案件的年份 及其下面的月份，默认显示最近的。
 * 3、传参：data: {'q':'history'} 默认不传月份
 * 4、之后点击历史处理案件事，不再渲染页面，不在请求数据（这个待议）
 *
 * 点击选择年份的时候，渲染月份，及数据 传参： data: {'q': 'history', 'year': ''}
 * 点击选择月份时，单单渲染数据 传参： data: {'q': 'history', 'year': '', 'month': ''}
 *
 * 总的一句话，传的数据越来越多，做的事情越来越少
 */
$(function() {
    var dataItemPositionArr = [];
    var isFirst = true;
    // 初始请求数据（最近处理案件）
    $.ajax({
        url: 'http://192.168.2.186:8000/docs/',
        data: { 'q': 'history' },
        success: function(data) {
            var leftDayStr = '',
                fileStr = '',
                fileNum = [];
                var item, Syear, Smonth, Sday;
            for (var x = 0; x < data.result.dates.length; x++) {
                Syear = data.result.dates[x].split('-')[0];
                Smonth = data.result.dates[x].split('-')[1];
                Sday = data.result.dates[x].split('-')[2];
                fileNum = data.result[data.result.dates[x]].length;
                // 最近处理文件左边日期
                leftDayStr += "<li class=\"" + (x ? '' : 'active') + "\"><a href=\"#D" + Sday + "\">" + Smonth + "\u6708" + Sday + "\u65E5(" + fileNum + ")</a></li>";
                // 最近处理文件右边文件数据
                fileStr += "<li class=\"dateItem\">\n<p class=\"time\" id=\"D" + Sday + "\" >" + Syear + "\u5E74" + Smonth + "\u6708" + Sday + "\u53F7</p>\n<ul class=\"fileList\">";
                for (var n = 0; n < data.result[data.result.dates[x]].length; n++) {
                    fileStr += "<li class=\"fileItem\">\n  <a href=\"\">\n  <img src=\"../img/file.png\" alt=\"\">\n  <div class=\"fileMsg\">\n    <p class=\"fileName\">" + data.result[data.result.dates[x]][n].doc_type + "</p>\n    <p class=\"fileNum\">" + data.result[data.result.dates[x]][n].accept_id + "</p>\n  </div>\n</a>\n</li>";
                }
                fileStr += "</ul></li>";
            }
            $('.recent').html(leftDayStr);
            $('.dateList ').html(fileStr);
            for (var i = 0; i < $('.dateItem').length; i++) {
                dataItemPositionArr.push($('.dateItem').eq(i).position().top);
            }
        },
        error: function(e) {
            console.log(e);
        }
    });

    $('.Hyear').click(function() {
        $(this).find('.setYear').fadeToggle(100)
        $(this).next().fadeToggle(100);
    });
    $('.leftSide').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 切换页面显示“最近”或“历史”
    // switch page show "resent" or "history"
    $('.nav').find('li').click(function() {
        $(this).addClass('active').siblings('li').removeClass('active');
        if ($(this).index() == 1) {
            //历史处理案件
            if (isFirst) {
                isFirst = false;
                var data = {};
                data.q = 'history';
                var yearIndex;
                $.ajax({
                    url: 'http://192.168.2.186:8000/cases/',
                    data: data,
                    success: function(data) {
                        var HmonthStr = '';
                        var HyearStr = '';
                        var result;
                        var HtableStr = '';
                        $('.getYear').text(data.dates[0][0]);
                        for (var i = 0; i < data.dates.length; i++) {
                            if (data.dates[i][0] == $('.getYear').text()) {
                                yearIndex = i;
                            };
                            HyearStr += "<li><a href=\"javascript:void(0);\">" + data.dates[i][0] + "年</a></li>";
                        }
                        for (var x = 0; x < data.dates[0][1].length; x++) {
                            HmonthStr += "<li><a href=\"javascript:void(0);\">" + data.dates[yearIndex][1][x] + "\u6708</a></li>";
                        }
                        $('.setYear').html(HyearStr);
                        $('.getMonth').html(HmonthStr);
                        $('.getMonth').find('li').eq(0).addClass('active');

                        for (var n = 0; n < data.result.length; n++) {
                            result = data.result[n];
                            HtableStr += '<li><span class="caseNumber"><i><img src="../img/icon-file.png" alt=""> </i><a href="javascript:void(0);">' + (result.accept_id ? result.accept_id : result.register_id) + '</a></span><span class="applicant">' + result.claimants.join(',') + '</span><span class="respondent">' + result.defendants.join(',') + '</span><span class="thirdPerson">' + (result.third_party ? result.third_party.join(',') : '没有第三人') + '</span><span class="registerTime">' + (result.register_date ? result.register_date : '未立案') + '</span><span class="processTime">' + (result.process_date ? result.process_date : '未处理') + '</span></li>';
                        }
                        $('.TBody').html(HtableStr);
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            }
            $('.historyLeft').removeClass('dnone');
            $('.historyRight').removeClass('dnone');
            $('.recent').addClass('dnone');
            $('.dateList').addClass('dnone');
        } else {
            // 最近处理案件
            $.ajax({
                url: 'http://192.168.2.186:8000/docs/',
                data: {'q': 'history'},
                success: function(data) {
                    var leftDayStr = '',
                        fileStr = '',
                        fileNum = [];
                    var item, Syear, Smonth, Sday;
                    for (var x = 0; x < data.result.dates.length; x++) {
                        Syear = data.result.dates[x].split('-')[0];
                        Smonth = data.result.dates[x].split('-')[1];
                        Sday = data.result.dates[x].split('-')[2];
                        fileNum = data.result[data.result.dates[x]].length;
                        // 最近处理文件右边文件数据
                        fileStr += "<li class=\"dateItem\">\n<p class=\"time\" id=\"D" + Sday + "\" >" + Syear + "\u5E74" + Smonth + "\u6708" + Sday + "\u53F7</p>\n<ul class=\"fileList\">";
                        for (var n = 0; n < data.result[data.result.dates[x]].length; n++) {
                            fileStr += "<li class=\"fileItem\">\n  <a href=\"\">\n  <img src=\"../img/file.png\" alt=\"\">\n  <div class=\"fileMsg\">\n    <p class=\"fileName\">" + data.result[data.result.dates[x]][n].doc_type + "</p>\n    <p class=\"fileNum\">" + data.result[data.result.dates[x]][n].accept_id + "</p>\n  </div>\n</a>\n</li>";
                        }
                        fileStr += "</ul></li>";
                    }
                    $('.dateList ').html(fileStr);
                },
                error: function(e) {
                    console.log(e);
                }
            });
            $('.historyLeft').addClass('dnone');
            $('.historyRight').addClass('dnone');
            $('.recent').removeClass('dnone');
            $('.dateList').removeClass('dnone');
        }
    });

    // 更改年份之后 获取数据 渲染页面
    // Get the data rendering page after changing the year
    $('body').on('click', '.setYear li', function() {
        var data = {};
        data.q = 'history';
        data.year = $(this).text().replace('年','');
        var theYear = $(this).text().replace('年', '');
        var yearIndex;
        $('.getYear').text(theYear);
        $.ajax({
            url: 'http://192.168.2.186:8000/cases/',
            data: data,
            success: function(data) {
                var HmonthStr = '';
                var result;
                var HtableStr = '';
                for (var i = 0; i < data.dates.length; i++) {
                    if (data.dates[i][0] == theYear) {
                        yearIndex = i;
                    };
                }
                for (var x = 0; x < data.dates[yearIndex][1].length; x++) {
                    HmonthStr += "<li><a href=\"javascript:void(0);\">" + data.dates[yearIndex][1][x] + "\u6708</a></li>";
                }
                $('.getMonth').html(HmonthStr);
                $('.getMonth').find('li').eq(0).addClass('active');

                for (var n = 0; n < data.result.length; n++) {
                    result = data.result[n];
                    HtableStr += '<li><span class="caseNumber"><i><img src="../img/icon-file.png" alt=""> </i><a href="javascript:void(0);">' + (result.accept_id ? result.accept_id : result.register_id) + '</a></span><span class="applicant">' + result.claimants.join(',') + '</span><span class="respondent">' + result.defendants.join(',') + '</span><span class="thirdPerson">' + (result.third_party ? result.third_party.join(',') : '没有第三人') + '</span><span class="registerTime">' + (result.register_date ? result.register_date : '未立案') + '</span><span class="processTime">' + (result.process_date ? result.process_date : '未处理') + '</span></li>';
                }
                $('.TBody').html(HtableStr);
            },
            error: function(e) {
                console.log(e);
            }
        });
    });

    // 更改月份之后，获取数据 渲染页面
    // get the data rendering page after changing the month
    $('body').on('click', '.getMonth li', function() {
        var data = {};
        data.q = 'history';
        data.year = theYear;
        data.month = theMonth;
        var theYear = $('.getYear').text();
        var theMonth = $(this).text().replace('月', '');
        var yearIndex;
        $(this).addClass('active');
        $.ajax({
            url: 'http://192.168.2.186:8000/cases/',
            data: data,
            success: function(data) {
                console.log(data);
                var result;
                var HtableStr = '';
                for (var i = 0; i < data.dates.length; i++) {
                    if (data.dates[i][0] == theYear) {
                        yearIndex = i;
                    };
                }
                for (var n = 0; n < data.result.length; n++) {
                    result = data.result[n];
                    HtableStr += '<li><span class="caseNumber"><i><img src="../img/icon-file.png" alt=""> </i><a href="javascript:void(0);">' + (result.accept_id ? result.accept_id : result.register_id) + '</a></span><span class="applicant">' + result.claimants.join(',') + '</span><span class="respondent">' + result.defendants.join(',') + '</span><span class="thirdPerson">' + (result.third_party ? result.third_party.join(',') : '没有第三人') + '</span><span class="registerTime">' + (result.register_date ? result.register_date : '未立案') + '</span><span class="processTime">' + (result.process_date ? result.process_date : '未处理') + '</span></li>';
                }
                $('.TBody').html(HtableStr);
            },
            error: function(e) {
                console.log(e);
            }
        });
    });

    // 引入搜索块函数
    forSearch();

    // 鼠标滚动，左侧当前状态改变
    // leftSide's status change when the mouse is scrolling
    $('.dateList').scroll(function() {
        // console.log($(this).scrollTop())
        // alert(1)

        for (var i = 0; i < dataItemPositionArr.length; i++) {
            // console.log(dataItemPositionArr)
            if (dataItemPositionArr[i]+100 >= $(this).scrollTop()) {
                console.log(dataItemPositionArr[i], $(this).scrollTop(), i);
                $('.recent').find('li').removeClass('active').eq(i).addClass('active')
                break;
                // console.log(i)
            }
        }
    });
});

// 搜索块函数
function forSearch() {

    // 关闭搜索结果
    $('body').click(function () {
        $('.searchRes').slideUp(200);
    });

    $('.InputSelect').find('input').focus(function (e) {
        var $this = $(this);
        e.preventDefault();
        setTimeout(function () { $this.siblings('ul').slideDown(100); }, 1);
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

    // 点击搜索 允许在输入的时候使用回车键搜索
    // Click Search (allows Enter when searching using Enter)
    // click the search button (allow use the 'Enter' to search when inset )

    $('input[type=submit]').click(function (e) {
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
            data: { 'q': 'case', 'year': searchYear, 'status': status, 'name': searchTxt },
            success: function (data) {
                var str = '';
                for (var i = 0; i < data.result.length; i++) {
                    result = data.result[i];
                    str += '<li><span class="caseNumber"><a href="javascript:void(0);">' + (result.register_id ? result.register_id : result.accept_id) + '</a></span><span class="applicant">' + result.claimants.join('，') + '</span><span class="respondent">' + result.defendants.join('，') + '</span><span class="registerTime">' + (result.register_date ? result.register_date : '未立案') + '</span><span class="processTime">' + (result.process_date ? result.process_date : '未处理') + '</span></li>';
                }
                $('.searchResBody').find('ul').html(str);
                $('.searchRes').slideDown(300);
            },
            error: function (e) {
                console.log(e)
            }
        });
    });
}

