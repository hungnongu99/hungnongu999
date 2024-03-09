function myBrowser() {
    var userAgent = navigator.userAgent
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera
    var isFirefox = userAgent.indexOf("Firefox") > -1
    if (isFirefox || isIE) {
        swal("Trình duyệt của bạn không được hỗ trợ!")
    }
    return false
}
myBrowser()
var $z_xf_above = $('.xf_above')
var $z_xf_home = $('.xf_home, .xf_friend_btn, .xf_friend')
var $z_xf_footer = $('.xf_footer, #xf_top')
const getWindowInfo = () => {
    const windowInfo = {
        width: window.innerWidth,
    }
    xf_pageW(windowInfo.width)
}
const debounce = (fn, delay) => {
    var pm_time
    return function () {
        if (pm_time) {
            clearTimeout(pm_time)
        }
        pm_time = setTimeout(() => {
            fn()
        }, delay)
    }
}
const cancalDebounce = debounce(getWindowInfo, 500)
window.addEventListener('resize', cancalDebounce)
function xf_pageW(daf) {
    function setClass(elements, className) {
        if (daf >= 800) {
            elements.addClass(className)
        } else {
            elements.removeClass(className)
        }
    }
    setClass($z_xf_above, 'pc_xf_above')
    setClass($z_xf_home, 'pc_xf_home')
    setClass($z_xf_footer, 'pc_xf_footer')
}
xf_pageW(window.innerWidth)
$(window).on('load', () => {
    if ($('.xf_load').length) {
        $('.xf_load').delay(300).fadeOut(600)
    }
})
$(function () {
    $(document).bind('contextmenu', () => {
        swal('Chức năng chuột phải bị cấm!')
        return false
    })
    function xf_ios() {
        var lastTouchEnd = 0
        document.addEventListener('touchstart', function (e) {
            if (e.touches.length > 1) {
                e.preventDefault()
            }
        })
        document.addEventListener('touchend', function (e) {
            const now = (new Date()).getTime()
            if (now - lastTouchEnd <= 300) {
                e.preventDefault()
            }
            lastTouchEnd = now
        }, false)
        document.addEventListener('gesturestart', function (e) {
            e.preventDefault()
        })
        const content = document.querySelector('.content')
        content?.addEventListener('touchmove', e => {
            e.stopPropagation()
        }, { passive: false, capture: false })
    }
    xf_ios()
    function getTpl() {
 
        const xf_rest_time = {
            restTime: [
                { work: '06:00 Học', img: 'assets/upload/get_up.png' },
                { work: '13:00 Học', img: 'assets/upload/study.png' },
                { work: '22:00 Ngủ', img: 'assets/upload/sleep.png' },
            ]
        }

        const $xf_star = $('.xf_star')
        var star = '⭐'.repeat(5)
        $xf_star.html(star)

        const xf_fortune = {
            fortune: [

                { text: 'Html', num: 98 },
                { text: 'Php', num: 88 },
                { text: 'Js', num: 78 },
                { text: 'Css', num: 67 },
            ]
        }

        const xf_site = {
            siteInfo: [
                { name: 'Fake Bill chuyển khoản', links: 'https://fakebill.sbs', pic: 'assets/upload/fakebill.png' },
                { name: 'Cọc bảo hiểm GDV', links: 'https://admincs.buzz', pic: 'assets/upload/admincs.png' },
            ]
        }

        const xf_friend = {
            friendInfo: [
                { qq: '1809185784', links: 'https://fb.com/100080407203989', name: 'Bá Quân', sig: 'Tài xỉu' },
                { qq: '169460169', links: 'https://fb.com/100027457871496', name: 'Đinh Duy', sig: 'Nhóc con' },
            ]
        }

        let siteSort = 1

        let friendsSort = 1

        const $restTime = $('.xf_rest_time')
        const $site = $('#mysite')
        const $friendBox = $('.friend_box')
        const $fortune = $('.fortune')
        function renderTemplate(data) {
            const htmlStr = template('tpl-data', data)
            return $(htmlStr)
        }
        $fortune.html(renderTemplate(xf_fortune))
        $restTime.html(renderTemplate(xf_rest_time))
        $site.html(renderTemplate(xf_site))
        $friendBox.html(renderTemplate(xf_friend))
        if ($('#mysite').height() >= 930) {
            $('#mysite').height(930)
        }

        FunLazy({
            beforeLazy: function (src) {
                return src + "?id=" + Math.random().toString(36).substr(2, 10)
            }
        })

        if ($friendBox.children().length % 2 != 0) {
            $friendBox.children().last().css('margin-right', 0)
        }

        const $siteList = $("#mysite li").get()
        const sortSites = () => {
            const sortFunc = (a, b) => siteSort ? a.textContent.localeCompare(b.textContent) : b.textContent.localeCompare(a.textContent)
            $site.append($siteList.sort(sortFunc))
        }
        sortSites()

        const sortFriends = () => {
            const sortFunc = (a, b) => friendsSort ? b.querySelector("h3").textContent.localeCompare(a.querySelector("h3").textContent) : a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent)
            $(".friend_box li").sort(sortFunc).appendTo(".friend_box")
        }
        sortFriends()

    }
    getTpl()

    let myDate = new Date()
    let weeks = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
    let webTime = new Date('2023-08-30')

    function getTime() {
        let [year, month, date, hours, minutes, seconds, week] = [
            myDate.getFullYear(),
            getZero(myDate.getMonth() + 1),
            getZero(myDate.getDate()),
            getZero(myDate.getHours()),
            getZero(myDate.getMinutes()),
            getZero(myDate.getSeconds()),
            myDate.getDay()
        ]

        $('.xf_clock').html(`${hours}:${minutes}`)
        $('.xf_moon_week').children().eq(0).html(`${date}/${month}/`)
        $('.xf_moon_week').children().eq(1).html(`${weeks[week]}`)
    }

    setInterval(() => {
        myDate = new Date()
        getTime()
    }, 2500)

    const days = Math.floor((new Date() - webTime) / (1000 * 60 * 60 * 24))
    $('.days').html(`${days} ngày`)
    $('.newYear').html(webTime.getFullYear())

    getTime()

    function getZero(zero) {
        return zero < 10 ? `0${zero}` : `${zero}`
    }

    function getMode() {
        const myDate = new Date()
        const h = myDate.getHours()
        var oncik = true
        if (h >= 19 || h <= 6) {
            $('body').addClass('xf_dark')
            oncik = !oncik
        } else {
            $('body').removeClass('xf_dark')
        }
        $('.xf_icon_above li').eq(1).on('click', () => {
            if (oncik) {
                $('body').addClass('xf_dark')
            } else {
                $('body').removeClass('xf_dark')
            }
            oncik = !oncik
        })
    }
    getMode()
    $('.xf_icon_above').children().eq(2).on('click', function () {
        $('.xf_fade_out_pic').fadeIn(500)
    })
    $('.xf_cha').on('click', function () {
        $('.xf_fade_out_pic').fadeOut(500)
    })
    function xf_ajax(xf_request, xf_url, xf_timeout, xf_callback) {
        $.ajax({
            method: xf_request,
            url: xf_url,
            timeout: xf_timeout,
            dataType: 'JSON',
            success: xf_callback,
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    return console.log('Yêu cầu giao diện vượt quá thời gian!')
                }
            }
        })
    }
    xf_ajax('GET', 'https://api.oioweb.cn/api/weather/GetWeather', 5000, res => {
        if (res.code) {

            $('.xf_city').html(res.result.city.name)
            $('.xf_high').html(`${res.result.condition.temp}℃`)
        } else {
            $('.xf_city, .xf_high').html('Lỗi lấy thông tin!')
            console.error('Yêu cầu giao diện thời tiết thất bại!')
        }
    })
    function yiyan() {
        xf_ajax('GET', 'https://api.vvhan.com/api/ian?type=json', 5000, res => {
            if (res.success !== true) {
                $('.infos').html('Lỗi giao diện yêu cầu!')
                $('.infos_dis').hide()
            }
            $('.infos').html(res.data.vhan)
            $('.infos_dis p').html(res.data.vhan)
            $('.infos_dis').css('top', -($('.infos_dis').height() + 32) + 'px')
            $('.infos, .infos_dis').hover(
                () => { $('.infos_dis').fadeIn(500) },
                () => { $('.infos_dis').fadeOut(800) }
            )
        })
    }
    yiyan()
    var isClick = true
    var xf_alert = '<div class="xf_alert"><p class="sw_txt">Nhấp quá nhanh!</p></div>'
    $('body').append(xf_alert)
    $('.Therefresh').on('click', () => {
        if (isClick) {
            isClick = false
            yiyan()
            setTimeout(() => {
                isClick = true
            }, 2000)
        } else {
            $('.xf_alert').stop().animate({ right: 0, }, 500)
            setTimeout(() => {
                $('.xf_alert').stop().animate({ right: '-100%' }, 500)
            }, 2000)
        }
    })
    function rotate3D(param1, param2) {
        $(param1).on('click', function () {
            $(this).toggleClass(param2)
        })
    }
    rotate3D('.weather_and_xf_rest', 'rotateY_3d')
    rotate3D('.fortune_and_information', 'rotateX_3d')
    var btnClick = true
    $('.xf_btn_sw').on('click', function () {
        if (btnClick) {
            btnClick = false
            $(this).toggleClass('xf_active')
            switchContent()
            setTimeout(() => {
                btnClick = true
            }, 500)
        } else {
            return false
        }
    })
    function switchContent() {
        var $home = $('.xf_home'), $friend = $('.xf_friend')
        if ($('.xf_btn_sw').hasClass('xf_active')) {
            $home.fadeOut(500, function () {
                $friend.fadeIn()
                $('.xf_btn_sw span').text('trang chủ >')
            })
        } else {
            $friend.fadeOut(500, function () {
                $home.fadeIn()
                $('.xf_btn_sw span').text('bạn bè >')
            })
        }
    }
    $(window).scroll(() => {
        $(document).scrollTop() >= $('.xf_icon_above').offset().top ? $('#xf_top').fadeIn() : $('#xf_top').fadeOut()
    })
    $('#xf_top').on('click', () => {
        $('body, html').stop().animate({ scrollTop: 0 }, 500)
    })
    if ($('#music').attr('key') == '') {
        $('#music, #xplayer').remove()
    }

    let $xf_title = $('.xf_title')
    console.log(`%cChào mừng bạn đến với%c ${$xf_title.text()}`, 'padding: 5px 10px; border-radius: 5px 0 0 5px; background-color: #0380f4; font-weight: bold;', 'padding: 5px 10px; border-radius: 0 5px 5px 0; background-color: #03a9f4; font-weight: bold;')
})

const isQQ = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    return /qq\//.test(userAgent)
}

if (!isQQ()) {
    $('.xf_icon_above').children(':first').children().addClass('xf-PicBlackbox')
}
