$(function () {
      // 案件块的显示与隐藏
      var tipBool = false;
      $('#tip').click(function () {
            if (tipBool) {
                  $(this).css('left', 0);
                  console.log($(this).find('img').attr('src', '../img/icon-rightArrow.png'))
                  $('.fixedBox').width(0).find('.cases').css({
                        'display': 'none'
                  });
            } else {
                  console.log($(this).find('img').attr('src', '../img/icon-leftArrow.png'))
                  $(this).css('left', '300px');
                  $('.fixedBox').width(300).find('.cases').css({
                        'display': 'block'
                  });
            }
            tipBool = !tipBool
      });

      //等高
      $('.case_left').height($(window).height())

      //点击切换
      tab_click();

      function tab_click() {
            $('.applyer_title .z_title').find('span:nth-of-type(1)').click(function () {
                  $(this).css('color', '#4d8cf4').css('background', '#fff').siblings().css('color', '#fff').css('background', '#4d8cf4')
                  $('.personal_apply .person_apply').css('display', 'block')
                  $('.unit_apply').css('display', 'none')

            })
            $('.applyer_title .z_title').find('span:nth-of-type(2)').click(function () {
                  $(this).css('color', '#4d8cf4').css('background', '#fff').siblings().css('color', '#fff').css('background', '#4d8cf4')
                  $('.personal_apply .person_apply').css('display', 'none')
                  $('.unit_apply').css('display', 'block')
            })

            $('.b_applyer_title .z_title').find('span:nth-of-type(1)').click(function () {
                  $(this).css('color', '#4d8cf4').css('background', '#fff').siblings().css('color', '#fff').css('background', '#4d8cf4')
                  $('.b_applyer_tab .person_apply').css('display', 'block')
                  $('.b_unit_apply').css('display', 'none')
            })

            $('.b_applyer_title .z_title').find('span:nth-of-type(2)').click(function () {
                  $(this).css('color', '#4d8cf4').css('background', '#fff').siblings().css('color', '#fff').css('background', '#4d8cf4')
                  $('.b_applyer_tab .person_apply').css('display', 'none')
                  $('.b_unit_apply').css('display', 'block')
            })
      }

      //删除
      Delete();

      function Delete() {
            $('.person_apply_two').find('.introduce').click('span',function (event) {
                  
                  $(this).parent('.person_apply_two').remove()
                  event.stopImmediatePropagation();
            });

            $('.t_applyer_tab').find('.introduce').click('span',function (){
                  $('.t_applyer_tab').remove();
            });
            $('.arbitrament_apply').find('.introduce').click('span',function () {
                  $('.arbitrament_apply').remove()
            })
      }

      //点击添加
      add();

      function add() {
            var index = $('.person_apply_two').last().find('.introduce').html().slice(5, 6);
            index++;
            $('.add_apply_one').click(function () {
                  console.log(index)
                  $(this).before($('.person_apply_two').last().clone(true))
                  $('.person_apply_two').last().find('.introduce').html('个人申请人' + index).append('<span><img src="../img/delete.png" alt="" >删除</span>')
                  index++;
            })
      }


      //案件信息ajax
      p_ajac();

      function p_ajac() {
            $.ajax({
                  url: 'http://192.168.2.186:8000/cases/1/',
                  type: 'get',
                  success: function (data) {
                        $('.base_one').append(' <li><span>收案号</span><input type="text" value="' + data.accept_id + '" readonly="readonly"></li><li><span>所属冲裁院</span><input type="text" value="' + data.court + '"></li><li><span>仲裁申请日期</span><select name="" id=""><option value="">' + data.apply_date + '</option></select></li>')
                        $('.base_two').append(' <li><span>收案号</span><input type="text" value="' + data.register_id + '" readonly="readonly"></li><li><span>所属冲裁院</span><input type="text" value="' + data.controversy_type + '"></li><li><span>仲裁申请日期</span><select name="" id=""><option value="">' + data.accept_date + '</option></select></li>')
                        $('.base_remenber').append('<li><span>备注</span><textarea name="" id="" cols="30" rows="10">' + data.remark + '</textarea></li>');
                        $('.reson_remenber li').find('textarea').html(data.facts);
                        for (var i = 0; i < data.claimants.length; i++) {
                              if (data.claimants[i].type == "person") {
                                    var ul_list = $('.personal_apply .person_apply ul')
                                    ul_list.append('<li><span>姓名</span><input type="text" value="' +
                                          data.claimants[i].name + '"></li><li><span>性别</span><select name="" id=""><option value="">' +
                                          data.claimants[i].sex + '</option></select></li><li><span>出生日期</span><select name="" id=""><option  value="">' +
                                          data.claimants[i].birthday + '</option></select></li><li><span>民族</span><select name="" id=""><option value="">' +
                                          data.claimants[i].nationality + '</option></select></li><li><span>原籍</span><input type="text" value="' +
                                          data.claimants[i].birthplace + '"></li><li><span>联系电话 </span><input type="text"  value="' +
                                          data.claimants[i].phone + '"></li><li><span>邮编</span><input type="text"  value="' +
                                          data.claimants[i].post_code + '"></li><li><span>联系地址</span><input type="text"  value="' +
                                          data.claimants[i].present_addr + '"></li><li class="special"><span>有效通讯地址</span><input type="text" value="' +
                                          data.claimants[i].mailing_addr + '"></li>');
                              }
                        };
                        for (var j = 0; j < data.respondents.length; j++) {
                              if (data.respondents[j].type == 'group') {
                                    $('.b_applyer_tab').append('<div class="b_unit_apply"><div class="introduce">单位被申请人</div><ul id="clear" class="font_size"><li><span>单位人名称</span><input type="text" value="' +
                                          data.respondents[j].group_name + '"></li><li><span>法定代表人姓名</span><input type="text" value="' +
                                          data.respondents[j].legal_repr_name + '"></li><li><span>法定代表人电话</span><input type="text"  value="' +
                                          data.respondents[j].legal_repr_phone + '"></li><li><span>法定代表人职务</span><input type="text"  value="' +
                                          data.respondents[j].legal_repr_pos + '"></li><li><span>单位类型</span><select name="" id=""><option value="">' +
                                          data.respondents[j].group_type + '"</option></select></li><li><span>经济类型 </span><select name="" id=""><option value="">' +
                                          data.respondents[j].eco_type + '"</option></select></li><li><span>隶属类型</span><select name="" id=""><option value="">' +
                                          data.respondents[j].affi_typ + '"</option></select></li><li><span>社会信用地址</span><input type="text"  value="' +
                                          data.respondents[j].social_credit_id + '"></li><li class="special"><span>法定代表人住所</span><input type="text"  value="' +
                                          data.respondents[j].legal_repr_addr + '"></li></ul></div>')
                              }
                        }
                        for (var k = 0; k < data.third_party.length; k++) {
                              console.log(data.third_party)
                              $('.add_apply_three').before('<div class="person_apply"><div class="introduce">个人第三人<span><img src="../img/delete.png" alt="" >删除</span></div><ul id="clear" class="font_size"><li><span>姓名</span><input type="text" value="' +
                                    data.third_party[k].name + '"></li><li><span>性别</span><select name="" id=""><option value="">' +
                                    data.third_party[k].sex + '</option></select></li><li><span>出生日期</span><select name="" id=""><option  value="">' +
                                    data.third_party[k].birthday + '</option></select></li><li><span>民族</span><select name="" id=""><option value="">' +
                                    data.third_party[k].nationality + '</option></select></li><li><span>原籍</span><input type="text" value="' +
                                    data.third_party[k].birthplace + '"></li><li><span>联系电话 </span><input type="text"  value="' +
                                    data.third_party[k].phone + '"></li><li><span>邮编</span><input type="text"  value="' +
                                    data.third_party[k].post_code + '"></li><li><span>联系地址</span><input type="text"  value="' +
                                    data.third_party[k].present_addr + '"></li><li class="special"><span>有效通讯地址</span><input type="text" value="' +
                                    data.third_party[k].mailing_addr + '"></li></ul></div>')

                        }


                        for (var l = 0; l < data.requests.length; l++) {
                              $('.arbitrament_applyer_title').after('<div class="arbitrament_apply"><div class="introduce">仲裁请求<span><img src="../img/delete.png" alt="" >删除</span></div><ul id="clear" class="font_size"><li><span>仲裁请求类型</span><select name="" id=""><option value="">' +
                                    data.requests[l].type + '</option></select></li><li><span>是否主要类型</span><select name="" id=""><option value="">' +
                                    data.requests[l].is_primary + '</option></select></li><li class="t_arbitrament"><span>仲裁请求</span><input type="text" value="' +
                                    data.requests[l].content + '"></li></ul></div>')
                        }
                  },
                  error: function () {
                        console.log(error)
                  }
            })
      }


      // window.onload = function () {
      //       laydate.render({
      //             elem: '#hour',
      //             type: 'time',
      //             range: true,
      //             theme: '#7460ee'
      //       });
      //       laydate.render({
      //             elem: '#day',
      //             format: 'yyyy年MM月dd日',
      //             theme: '#7460ee'
      //       });
      // };

})