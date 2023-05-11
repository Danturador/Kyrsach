window.onload = function () {
    ShowGameImage();

    $('.BladesOfChaos')[0].style.transform = "rotate(0deg)";

    insertBGForP();

    let isCursorOnElement = false, isAnimationFinished = true, onClickEnable = false, isClicked = false, isShowed = false, animation, shiftX;
    $(".BladesOfChaos").on({
        mouseenter: function (e) {
            isCursorOnElement = true;
            if (isCursorOnElement && isAnimationFinished) RotateBladesAnimation();
        },
        dragstart: function() {
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
                mousedown: function (){
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
        touchmove: function(e){
            $(".BladesOfChaos")[0].style.left = xDown - $(".BladesOfChaos")[0].offsetWidth / 2 + 'px';
        }
    })

    function RotateBladesAnimation() {
        isAnimationFinished = false;
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
            isAnimationFinished = true;
            if (isAnimationFinished && isCursorOnElement) RotateBladesAnimation();
        });
    };

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
        })
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
        })
    };

    function insertBGForP() {
        const p = document.querySelectorAll(".GoW");
        const imageNameArray = ["GoWA", "GoWCoO", "GoW2005", "GoWG", "GoWB", "GoW2", "GoW3", "GoW2018", "GoWR"];
        let pathString;
        for (let i = 0; i < p.length; i++) {
            pathString = "url('./Images/GameSeriaesConteiner/F/" + imageNameArray[i] + ".png')";
            p[i].style.backgroundImage = pathString;
            if (i !== 0 || i !== p.length - 1) {
                p[i].style.borderTop = "1px solid black";
                p[i].style.borderBottom = "1px solid black";
            }
            if (i === 0) p[i].style.borderTop = "2px solid black";
            if (i === p.length - 1) p[i].style.borderBottom = "2px solid black";
        }
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

    function ShowGameImage() {
        const Image = document.getElementById("ImageOfTheGame");
        const imageSrc = {
            "GoW:Ascension": "./Images/God_of_War-_Ascension2.jpg",
            "GoW:ChainsOfOlympus": "./Images/God-of-War-Chains-of-Olympus-05f4970.jpg",
            "GoW_2005": "./Images/GoW2005.jpg",
            "GoW:GhostOfSparta": "./Images/god_of_war_ghost_of_sparta.jpg",
            "GoW:Betrayal": "./Images/DbNOsPMX0AIbvIG.jpg",
            "GoW:II": "./Images/thumbbig-410067.webp",
            "GoW:III": "./Images/God_of_War_III.jpg",
            "GoW_2018": "./Images/God_of_War_2018_cover.jpg",
            "GoW:Ragnarok": "./Images/1273405.jpg"
        };
        for (let key in imageSrc) {
            let pElement = document.getElementById(key);

            pElement.onmouseover = () => {
                pElement.style.opacity = "0.7";
                Image.src = imageSrc[key];
            };
            pElement.onmouseout = () => {
                pElement.style.opacity = "1";
            };
        }
    };

    if ($(window).width() > 767) {
        $(".upperGradient")[0].style.display = "block";
        $(".GameSeriaesConteiner")[0].style.display = "flex";
        $(".lowerGradient")[0].style.display = "block";
        $(".GameSeriaesMobile")[0].style.display = "none";
    }
    else {
        $(".upperGradient")[0].style.display = "none";
        $(".GameSeriaesConteiner")[0].style.display = "none";
        $(".lowerGradient")[0].style.display = "none";
        $(".GameSeriaesMobile")[0].style.display = "block";
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;
    let yDown = null;

    function getTouches(evt) {
        return evt.touches ||
            evt.originalEvent.touches;
    }

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
            if (Math.abs(xDiff) < Math.abs(yDiff)){
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

    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const blockID = anchor.getAttribute('href').substring(1)
            OnWheelHideAnimate();

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    $(function () {
        let table = $('.DevelopersTable'), tbody = "", fileAdress = "https://raw.githubusercontent.com/Danturador/testDar.io/main/GoW_III/DevelopersTable.xml";

        const RequestObject = {

            url: fileAdress,
            method: 'GET',
            dataType: 'xml',
            async: true,
            success: (resp) => {
                $(resp).find("infoAboutGame").each((index, item) => {
                    tbody += `<tr>`;
                    tbody += `<td> ${item.children[0].textContent} </td>`;
                    tbody += `<td class= "TitleOfTheGame"> ${item.children[1].textContent} </td>`;
                    tbody += `<td> ${item.children[2].textContent} </td>`;
                    tbody += `<td> ${item.children[3].textContent} </td>`;
                    tbody += `<td> ${item.children[4].textContent} </td>`;
                    tbody += `<td> ${item.children[5].textContent} </td>`;
                    tbody += `<td> ${item.children[6].textContent} </td>`;
                    tbody += `</tr>`;
                })
                table.html(tbody);
            },
            error: (error) => console.log(error)
        }
        $.ajax(RequestObject);
    });
};