
const putLength = (len) => {
    const numOfNews = document.getElementById("numOfNews");
    numOfNews.innerText = len;
}
const displayNews = news => {
    console.log(news.data);
    const len = news.data.length;
    putLength(len);
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

loadCategory();





