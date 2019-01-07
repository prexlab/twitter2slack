/**
 * twitter を slack にする
 */
chrome.extension.sendRequest({get: true}, function (response) {

    (function ($) {

        $('title').text(response.config.title);
        $('head').append('<style>*{font-size: 12px !important;}</style>');
        $('header').hide();
        $('[aria-label*=トレンド]').remove();
        $('[aria-label*=フッター]').remove();

        //asideサイドメニューを流用する
        $('aside:eq(0)').empty().css({
            backgroundColor: '#4A3A4A',
            height: window.innerHeight,
            width: '200px',
            position: 'fixed'
        }).append(
            '<div style="color:#c3bcc2; padding:10px">' +
            '<p style="color:white; font-size:14px; font-weight:bold">' + response.config.title + '</p>'
            + '<p>' + response.config.menu.join('</p><p>') + '</p>'
            + '</div>'
        );

        //サイドメニューの表示場所を置き換える
        $('[data-testId=sidebarColumn]')
            .css({
                margin: 0,
                width: '200px',
            })
            .insertBefore('[data-testId=primaryColumn]');

        //余計なマージンを除去
        $('[data-testId=primaryColumn]').css({
            margin: 0,
            padding: 0,
        }).parent('div').css({
            margin: 0,
            padding: 0,
        });

        $('div').each(function () {
            //背景色をぬく
            if ($(this).css('backgroundColor').match(/2[34][0-9]/)) {
                $(this).css('backgroundColor', 'transparent');
            }
            //サイドメニューのtopマージンを除去
            if ($(this).css('top').match(/6.+px/)) {
                $(this).css('top', '0');
            }
        });

        setInterval(function () {

            //画像を小さく表示する
            $('div').each(function () {
                if ($(this).css('borderRadius').match(/14px/)) {
                    $(this).find('[style*="padding-bottom"]').not('[style*="0px"]').css('paddingBottom', '0px');
                }
            });

            //profile画像を小さくする
            $('img[src*=profile_images]').each(function () {
                $(this).closest('div').css({
                    height: '35px',
                    width: '35px'
                }).closest('a').css({
                    backgroundColor: 'transparent',
                });
            });

        }, 500);

    })(jQuery);

    chrome.extension.sendRequest({set: {step: 'end'}});
});

