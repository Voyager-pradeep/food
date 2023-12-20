const API_KEY = "13998129302b46b3bdead2b5e0e10269";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fetchNews("asia"));

function reload() {
    window.location.reload();
}

let cardscontainer = document.getElementById('cards-container');
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const datas = await res.json();
    let articles = datas.articles;
    display(articles);
}

function display(datas) {
    let datasinfo = datas.map(function (data) {
        const date = new Date(data.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
        // console.log(data.title);
        if (!data.urlToImage) return;
        // console.log(data.title);
        return `<article id="template-news-card">
        <a href="${data.url}" class="data-url" target="_blank">
        <div class="card">
        <div class="card-header">
        <img src="${data.urlToImage}" alt="news-image" id="news-img">
        </div>
        <div class="card-content">
        <h3 id="news-title">${data.title}</h3>
        <h6 class="news-source" id="news-source">${data.source.name} · ${date}</h6>
        <p class="news-desc" id="news-desc">${data.content}</p>
        </div>
        </div>
        </a>
        </article>`
    })
    datasinfo = datasinfo.join("");
    // console.log(datasinfo);
    cardscontainer.innerHTML = datasinfo;

}

const navInput = document.getElementById('nav-input');
const navButton = document.getElementById('nav-submit');


const coolLinks = document.querySelectorAll('.cool-link');
let colorlink = null;

coolLinks.forEach(function (link) {
    link.addEventListener("click", function (item) {
        item.preventDefault();
        const id = item.currentTarget.getAttribute('id');
        fetchNews(id);

        if (colorlink !== null) {
            console.log(id);
            const prevLink = document.getElementById(colorlink);
            console.log(prevLink);
            prevLink.classList.remove('active');
        }



        if (!item.currentTarget.classList.contains('active')) {
            item.currentTarget.classList.add("active");
        }
        colorlink = id;
    })
})

navButton.addEventListener('click', () => {
    const prevLink = document.getElementById(colorlink);
    prevLink.classList.remove('active');
})

const topLink = document.querySelector(".top-link");

window.addEventListener('scroll', function () {
    const scrollHeight = window.pageYOffset;

    if (scrollHeight > 800) {
        topLink.classList.add('show-link');
    }
    else {
        topLink.classList.remove('show-link');
    }

})


navButton.addEventListener('click', function () {
    const text = navInput.value;
    if (!text) return;
    fetchNews(text);
    navInput.value = "";
})

// time
const time = document.getElementById('time');

function clock() {
    const time2 = new Date();

    time.innerHTML = time2.toString().slice(0, 24);
}

setInterval(() => {
    clock()
}, 1000);



window.addEventListener("load", () => findlocation());

const c_location = document.getElementById('location');
let mylocation = null;


async function findlocation() {
    const result = navigator.geolocation.getCurrentPosition(gotlocation, failtoget)
}
function gotlocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;


    const geoApiUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en'

    fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
            mylocation = data.city;
            c_location.innerHTML = mylocation;

        })
}
function failtoget() {
    console.log("failed");
}

function name1() {

    // console.log(`${mylocation}`);

    const weatherApiUrl1 = "http://api.openweathermap.org/data/2.5/weather?q="
    const weatherApiUrl2 = `${mylocation}`
    const weatherApiUrl3 = "&APPID=3ef1efb1d2ba1f0d5b10d5324f315a7a"
    const weatherApiUrl4 = weatherApiUrl1 + weatherApiUrl2 + weatherApiUrl3
    // console.log(weatherApiUrl);
    fetch(weatherApiUrl4)
        .then(res => res.json())
        .then(data => {
            const temppre = document.getElementById('temp');
            let temp = (data.main.temp - 273.15).toFixed(1) + "\u00b0";
            console.log(temp);
            temppre.innerHTML = temp;
        })
}


setTimeout(() => {
    name1();
}, 3000);


const nightMode = document.getElementById("night-mode");
const DMtext = document.getElementById("nm-text")
let flag = 0;
nightMode.addEventListener('click', () => {
    console.log(flag);
    if (flag%2== 0) {
        document.body.style.backgroundColor = '#23395D';
        document.body.style.color = 'white';
        DMtext.innerHTML = 'Normal Mode';
        coolLinks.forEach((link) => {
            link.style.color = 'WHITE'
            cardscontainer.style.backgroundColor = 'rgba(0, 0, 0,.75)';
            cardscontainer.classList.add('shad')
            flag++;
            console.log("1st one is running");
        })
        return;
    }
    if (flag%2==1) {
        console.log(flag);
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        DMtext.innerHTML = 'Dark Mode';
        coolLinks.forEach((link) => {
            link.style.color = 'hsl(209,61%,16%)'
            cardscontainer.style.backgroundColor = 'hsl(212,33%,89%)';
            cardscontainer.classList.remove('shad')
            flag++;
            console.log("2nd one is running");
        })
       
    }
});



