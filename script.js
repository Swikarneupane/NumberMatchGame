// Array.js

const images = [
  {
    image_name: "bananas.jpg",
    number_of_items: 6,
  },
  {
    image_name: "birthday candles.jpg",
    number_of_items: 7,
  },
  {
    image_name: "blocks.jpg",
    number_of_items: 6,
  },
  {
    image_name: "brushes.jpg",
    number_of_items: 7,
  },
  {
    image_name: "cakes.jpg",
    number_of_items: 7,
  },
  {
    image_name: "cars.jpg",
    number_of_items: 2,
  },
  {
    image_name: "crayons.jpg",
    number_of_items: 8,
  },
  {
    image_name: "cupcakes.jpg",
    number_of_items: 7,
  },
  {
    image_name: "deer.jpg",
    number_of_items: 3,
  },
  {
    image_name: "donuts.jpg",
    number_of_items: 6,
  },
  {
    image_name: "ducks.jpg",
    number_of_items: 6,
  },
  {
    image_name: "eggs.jpg",
    number_of_items: 8,
  },
  {
    image_name: "elephants.jpg",
    number_of_items: 7,
  },
  {
    image_name: "hot air balloons.jpg",
    number_of_items: 5,
  },
  {
    image_name: "jelly beans.jpg",
    number_of_items: 9,
  },
  {
    image_name: "macaroons.jpg",
    number_of_items: 7,
  },
  {
    image_name: "pencils.jpg",
    number_of_items: 12,
  },
  {
    image_name: "people.jpg",
    number_of_items: 6,
  },
  {
    image_name: "peppers.jpg",
    number_of_items: 2,
  },
  {
    image_name: "pizza slices.jpg",
    number_of_items: 8,
  },
];

// After Array.js

let currentImageValue = 0,
displayNumber = 0,
score = 0,
chosen = false;

document.getElementById("game").style.display = "none";
document.getElementById('extra').style.display = 'none';

function gameStart() {
  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "block";
}

const setImageSrc = (randomImageName) => {
  const imageContainer = document.getElementById("imageContainer");
  if (imageContainer.hasChildNodes()) {
    imageContainer.removeChild(imageContainer.firstElementChild);
  }
  const image = document.createElement("img");
  image.src = `images/${randomImageName}`;
  image.classList.add('fade');
  imageContainer.appendChild(image);
};

const generatePlusOrMinus = () => {
    const generate0or1 = Math.floor(Math.random() * 2);
    return generate0or1 === 0 ? -1 : +1 ;
}

const generateDisplayNumber = (numberOfItems, plusOrMinus) => {
    const split = Math.floor(Math.random() * 2);
    currentImageValue = numberOfItems;
    if(split === 0){
        //Display real number
        document.getElementById('noOfItems').innerHTML = numberOfItems;
        displayNumber = numberOfItems;
    }
    else {
        //Display fake number
        document.getElementById('noOfItems').innerHTML = `${numberOfItems + plusOrMinus}`;
        displayNumber = numberOfItems + plusOrMinus;
    }
}

const setImageName = (randomImageName) => {
    const imageName = randomImageName.slice(0, randomImageName.length - 4);
    document.getElementById('items').innerHTML = ` ${imageName} ?`;
}

const match = () => {
    if(!chosen) {
        currentImageValue === displayNumber ? score++ : score-- ;
        chosen = true;
        document.getElementById('scoreTot').innerHTML = score;
    }
}

const noMatch = () => {
    if(!chosen) {
        currentImageValue !== displayNumber ? score++ : score-- ;
        chosen = true;
        document.getElementById('scoreTot').innerHTML = score;
    }
}

const generate = () => {
  if (images.length === 0) {
    endOfGame();
    stopTimer();
    return;
  }
  chosen = false;
  const imageLength = images.length;
  const randomNumber = Math.floor(Math.random() * imageLength);
  const randomImageName = images[randomNumber].image_name;
  setImageSrc(randomImageName);
  setImageName(randomImageName);
  const plusOrMinus = generatePlusOrMinus();
  const numberOfItems = images[randomNumber].number_of_items;
  generateDisplayNumber(numberOfItems, plusOrMinus);
  images.splice(randomNumber, 1);
};

let timeRef;
const timer = () => {
  timeRef = setInterval(generate, 3000);
};

const endOfGame = () => {
    document.getElementById('main').style.display = 'none';
    document.getElementById('extra').style.display = 'block';
    document.getElementById('message').innerHTML = `Game Over! Your Score: ${score}/20`;
    setTimeout(() => location.reload(), 3000);
}

const play = () => {
  gameStart();
  generate();
  timer();
};

const stopTimer = () => {
  clearInterval(timeRef);
};
