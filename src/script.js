// https://uk.wikipedia.org/wiki/SOAP
// https://itstatti.in.ua/stvorennya-sajtiv/77-shcho-take-proksi-server-i-navishcho-vin-potriben.html
// https://www.postman.com/downloads/
// https://www.weatherapi.com/docs/
// https://handlebarsjs.com/guide/
//

// JS DOCcomment /** + emmit



const searchForm = document.querySelector('.js-search-form');
// --------------------наш створений контейнер---------------------
const list = document.querySelector('.js-list');

searchForm.addEventListener('submit', handlerSearch);

/**
 * Handler search weather form
//  * @param {*} evt
 */


// --------------------Створю\ колбек функцію----------------------------
function handlerSearch(evt) {
    evt.preventDefault();

    console.dir (evt.currentTarget);
    const { city, days } = evt.currentTarget.elements;
    console.dir(city);     
    // console.dir(days);

    serviceWeather(city.value, days.value)
    .then(data => list.innerHTML = createMarkup(data.forecast.forecastday))
    .catch(err => console.error(err))
    // ---------Очищуємо форму після введення---------------------
    .finally(() => searchForm.reset())
                
        }


/**
 * Service weather API
 * @param {String} city
 * @param {Number} days
 * @returns {Promise} response data
 */



// створюємо функцію, яка робить запит на бекенд 
function serviceWeather(city = '', days = 1){
    const BASE_URL ='http://api.weatherapi.com/v1';
    const API_KEY ='3ad27d6553fe4b99a70183810231605';
// ------------1-й варіант-------------------------------
    // return fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`).then(resp => console.log(resp))

// -----------2-й варіант-------------------------------

const params = new URLSearchParams({
            key: API_KEY,
            q: city,
            days: days,
            lang: 'uk'
        })
        // console.log(params.toString());
        return fetch(`${BASE_URL}/forecast.json?${params}`)
            .then(resp => {
                console.log(resp);
                if (!resp.ok) {
                    throw new Error(resp.statusText)
                }
    
                return resp.json()
            })
    }

// serviceWeather('rctunht',5)
//     .then(data =>console.log(data))
//     .catch(err => console.error(err))




    // ---------------Створюємо розмітку--------------

/**
 * Create forecast card
 * @param {Array} arr
 * @returns {String} HTML markup
 */

    function createMarkup(arr) {
            return arr.map(({ date, day: { avgtemp_c, condition: { text, icon } } }) => 
            `<li>
            <img src="${icon}" alt="${text}">
            <h2>${date}</h2>
            <h3>${text}</h3>
            <h3>${avgtemp_c}</h3>
        </li>`).join('');
        }




