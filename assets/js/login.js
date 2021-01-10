$(function(){
    // 注册页面与登录页面切换
    $('.toregist').on('click',function(){
        $('.login').hide().next().show()    
    })
    $('.tologin').on('click',function(){
        $('.register').hide().prev().show()    
    })
    // ----------------
    // 正则校验
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ], 
        repass:function(value){
            // 密码  value是新密码
            let pwd = $('.register input[name="password"]').val()
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
      }); 
    //   --------------
    //  发送ajax请求 注册
    $('#registform').on('submit',function(e){
        e.preventDefault()
        // 没有要求用formdata时，直接用serialize即可
        let data = $(this).serialize()
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data,
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功')
                // 注册成功后,触发去登录按钮
                $('.tologin').click()
            }
        })
    }) 
    // 去注册
    $('#loginform').on('submit',function(e){
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data,
            success:function(res){
                console.log(res);
                if(res.status !==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功',function(){
                    // 将token存到本地存储 用setItem
                location.href = '../../home/index.html'
                })  
            }
        })
    })
})