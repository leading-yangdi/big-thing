$(function () {
    getUesrInfo();

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', {

        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 优先 nickname
    // 1.获取用户名称
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;' + name)
    // 3.按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染图片
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本
        $('.layui-nav-img').hide()
        // name.charAt(0)
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show();
    }
}