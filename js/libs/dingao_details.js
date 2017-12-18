$(function () {
    //切换
    tab();

    function tab() {
        $('.deal_text ul').find('.effect').click(function () {
            $(this).css('background', '#1992d4').css('color', '#fff').siblings().css('background', '#fff').css('color', '#000')
            $('.effect_content').css('display', 'block')
            $('.draf_content').css('display', 'none')
            $('.finalize_content').css('display', 'none')
            $('.recycle_content').css('display', 'none')
            $('.shenxiao').css('display','block')
            $('.huishouzhan').css('display','none')
            $('.w_dingao').css('display','none')
            $('.y_dingao').css('display','none')
        })
        $('.deal_text ul').find('.draf').click(function () {
            $(this).css('background', '#1992d4').css('color', '#fff').siblings().css('background', '#fff').css('color', '#000')
            $('.effect_content').css('display', 'none')
            $('.draf_content').css('display', 'block')
            $('.finalize_content').css('display', 'none')
            $('.recycle_content').css('display', 'none')
             $('.shenxiao').css('display','none')
            $('.huishouzhan').css('display','none')
            $('.w_dingao').css('display','none')
            $('.y_dingao').css('display','block')
        })
        $('.deal_text ul').find('.finalize').click(function () {
            $(this).css('background', '#1992d4').css('color', '#fff').siblings().css('background', '#fff').css('color', '#000')
            $('.effect_content').css('display', 'none')
            $('.draf_content').css('display', 'none')
            $('.finalize_content').css('display', 'block')
            $('.recycle_content').css('display', 'none')
             $('.shenxiao').css('display','none')
            $('.huishouzhan').css('display','none')
            $('.w_dingao').css('display','block')
            $('.y_dingao').css('display','none')
        })
        $('.deal_text ul').find('.rubbish').click(function () {
            $(this).css('background', '#1992d4').css('color', '#fff').siblings().css('background', '#fff').css('color', '#000')
            $('.effect_content').css('display', 'none')
            $('.draf_content').css('display', 'none')
            $('.finalize_content').css('display', 'none')
            $('.recycle_content').css('display', 'block')
             $('.shenxiao').css('display','none')
            $('.huishouzhan').css('display','block')
            $('.w_dingao').css('display','none')
            $('.y_dingao').css('display','none')
        })
    }

   //标题显示隐藏
   show_hidde();
   function show_hidde(){
       var show=true;
        $('.creat_text').click(function(){
            console.log(show)
            $('.detail_title').slideToggle(100);
            if (show) {
                show = !show;
                $('.creat_text').find('img').attr('src','../img/tab.png');
            } else {
                show = !show;
                $('.creat_text').find('img').attr('src','../img/icon-dropDown-white.png');
            }
            //   $('.detail_title').toggle('hide',function(){
            //        $('.creat_text').find('img').attr('src','../img/tab.png')
            //   })
            //   if($('.detail_title').hide()){
            //       $('.creat_text').find('img').attr('src','../img/tab.png')
            //   }else if($('.detail_title').show()){
            //       $('.creat_text').find('img').attr('../img/icon-dropDown-white.png')
            //   }
        
          })
   }
})