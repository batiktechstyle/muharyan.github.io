//== Global Variables ==
//blur in popup
let blur = document.querySelector('.blur');
//for greeting
const greet = document.querySelector('.showcase .content-text h1');
const care = document.querySelector('.showcase .content-text h4');
const illustration = document.querySelector('.showcase .content-illustration img');
// Gallery Images
let images = '';
let styles = '';
const items = document.querySelector('.frame-image');
const style = document.querySelector('style');


// Profile Active
function toggleProfile()
{
  let popup = document.querySelector('.profile-card');
  blur.classList.toggle('active');
  popup.classList.toggle('active');
}

// Popup Active
function toggle()
{
  let popup = document.querySelector('.popup');
  blur.classList.toggle('active');
  popup.classList.toggle('active');
}

//Popup Image
function toggleImg(srcImg)
{
  let popupImg = document.querySelector('.popup-image');
  let img = `<img src="${srcImg}" alt="">`;
  blur.classList.toggle('active-img');
  popupImg.classList.toggle('active');
  popupImg.innerHTML = img;
  //close popup with blur
  blur.addEventListener('click', () => {
    blur.classList.remove('active-img');
    popupImg.classList.remove('active');
  });
}

//Greeting
function greeting()
{
  let today = new Date();
  let crrDate = today.getUTCDate();
  let crrMonth = today.getUTCMonth() + 1;
  let crrYear = today.getUTCFullYear();
  let age = crrYear - 2005;
  let hours = today.getHours();
  //Special Day
  if (crrDate == 20 && crrMonth == 1)
  {
    greet.innerHTML = "Happy Birthday!";
    care.innerHTML = "may all your dreams come true";
    illustration.src = 'IMG/BdayCake.svg';
    //change illustration
    if (hours >= 6 && hours <= 11) //11.59
    {
      //bdaycake
      illustration.src = 'IMG/BdayCake.svg';
    }
    else if (hours >= 12 && hours <= 17) //17.59
    {
      //giftcard
      illustration.src = 'IMG/GiftCard.svg';
    }
    else
    {
      //party
      illustration.src = 'IMG/Party.svg';
    }
  }
  //Everyday
  else
  {
    if (hours >= 6 && hours <= 11) //11.59
    {
      //good Morning
      greet.innerHTML = "Good Morning!";
      care.innerHTML = "are you ready to start your day?";
    }
    else if (hours >= 12 && hours <= 17) //17.59
    {
      //good afternoon
      greet.innerHTML = "Good Afternoon!";
      care.innerHTML = "you're doing great! keep it up";
    }
    else
    {
      //good evening
      greet.innerHTML = "Good Evening!";
      care.innerHTML = "how was day?";
    }
  }
}

greeting();


// Gallery Images
for (let i = 1; i <= 8; i++) {
  images +=
    `<div class="intro-fade-pop item item-${i}">
      <img src="IMG/Gallery/img-${i}.jpg" alt="">
    </div>`
    ;
  styles +=
    `.gallery .item-${i}
    {
      grid-area: img-${i};
    }`
    ;
}

items.innerHTML = images;
style.innerHTML = styles;

// click image then show image
const image = items.querySelectorAll('.item');
image.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    let getImg = e.target.querySelector('img').getAttribute('src');
    //call popup image function
    toggleImg(getImg);
  });
});


//Fetch API to Journal
fetch('JSON/journalData.json')
  .then(res => res.json())
  .then(r => {
    const popupContent = document.querySelector('.popup .content-text p');
    const popupTitle = document.querySelector('.popup .content-text h1');
    const containerCard = document.querySelector('.journal .content-cards');
    let card = '';
    let popup = '';

    r.forEach((data, i) => {
      //max char in title card
      let char = [...data.title];
      let maxChar = char.slice(0, 43);
      if (maxChar.length == 43)
      {
        maxChar.push('...');
      }

      card += `<div class="card intro-wavy">
        <div class="content-text text-center">
          <h1 class="md">${maxChar.join('')}</h1>
        </div>

        <button type="button" name="button" class="btn btn-outline btn-oprimary" data-index="${i}">Read More</button>

        <div class="card-footer flex">
          <div class="post-date">
            <span class="flex"><i class='bx bx-time-five icon'></i>${data.time.date}/${data.time.month}/${data.time.year}</span>
          </div>

          <div class="badge bg-dark-green">
            <strong>${data.badge}</strong>
          </div>
        </div>
      </div>`
      ;
    });

    containerCard.innerHTML = card;

    containerCard.addEventListener('click', function (e) {
      if (e.target.className == 'btn btn-outline btn-oprimary')
      {
        let indexCard = e.target.dataset.index;
        let dataTitle = r[indexCard].title;
        let dataJournal = r[indexCard].content;
        popupTitle.innerHTML = dataTitle;
        popupContent.innerHTML = dataJournal;
        //call popup function
        toggle();
      }
    });

  });
