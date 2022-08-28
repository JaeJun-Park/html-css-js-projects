const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    searchBtn = document.getElementById('search-btn'),
    randomBtn = document.getElementById('random-btn'),
    resultHeading = document.getElementById('result-heading'),
    mealsEl = document.getElementById('meals'),
    singleMealEl = document.getElementById('single-meal');



// Search meal and fetch from API 
function searchMeal(e) {
    e.preventDefault();
    // Clear single meal
    singleMealEl.innerHTML = '';

    //get saerch term
    const term = search.value;

    //check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

                if (!data['meals']) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
                } else {
                    mealsEl.innerHTML = `
                    ${data['meals'].map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealid="${meal.idMeal}"><h3>${meal.strMeal}</h3></div>
                        </div>
                    `).join('')}
                    `
                }
            })
        // Clear search text
        search.value = '';
    } else {
        alert('please enter a search term');
    }

}

// fetch meal by id
function getMealById(mealID) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(resp => resp.json())
        .then(data => data.meals[0])
        .then(meal => {
            addMealToDOM(meal);
        })
}

// add meal to DOM 
function addMealToDOM(meal) {
    const ingredients = getIngredients(meal);

    singleMealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `

}

function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    return ingredients;
}

//Fetch random meal from API 
function getRandomMeal() {
    // clear Heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
    return fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(resp => resp.json())
        .then(data => data.meals[0])
        .then(meal => {
            addMealToDOM(meal);
        })
}

// Event Listener
submit.addEventListener('submit', searchMeal);
randomBtn.addEventListener('click', getRandomMeal);
mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList.contains('meal-info'))
            return true;
        else return false;
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }

})
