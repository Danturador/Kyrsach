window.onload = function () {
    ShowGameImage();
    $('.BladesOfChaos')[0].style.transform = "rotate(0deg)"

    $(".BladesOfChaos").on("mousemove", () => {
        let onClickEnable = false;
        ScrollUp(true);
        $(".BladesOfChaos").on("mouseup", () => {
            ScrollUp(true);
            onClickEnable = true;
        });
        $(".BladesOfChaos").on("click", () => {
            if (onClickEnable) {
                ScrollUp(false);
                onClickEnable = false;
            }
        });
    });
    insertBGForP()

    let isCursorOnElement = false, isAnimationFinished = true, onClickEnable = false, isShowed = false, animation;
    $(".BladesOfChaos").on({
        mouseenter: function () {
            isCursorOnElement = false
            RotateBladesAnimation();
        },
        mouseleave: function () {
            isCursorOnElement = true
        },
        mousemove: function () {
            onClickEnable = false;
            ScrollUp(true);
            $(".BladesOfChaos").on({
                mouseup: function () {
                    ScrollUp(true);
                    onClickEnable = true;
                },
                click: function () {
                    if (onClickEnable) {
                        ScrollUp(false);
                        OnWheelShowAnimate();
                        onClickEnable = false;
                    }
                }
            })
        }
    })

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
            if (!isCursorOnElement) RotateBladesAnimation()
        });
    }

    $('body').bind({
        swipeup: function (event) { 
       alert("up")
      },
        swipedown: function (event) { 
        
        alert("down")
        }
      })

    $(window).on('wheel', function (e) {
        if (e.originalEvent.deltaY > 0 && isShowed) {
            OnWheelHideAnimate()
        }
        else if (e.originalEvent.deltaY < 0 && !isShowed) {
            OnWheelShowAnimate()
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
    }
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
    }

    function insertBGForP() {
        const p = document.querySelectorAll(".GoW");
        const imageNameArray = ["GoWA", "GoWCoO", "GoW2005", "GoWG", "GoWB", "GoW2", "GoW3", "GoW2018", "GoWR"]
        let pathString;
        for (let i = 0; i < p.length; i++) {
            pathString = "url('./Images/GameSeriaesConteiner/F/" + imageNameArray[i] + ".png')"
            p[i].style.backgroundImage = pathString;
            if (i !== 0 || i !== p.length - 1) {
                p[i].style.borderTop = "1px solid black";
                p[i].style.borderBottom = "1px solid black";
            }
            if (i === 0) p[i].style.borderTop = "2px solid black";
            if (i === p.length - 1) p[i].style.borderBottom = "2px solid black";
        }
    }

    function ScrollUp(isDraging) {
        console.log(isDraging)
        if (!isDraging) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
        else $(".BladesOfChaos").draggable({ axis: 'x' })
    }

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
        }
        for (let key in imageSrc) {
            let pElement = document.getElementById(key);

            pElement.onmouseover = () => {
                pElement.style.opacity = "0.7";
                Image.src = imageSrc[key];
            }
            pElement.onmouseout = () => {
                pElement.style.opacity = "1";
            }
        }
    }
    if ($(window).width() > 767) {
        $(".upperGradient")[0].style.display = "block"
        $(".GameSeriaesConteiner")[0].style.display = "flex"
        $(".lowerGradient")[0].style.display = "block"
        $(".GameSeriaesMobile")[0].style.display = "none"
    }
    else {
        $(".upperGradient")[0].style.display = "none"
        $(".GameSeriaesConteiner")[0].style.display = "none"
        $(".lowerGradient")[0].style.display = "none"
        $(".GameSeriaesMobile")[0].style.display = "block"
    }

    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href').substring(1)
            OnWheelHideAnimate()

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