//The latest launch section functionality
let latestLaunchSection = document.querySelector('.latest-launch');

fetch('https://api.spacexdata.com/v4/launches/latest')
  .then((res) => res.json())
  .then((data) => {
    // save the necessary data in variables
    let imgSrc = data.links.patch.large;
    let article = data.links.wikipedia;
    let youTube = data.links.webcast;
    let flightName = data.name;
    let flightDate = data.date_utc;
    // ------------------

    // create the the html elements for the aPI data
    let imgDiv = document.createElement('div');
    imgDiv.classList = 'latest-launch-img';
    latestLaunchSection.appendChild(imgDiv);

    let img = document.createElement('img');
    img.src = imgSrc;
    imgDiv.appendChild(img);
    img.setAttribute('referrerpolicy', 'no-referrer');

    //---------
    const contentDiv = document.createElement('div');
    contentDiv.classList = 'latest-launch-content';
    latestLaunchSection.appendChild(contentDiv);
    //--- flight name
    const tripName = document.createElement('h1');
    tripName.textContent = flightName;
    contentDiv.appendChild(tripName);
    //-- flight date
    const date = document.createElement('p');
    const icon = document.createElement('i');
    icon.classList = 'fa-solid fa-clock';
    date.appendChild(icon);
    const textDate = document.createElement('span');
    textDate.textContent = ` ${flightDate}`;
    date.appendChild(textDate);
    contentDiv.appendChild(date);
    //--- flight description
    const description = document.createElement('p');
    description.textContent =
      'Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1';
    contentDiv.appendChild(description);
    //---- video link
    let vidBtn = document.createElement('a');
    vidBtn.classList = 'latest-launch-video';
    vidBtn.textContent = 'Youtube Video';
    vidBtn.href = youTube;
    contentDiv.appendChild(vidBtn);
    //---- article link
    let articleBtn = document.createElement('a');
    articleBtn.classList = 'latest-launch-article';
    articleBtn.textContent = 'Read more';
    articleBtn.href = article;
    contentDiv.appendChild(articleBtn);
  })
  .catch((err) => console.log(err));

// let days = document.querySelector('.days');
// let hours = document.querySelector('.hours');
// let minutes = document.querySelector('.minutes');
// let seconds = document.querySelector('.seconds');

fetch('https://api.spacexdata.com/v4/launches/')
.then(res => res.json())
.then(data => {
  const allLaunches = document.querySelector('.all-launches-container');


   // data.forEach {
   //   cardContainer.appendChild(cardsRender(data[i]))
   // }
  data.forEach((item) => {
      allLaunches.appendChild(cardsRender(item));
      // cardsContainer.appendChild(card);
    });
})
.catch(err => console.log('error', err));


function cardsRender(incomingData) {

  const card = document.createElement("div");
  card.setAttribute('class', 'trips-card'); 
  // ** Start creation of an images div
  const tripImgDiv = document.createElement('div');
  const tripImg = document.createElement('img');
  tripImg.setAttribute('src', `${incomingData.links.patch.small}`);
  tripImg.setAttribute('alt', `${incomingData.name}`);
  tripImg.setAttribute('referrerpolicy', 'no-referrer')
  tripImgDiv.setAttribute('class', 'trip-img');
  tripImgDiv.setAttribute('class', 'trip-img');
  tripImgDiv.appendChild(tripImg)
  card.appendChild(tripImgDiv)
  // !! End creation of an images div

  // ** Start creation of an trip information div

    const tripInformationDiv = document.createElement('div');
    tripInformationDiv.setAttribute('class', 'trip-information');

    // ** start creation of heading title
    const headingTitle = document.createElement('h1');
    headingTitle.textContent = `${incomingData.name}`;
    headingTitle.setAttribute('class', 'trip-title');
    card.appendChild(tripInformationDiv)
    

    // ** start creation of trip date div
      const tripDateDiv = document.createElement('div');
      tripDateDiv.setAttribute('class', 'trip-date');
      tripDateDiv.appendChild(headingTitle)
      const clockIcon = document.createElement('i');
      clockIcon.classList.add('fa-regular', 'fa-clock');
      const datePara = document.createElement('p');
      
      datePara.textContent = `${incomingData.date_local.slice(0, 10)}`;

      tripDateDiv.appendChild(clockIcon);
      tripDateDiv.appendChild(datePara);
      tripInformationDiv.appendChild(tripDateDiv)

    // !! End creation of trip date div

    // ** start creation of trip description div
    
    const tripDescriptionDiv = document.createElement('div');
    tripDescriptionDiv.setAttribute('class', 'trip-description')
    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = `${incomingData.details}`;
    tripDescriptionDiv.appendChild(descriptionPara);
    tripInformationDiv.appendChild(tripDescriptionDiv);
    
    // !! End creation of trip description div

      // ** start creation of trip buttons div
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.setAttribute('class', 'trip-btns');

        // ?? create youtube button
        const youtubeBtn = document.createElement('a');
        youtubeBtn.textContent = 'youtube';
        youtubeBtn.setAttribute('class', 'youtube-btn');
        youtubeBtn.setAttribute('href', `${incomingData.links.webcast}`);
        youtubeBtn.setAttribute('target', '_blank');
        // ?? create read more button
        const readMoreBtn = document.createElement('a');
        readMoreBtn.textContent = 'read more ';
        readMoreBtn.setAttribute('class', 'more');
        readMoreBtn.setAttribute('href', `${incomingData.links.article}`);
        readMoreBtn.setAttribute('target', '_blank');

        const rightArrowIcon = document.createElement('i');
        rightArrowIcon.classList.add('fa-solid', 'fa-chevron-right');
        readMoreBtn.appendChild(rightArrowIcon);
        buttonsDiv.appendChild(youtubeBtn);
        buttonsDiv.appendChild(readMoreBtn);
        tripInformationDiv.appendChild(buttonsDiv)
      
      // !! End creation of trip buttons div
      
      // ** Start creation of heart icon div
        const heartDiv = document.createElement('div');
        heartDiv.setAttribute('class', 'heart')
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-regular', 'fa-heart');
        heartDiv.appendChild(heartIcon);
        tripInformationDiv.appendChild(heartDiv)
      // !! End creation of heart icon div

    // ** End creation of trip date div
  
  // !! End creation of an trip information div
  return card;
}