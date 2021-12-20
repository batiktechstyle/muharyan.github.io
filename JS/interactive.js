//Load
const loadAnimation = document.querySelector('.load-wrapper');
window.addEventListener('load', function () {
  loadAnimation.parentElement.removeChild(loadAnimation);
});


//Cookie
const getCookie = Cookies.get('dark');

//theme
const iconTheme = document.getElementById('icon-theme');
const changeTheme = document.querySelector('.change-theme');
let classIcon = iconTheme.getAttribute('class');

iconTheme.addEventListener('click', () => {
  document.body.classList.toggle('darkTheme');
  iconTheme.classList.toggle('bx-sun');
  classIcon = iconTheme.getAttribute('class');
  //remove or set cookie
  if (classIcon == "bx bx-moon bx-sm change-theme")
  {
    Cookies.remove('dark', { path: '/SPA.html' });
  }
  else
  {
    Cookies.set('dark', 'true', { expires: 3, path: '/SPA.html' });
  }
});

//check cookie
if (getCookie == 'true')
{
  document.body.classList.add('darkTheme');
  iconTheme.classList.add('bx-sun');
}
else
{
  document.body.classList.remove('darkTheme');
  iconTheme.classList.remove('bx-sun');
}

// FadeTexts
function scrollAppear() {
  let introText = document.querySelectorAll('.intro-text');
  let screenPosition = window.innerHeight / 1.2;
  introText.forEach((item, i) => {
    let introPosition = item.getBoundingClientRect().top;
    if (introPosition < screenPosition)
    {
      item.classList.add('intro-appear');
    }
  });
}

//popup image
function scrollAppearPopup() {
  let introPop = document.querySelectorAll('.intro-popup');
  let screenPosition = window.innerHeight / 1.2;
  introPop.forEach((item, i) => {
    let introPosition = item.getBoundingClientRect().top;
    if (introPosition < screenPosition)
    {
      item.classList.add('intro-appear-popup');
    }
  });
}

//fade pop
function scrollAppearFadePop() {
  let introFadePop = document.querySelectorAll('.intro-fade-pop');
  let screenPosition = window.innerHeight / 1.2;
  introFadePop.forEach((item, i) => {
    let introPosition = item.getBoundingClientRect().top;
    if (introPosition < screenPosition)
    {
      item.classList.add('intro-appear-fade-pop');
    }
  });
}

//wavy cards
function scrollAppearWavy() {
  let introWavy = document.querySelectorAll('.intro-wavy');
  let theScreen = window.innerHeight;
  let midScreen = theScreen / 1.5;
  let screenPosition = theScreen / 1.2;
  let highScreen = theScreen / 1.8;
  let delay = 0;

  introWavy.forEach((item, i) => {
    let introPosition = item.getBoundingClientRect().top;
    let bottomPosition = item.getBoundingClientRect().bottom;
    //check card and animation it
    if (introPosition <= screenPosition)
    {
      // reset
      if (introPosition <= midScreen)
      {
        delay = 0;
      }

      item.style.transitionDelay = `${delay/5}s`;
      delay++;
      item.classList.add('intro-appear-wavy');

    }
  });
}

// Active nav links
const sections = document.querySelectorAll('section[id]');
function scrollActive()
{
    const scrollY = window.pageYOffset;
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');
        //check nav links
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active-link');
        }else
        {
            document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

// Nav Mobile
const navMobile = () => {
  const body = document.getElementsByTagName('body');
  const burger = document.querySelector('.burger');
  const line = burger.querySelectorAll('.line');
  const selectLine = burger.querySelectorAll('.line.burger-active');
  const navbar = document.querySelector('nav.navbar');
  const navLinks = document.querySelector('nav.navbar .nav-links');
  const nav = document.querySelector('nav.navbar .nav-links ul');
  //create element instead of pseudo element
  const selectNav = document.createElement('div');
  selectNav.setAttribute('class', 'counter-click');
  navLinks.appendChild(selectNav);

  burger.addEventListener('click', () => {
    const selectNavActive = document.querySelector('div.counter-click.burger-active');
    nav.classList.toggle('burger-active');
    navbar.classList.toggle('burger-active');
    selectNav.classList.toggle('burger-active');

    line.forEach(line => {
      line.classList.toggle('burger-active');
    });

    //click like a window, then close nav
    selectNav.addEventListener('click', () => {
      nav.classList.remove('burger-active');
      navbar.classList.remove('burger-active');
      selectNav.classList.remove('burger-active');

      line.forEach(line => {
        line.classList.remove('burger-active');
      });
    });
  });

}


//== Call Action ==
//call scroll effects animation
window.addEventListener('scroll', scrollAppear);
window.addEventListener('scroll', scrollAppearPopup);
window.addEventListener('scroll', scrollAppearFadePop);
window.addEventListener('scroll', scrollAppearWavy);
//add background color on navbar
window.addEventListener('scroll', () => {
  let nav = document.querySelector('nav.navbar');
  nav.classList.toggle('bg-solid-green', window.scrollY > 0);
});
//add navlinks active
window.addEventListener('scroll', scrollActive);
navMobile();
