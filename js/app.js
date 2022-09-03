
const putLength = (len) => {
    const numOfNews = document.getElementById("numOfNews");
    numOfNews.innerText = len;
}

const displayDetails = (data) => {
    console.log(data.data)
    const myData = data.data[0]

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "";
    const modalContents = document.createElement('div');
    modalContents.classList.add("modal-contents");
    modalContents.innerHTML = `
    <div class="modal-header p-0 pb-3">
                    <div class="about">
                    <h5 class="modal-title" id="modal-title">
                    ${myData.title}
                    </h5>
                    <p class="text-green mb-0">By: ${myData.author.name}</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
    <img src="${myData.image_url}" class="img-fluid card-img-top mb-4 modalImg" alt="Image is a bit heavy to load">
    <p>
    ${myData.details}
    </p>
    <hr>
    <p class="mb-0 d-flex align-items-center">
    <i class="far fa-star text-green"></i>
    <i class="far fa-star text-green"></i>
    <i class="far fa-star text-green"></i>
    <i class="far fa-star text-green"></i>
    <i class="far fa-star text-green me-3"></i>
    ${myData.rating.number}
     (${myData.rating.badge})
    </p>

    <p class="mb-0 mt-1">
    <i class="far fa-eye"></i> ${myData.total_view ? myData.total_view : "not found"}
    </p>
    <hr>
    <div class="d-flex align-items-center">
    <div class="img">
    <img src="${myData.author.img}" class="img-fluid author" alt="">
</div>
<div class="author-details ms-2">
    <p class="fs-14 author-name fw-semibold mb-0">
        ${myData.author.name ? myData.author.name : "not found"}
    </p>
    <p class="fs-14 mb-0">
        ${myData.author.published_date ? myData.author.published_date : "not found"}
    </p>
</div>
    </div>
`;
    modalBody.appendChild(modalContents);
}

const sort = (data) => {
    // sort news by views descending
    data.sort((a, b) => b.total_view - a.total_view);
}


const displayNews = news => {
    console.log(news.data);
    const len = news.data.length;
    putLength(len);
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    sort(news.data);

    for (const newsData of news.data) {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");
        newsCard.innerHTML = `
    <div class="card border-0 mt-4 ${newsData.others_info.is_trending ? "trending" : "not-trending"}  ${newsData.others_info.is_todays_pick ? "pick" : "not-pick"}">
        <div class="card-body">
            <div class="row">
                <div class="col-md-2 m-auto">
                    <img src="${newsData.thumbnail_url}" class="img-fluid card-img-top" alt="">
                </div>
                <div class="col-md-10 m-auto">
                    <h5 class="news-title fw-semibold">
                        ${newsData.title}
                    </h5>
                    <p class="text-green fs-14 isTrending">${newsData.others_info.is_trending ? "Trending" : ""}</p>
                    <p class="text-green fs-14 isTrending">${newsData.others_info.is_todays_pick ? "Today's Pick" : ""}</p>
                    <hr>
                        <p class="news-short">
                            ${newsData.details.slice(0, 200)}[...]
                        </p>

                        <div class="row">
                            <div class="col-md-3 col-6 p-2">
                                <div class="d-flex">
                                    <div class="img">
                                        <img src="${newsData.author.img}" class="img-fluid author" alt="">
                                    </div>
                                    <div class="author-details ms-2">
                                        <p class="fs-14 author-name fw-semibold mb-0">
                                            ${newsData.author.name ? newsData.author.name : "not found"}
                                        </p>
                                        <p class="fs-14 mb-0">
                                            ${newsData.author.published_date ? newsData.author.published_date : "not found"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6 p-2 m-auto">
                                <p class="mb-0">
                                    <i class="far fa-eye"></i> <span id="views">${newsData.total_view ? newsData.total_view : "not found"}</span>
                                </p>
                            </div>
                            <div class="col-md-3 col-6 p-2 m-auto">
                                <div class="d-flex justify-content-center align-items-center">
                                    <i class="far fa-star fs-14 text-muted mx-1"></i>
                                    <i class="far fa-star fs-14 text-muted mx-1"></i>
                                    <i class="far fa-star fs-14 text-muted mx-1"></i>
                                    <i class="far fa-star fs-14 text-muted mx-1"></i>
                                    <i class="far fa-star fs-14 text-muted mx-1"></i>
                                    <span class="d-inline-block mx-1" id="star-rating">${newsData.rating.number}</span>
                                </div>
                            </div>
                            <div class="col-md-3 col-6 p-2 m-auto text-end">
                                <button class="btn btn-green fs-14" onclick="loadModal('${newsData._id}')" data-bs-toggle="modal" data-bs-target="#newsModal">
                                    Show Details <i class="fa fa-arrow-right ms-1"></i>
                                </button>
                            </div>
                        </div>
                </div >
            </div >

        </div >
                    </div >
    `;

        newsContainer.appendChild(newsCard);
    }
}

const loadNewsDetails = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => setTimeout(() => {
            const spinner = document.getElementById("spinner");
            spinner.style.display = "none";
            displayNews(data)
        }, 1000))
        .catch(error => console.log(error));

}


const categoryListener = (id) => {
    const categoryBtn = document.getElementsByClassName("category");
    const clickedBtn = document.getElementsByClassName("btn" + id);

    const activeText = clickedBtn[0].innerText;
    // put category name into the breadcrumb
    const categoryName = document.getElementById("category-name");
    categoryName.innerText = activeText;
    for (const btn of categoryBtn) {
        const spinner = document.getElementById("spinner");
        spinner.style.display = "block";
        if (btn.classList.contains("active")) {
            btn.classList.remove('active');
        }
        clickedBtn[0].classList.add("active");

    }
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/${id}`;
    loadNewsDetails(newsUrl);
}


const loadModal = (id) => {
    const newsUrl = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(newsUrl)
        .then(res => res.json())
        .then(data => displayDetails(data))
        .catch(error => console.log(error));
}
const removeFilter = () => {
    const newsCard = document.querySelectorAll(".news-card .card");
    // console.log(newsCard.length)
    for (const card of newsCard) {
        card.style.display = "block";
    }
}
const loadTrending = () => {
    const notTrending = document.getElementsByClassName("not-trending");
    // console.log(notTrending.length)
    for (const news of notTrending) {
        news.style.display = "none";
    }
}
const loadTodaysPick = () => {
    const notPick = document.getElementsByClassName("not-pick");
    // console.log(notPick.length)
    for (const news of notPick) {
        news.style.display = "none";
    }
}



const displayCategory = categories => {
    const categoryArray = categories.data.news_category;
    const categoryContainer = document.getElementById("categories-holder");
    for (const eachCategory of categoryArray) {
        const category = document.createElement("div");
        category.innerHTML = `
                <button class="category btn${eachCategory.category_id}" onclick="categoryListener('${eachCategory.category_id}')">
                    ${eachCategory.category_name}
                </button>
        `;
        categoryContainer.appendChild(category);
    }


    const categoryBtn = document.getElementsByClassName("category");
    categoryBtn[0].classList.add("active");
}


const loadCategory = () => {
    const categoryUrl = "https://openapi.programming-hero.com/api/news/categories";
    fetch(categoryUrl)
        .then(res => res.json())
        .then(data => displayCategory(data))
        .catch(error => console.log(error));
};


const defaultNews = `https://openapi.programming-hero.com/api/news/category/01`;
loadNewsDetails(defaultNews);

loadCategory();





