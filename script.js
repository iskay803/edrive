$(function () {
    const catalogAutoSlider = {
        limit: 6,
        totalPages: 0,
        currentPage: 0,
        init: function () {
            $('.catalog-auto .product-card').hide();
            this.totalPages = Math.round($('.catalog-auto .product-card').length / this.limit) - 1;
            this.changePage(0);
        },
        destroy: function () {
            $('.catalog-auto .product-card').show();
        },
        nextPage: function () {
            let page = this.currentPage + 1;
            if (page > this.totalPages) {
                page = 0;
            }

            this.changePage(page);
        },
        prevPage: function () {
            let page = this.currentPage - 1;
            if (page < 0) {
                page = this.totalPages;
            }

            this.changePage(page);
        },
        changePage: function (page) {
            this.currentPage = page;
            const offset = page * this.limit;

            $('.catalog-auto .product-card').fadeOut(400);
            setTimeout(() => {
                $('.catalog-auto .product-card').slice(offset, offset + this.limit).fadeIn();
            }, 400);
        }
    }
    const catalogAutoSwiper = {
        swiper: null,
        init: function () {
            if (!this.swiper) {
                this.swiper = new Swiper('.catalog-auto-swiper', {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: {
                        prevEl: '.catalog-slider__prev',
                        nextEl: '.catalog-slider__next',
                    },
                });
            }
        },
        destroy: function () {
            if (this.swiper) {
                this.swiper.destroy(true, true);
                this.swiper = null;
            }
        }
    };

    $('.catalog-auto .catalog-slider__arrow[data-prev]').click(() => {
        catalogAutoSlider.prevPage()
    });
    $('.catalog-auto .catalog-slider__arrow[data-next]').click(() => {
        catalogAutoSlider.nextPage()
    });

    const chooseAutoSlider = () => {
        if ($(window).width() > 767) {
            catalogAutoSlider.init();
            catalogAutoSwiper.destroy();
        } else {
            catalogAutoSwiper.init();
            catalogAutoSlider.destroy();
        }
    };

    chooseAutoSlider();
    $(window).resize(() => {
        chooseAutoSlider();
    });

    const catalogStationSwiper = new Swiper('.catalog-station-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            prevEl: '.catalog-station [data-prev]',
            nextEl: '.catalog-station [data-next]',
        },
        breakpoints: {
            767: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 4,
            },
        }
    });

    const newsSwiper = {};

    const initNewsSwiper = () => {
        $('.news-block .news-block-swiper').each(function () {
            const id = $(this).attr('id');

            if (window.innerWidth > 767) {
                if (newsSwiper[id]) {
                    console.log('destroy ' + id);
                    newsSwiper[id].destroy();
                    delete newsSwiper[id];
                }
            } else {
                if (!newsSwiper[id]) {
                    newsSwiper[id] = new Swiper(`#${id}`, {
                        navigation: {
                            prevEl: `#${id} .catalog-slider__prev`,
                            nextEl: `#${id} .catalog-slider__next`,
                        },
                    });
                }
            }
        });
    };
    initNewsSwiper();
    $(window).resize(() => {
        initNewsSwiper();
    });

    $('.footer-wrapper .collapse').on('hide.bs.collapse', function (e) {
        if (window.innerWidth > 767) {
            e.preventDefault();
        }
    });
    if (window.innerWidth <= 767) {
        $('.footer-subtitle').addClass('collapsed');
        $('.footer-wrapper .collapse').removeClass('show');
    }
});
