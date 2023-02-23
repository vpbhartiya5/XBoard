
function getAccordionItem(title, i) {
    return `
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading-${i+1}">
            <button class="accordion-button ${i===0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i+1}" aria-expanded="true" aria-controls="collapse-${i+1}">
                ${title}
            </button>
        </h2>
        <div id="collapse-${i+1}" class="accordion-collapse collapse ${i===0 ? 'show' : ''}" aria-labelledby="heading-${i+1}" data-bs-parent="#accordion-rss">
            <div class="accordion-body" id="slideshow-${i+1}">
                Test
            </div>
        </div>
    </div>
    `;
}

const getCarousalContainer = (i) => {
    return `
    <div id="carouselControls-${i+1}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id="slide-${i+1}">
            
            
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls-${i+1}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselControls-${i+1}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `;
}

async function getData() {
    for(let i=0; i<magazines.length; i++){
        let topic = magazines[i];
        let res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${topic}`);
        let data = await res.json();


        document.getElementById('accordion-rss').innerHTML += getAccordionItem(data.feed.title, i)

        document.getElementById(`slideshow-${i+1}`).innerHTML = getCarousalContainer(i)

        data.items.forEach( (item, j) => {
            let {author, title, description, pubDate, enclosure, link} = item;
            console.log(author, description, pubDate, enclosure)

            document.getElementById(`slide-${i+1}`).innerHTML += `
                <div class="carousel-item ${j===0 ? 'active' : ''}">
                <a href="${link}">
                    <div class="card">
                        <img src="${enclosure.link}" class="carousel-img" alt="...">
                        <div class="card-body">
                            <h5>${title}</h5>
                            <p class="text-muted">${author} <span id="sep"></span> ${new Date(pubDate).toLocaleDateString()}</p>                                                          
                            <p class="card-content"> ${description} </p>                           
                        </div>   
                    </div>
                </a>
                </div>
            `
        });
        
    
    }
}

getData();