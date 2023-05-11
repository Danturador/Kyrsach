let counter = 0, zIndexValue = "0", transformScaleValue = "scale(1)", isShowed = false, animation, isCursorOnElement = false, isAnimationFinished = true, onClickEnable = false, isClicked = false, shiftX, timerToHideLogo;
window.onload = function () {
    document.body.style.cursor = "default";
    $(".Axe")[0].style.transform = 'rotateX(180deg) rotate(24deg)';
    $('.BladesOfChaos')[0].style.transform = "rotate(0deg)";

    for (let key = 0; key < $("img").length; key++)
        if ($("img")[key].alt != "BladesOfChaos" && $("img")[key].alt != "logo" && $("img")[key].alt != "Axe") {
            $("img")[key].style.transform = "scale(1)";

            $("img").on({
                mouseenter: function (ev) {
                    changeCursor(ev);
                },
                mouseleave: function () {
                    document.body.style.cursor = "default";
                }
            });
        }

    $(".BladesOfChaos").on({
        mouseenter: function (e) {
            isCursorOnElement = true;
            if (isCursorOnElement && isAnimationFinished) RotateBladesAnimation();
        },
        dragstart: function () {
            return false;
        },
        mousedown: function (e) {
            shiftX = e.pageX - $(".BladesOfChaos")[0].getBoundingClientRect().left + scrollX;
        },
        mouseleave: function () {
            isCursorOnElement = false;
        },
        mousemove: function (evt) {
            onClickEnable = false;
            ScrollUp(true, evt);
            $(".BladesOfChaos").on({
                mouseup: function () {
                    document.onmousemove = null;
                    $(".BladesOfChaos")[0].mouseup = null;
                    isClicked = false;
                    ScrollUp(true, evt);
                    onClickEnable = true;
                },
                mousedown: function () {
                    isClicked = false;
                    ScrollUp(true, evt);
                    onClickEnable = true;
                },
                click: function () {
                    if (onClickEnable) {
                        isClicked = true;
                        ScrollUp(false, evt);
                        OnWheelShowAnimate();
                        onClickEnable = false;
                    }
                }
            })
        },
        touchmove: function (e) {
            $(".BladesOfChaos")[0].style.left = xDown - $(".BladesOfChaos")[0].offsetWidth / 2 + 'px';
        }
    });

    $(window).on('wheel', function (e) {

        if (e.originalEvent.deltaY > 0 && isShowed) {
            OnWheelHideAnimate();
        }
        else if (e.originalEvent.deltaY < 0 && !isShowed) {
            OnWheelShowAnimate();
        }
    });

    function OnWheelHideAnimate() {
        if ($(window).width() > 767) {
            topPosition = "-47px";
        }
        else topPosition = "-118px";
        animation = $(".navMenu")[0].animate({
            top: topPosition,
        }, {
            duration: 200,
        });
        animation.addEventListener('finish', function () {
            $(".navMenu")[0].style.top = topPosition;
            isShowed = false;
        });
    };
    function OnWheelShowAnimate() {
        animation = $(".navMenu")[0].animate({
            top: "0",
        }, {
            duration: 200,
        });
        animation.addEventListener('finish', function () {
            $(".navMenu")[0].style.top = "0";
            isShowed = true;
        });
    };

    function changeCursor(ev, operation = "toChange") {
        if (ev.target != undefined && ev.target.alt != "BladesOfChaos") {
            if (operation === "toChange") {
                if (ev.target.style.transform != "scale(1)") document.body.style.cursor = "zoom-out";
                if (ev.target.style.transform == "scale(1)") document.body.style.cursor = "zoom-in";
            }
            if (operation === "toChangeByClick") {
                if (ev.target.style.transform == "scale(1)") document.body.style.cursor = "zoom-out";
                if (ev.target.style.transform != "scale(1)") document.body.style.cursor = "zoom-in";
            }
        }
    };

    $(window).click(function (ev) {
        if (ev.target.tagName != "IMG")
            for (let key = 0; key < $("img").length; key++) {
                $("img")[key].style.transform = "scale(1)";
                $("img")[key].position = "relative";
                $("img")[key].style.zIndex = 0;
                counter = 0;
            }
    });

    $("img").mouseleave(function (ev) {
        if (ev.target.alt != "BladesOfChaos" && ev.target.alt != "logo" && ev.target.alt != "Axe") {
            ev.target.style.transform = "scale(1)";
            ev.target.style.position = "relative";
            ev.target.style.zIndex = 0;
            counter = 0;
        }
    });

    $("img").click(function (ev) {
        if (ev.target.alt != "BladesOfChaos" && ev.target.alt != "logo" && ev.target.alt != "Axe") {
            if (counter === 0) {
                zIndexValue = "10";
                transformScaleValue = "scale(2)";
                counter = 1;
            }
            else if (counter === 1) {
                zIndexValue = "0";
                transformScaleValue = "scale(1)";
                counter = 0;
            }
            changeCursor(ev, "toChangeByClick")
            ev.target.style.transform = transformScaleValue;
            ev.target.style.position = "relative";
            ev.target.style.zIndex = zIndexValue;
        }
    });

    const anchors = document.querySelectorAll('a[href*="#"]');
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const blockID = anchor.getAttribute('href').substring(1)
            OnWheelHideAnimate();
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if ($(window).width() > 767) {
        $(".logo").on({
            mouseenter: function () {
                isCursorOnElement = true;
                if (isCursorOnElement && isAnimationFinished) {
                    clearTimeout(timerToHideLogo);
                    ToMainPageAnimation("f");
                }
            },
            mouseleave: function () {
                isCursorOnElement = false;
                if (!isCursorOnElement) timerToHideLogo = setTimeout(function () { ToMainPageAnimation('y') }, 1500);
                else if (isCursorOnElement) clearTimeout(timerToHideLogo);
            },
            click: function () {
                $(".Axe")[0].style.top = "-500px";
            }
        });
    }

    function ToMainPageAnimation(y) {
        let animation;
        isAnimationFinished = false;
        if (y != "y") {
            animation = $(".Axe")[0].animate({
                top: '2%',
                transform: 'rotateX(180deg) rotate(24deg)',
            }, {
                duration: 300,
            });
            animation.addEventListener('finish', function () {
                isCursorOnElement = false;
                $(".Axe")[0].style.transform = 'rotateX(180deg) rotate(24deg)';
                $(".Axe")[0].style.top = "2%";
                $(".logo")[0].style.paddingTop = "50px";
            });
            $(".logo")[0].animate({
                paddingTop: "50px"
            }, {
                duration: 500,
            });
        }
        else {
            animation = $(".Axe")[0].animate({
                transform: 'rotateX(180deg) rotate(30deg)',
            }, {
                duration: 200,
            });
            animation.addEventListener('finish', function () {
                $(".Axe")[0].style.transform = 'rotateX(180deg) rotate(30deg)';
                animation = $(".Axe")[0].animate({
                    transform: 'rotateX(180deg) rotate(10deg)',
                }, {
                    duration: 200,
                });
                animation.addEventListener('finish', function () {
                    $(".Axe")[0].style.transform = 'rotateX(180deg) rotate(10deg)';
                    animation = $(".Axe")[0].animate({
                        top: '-250px',
                    }, {
                        duration: 300,
                    });
                    animation.addEventListener('finish', function () {
                        $(".Axe")[0].style.top = "-250px";
                    });
                    animation = $(".logo")[0].animate({
                        paddingTop: "0"
                    }, {
                        duration: 500,
                    });
                    animation.addEventListener('finish', function () {
                        isAnimationFinished = true;
                        isCursorOnElement = false;
                        $(".logo")[0].style.paddingTop = "0";
                    });
                });
            });
        }
    };

    function RotateBladesAnimation() {
        let animation = $(".BladesOfChaos")[0].animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(6deg)' },
            { transform: 'rotate(-6deg)' },
            { transform: 'rotate(0deg)' }
        ], {
            duration: 5000,
            easing: "cubic-bezier(0, 0, 0.58, 1.0)",
        });
        animation.addEventListener('finish', function () {
            if (!isCursorOnElement) RotateBladesAnimation();
        });
    };

    function ScrollUp(isDraging, evt) {
        if (!isDraging && isClicked) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
        else if (!isClicked) {
            $(".BladesOfChaos")[0].style.left = evt.pageX - shiftX + 'px';
        }
    };

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;
    let yDown = null;

    function getTouches(evt) {
        return evt.touches ||
            evt.originalEvent.touches;
    };

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (xUp < window.innerWidth - 10 && xUp > 10) {
            if (Math.abs(xDiff) < Math.abs(yDiff)) {
                if (yDiff > 0) {
                    OnWheelHideAnimate();
                }
                else {
                    OnWheelShowAnimate();
                }
            }
            handleTouchStart(evt);
        }
    };
};