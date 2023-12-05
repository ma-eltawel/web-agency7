// identifier variables
let settingIcon = document.querySelector('.toggle-setting i'), mainColor = localStorage.getItem('color'), 
    colorList = document.querySelectorAll('.colors li'), bgLand = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
    bgElement = document.querySelectorAll('.background-op span'), bgOpt = true, bgInterv, mainBg = 
    localStorage.getItem('background'), bulletCon = document.querySelector('.nav-bullets'), bullets = 
    document.querySelectorAll('.nav-bullets .bullet'), bulletEl = document.querySelectorAll('.bullet-op span'), 
    mainBullet = localStorage.getItem('bullet'), tLinks = document.querySelector('.landing ul'), links = 
    document.querySelectorAll('.landing a'), menu = document.querySelector('.menu'), skills = 
    document.querySelector('.skills'), skillProg = document.querySelectorAll('.progress span'), gallery = 
    document.querySelectorAll('.gallery img'), overlay = document.createElement('div'), popImage = 
    document.createElement('img');

// open settings box
settingIcon.onclick = () => {
    settingIcon.classList.toggle('fa-spin');
    document.querySelector('.settings').classList.toggle('open');
}

// handle  active state
function handleActive(ev){
    ev.target.parentElement.querySelectorAll('.active').forEach(el => {
        el.classList.remove('active');
    });
    ev.target.classList.add('active');
}

// switch colors
if (mainColor != null){
    document.documentElement.style.setProperty('--main-col', mainColor);

    colorList.forEach(el => {
        el.classList.remove('active');
        if (el.dataset.color == mainColor){
            el.classList.add('active');
        }
    });
}

colorList.forEach(li => {
    li.addEventListener('click', (e) => {
        document.documentElement.style.setProperty('--main-col', e.target.dataset.color);
        localStorage.color = e.target.dataset.color;

        handleActive(e);
    });
});

// change landing background image
if (mainBg != null){
    if (mainBg == 'true'){
        bgOpt = true;
    }
    else{
        bgOpt = false;
    }

    bgElement.forEach(el => {
        el.classList.remove('active');
    });
    if (mainBg == 'true'){
        bgElement[0].classList.add('active');
    }
    else{
        bgElement[1].classList.add('active');
    }
}

bgElement.forEach(sp => {
    sp.addEventListener('click', (e) => {
        handleActive(e);
        
        if (e.target.dataset.bg == 'y'){
            localStorage.background = bgOpt = true;
        }
        else{
            localStorage.background = bgOpt = false;
            clearInterval(bgInterv);
        }
    });
});

if (bgOpt == true){
    bgInterv = setInterval(() => {
        document.querySelector('.landing').style.backgroundImage = 'url(images/land-0' + bgLand[Math.floor(Math.random() * bgLand.length)] + ')';
    }, 8000);
}

// bullets section
if (mainBullet != null){
    bulletEl.forEach(el => {
        el.classList.remove('active');
    });
    if (mainBullet == 'block'){
        bulletEl[0].classList.add('active');
        bulletCon.style.display = 'block';
        
    }
    else{
        bulletEl[1].classList.add('active');
        bulletCon.style.display = 'none';
    }
}

bulletEl.forEach(sp => {
    sp.addEventListener('click', (e) => {
        handleActive(e);
        
        if (e.target.dataset.dis == 'y'){
            localStorage.bullet = bulletCon.style.display = 'block';
        }
        else{
            localStorage.bullet = bulletCon.style.display = 'none';
        }
    });
});

sectionScroll(bullets);

// scroll function
function sectionScroll(elements){
    elements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior :'smooth'
            });
        });
    });
}

// moving between sections
sectionScroll(links); 

// reset all options
document.querySelector('.reset-but').onclick = () => {
    localStorage.clear();
    window.location.reload();
}

// toggle menu
menu.onclick = (e) => {
    e.stopPropagation();
    menu.classList.toggle('menu-active');
    tLinks.classList.toggle('open');
}
tLinks.onclick = (e) => {
    e.stopPropagation();
}
document.addEventListener('click', (e) => {
    if(e.target != menu && e.target != tLinks){
        menu.classList.remove('menu-active');
        tLinks.classList.remove('open');
    }
});

// fill skills progress
window.onscroll = () => {
    if (this.scrollY > skills.offsetTop + skills.offsetHeight - this.innerHeight){
        skillProg.forEach(sp => {
            sp.style.width = sp.dataset.prog;
        });
    }
}

// popup with images
gallery.forEach(img => {
    img.addEventListener('click', (e) => {
        let popup = document.createElement('div'), imgTitle = document.createElement('h3'), closeBut = 
        document.createElement('span');

        overlay.className = 'pop-overlay';
        popup.className = 'pop-box';
        popImage.src = img.src;
        document.body.appendChild(overlay);

        if (img.alt != null){
            imgTitle.appendChild(document.createTextNode(img.alt));
            popup.appendChild(imgTitle);
        }
        closeBut.appendChild(document.createTextNode('X'));
        closeBut.className = 'close-but';

        popup.appendChild(closeBut);
        popup.appendChild(popImage);
        document.body.appendChild(popup);
    });
});

document.addEventListener('click', (e) => {
    if (e.target.className == 'close-but') {
        e.target.parentNode.remove();
        document.querySelector('.pop-overlay').remove();
    }
});