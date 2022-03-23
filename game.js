

let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again')


// An array of country codes is provided in the countries.js file.
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

//console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available


//have a countries name randomly picked from the countries.js file
let randomCountryItem = countriesAndCodes[Math.floor(Math.random()*countriesAndCodes.length)]
console.log(randomCountryItem)



//then display in the country element place holder
randomCountryElement.innerHTML = randomCountryItem.name


submitButton.addEventListener('click',function (){
    // let worldBankUrl = 'https://api.worldbank.org/v2/country/pa?format=json'
    let startUrl ='https://api.worldbank.org/v2/country/'
    let countryId = randomCountryItem['alpha-2']
    let format = '?format=json'

    let worldBankUrl = startUrl + countryId + format
    fetch(worldBankUrl)
        .then(res => res.json())
        .then( countryData => {
            let capital = countryData[1][0].capitalCity
            let answer = userAnswerElement.value
            if (answer !== capital){
                resultTextElement.innerHTML = `Incorrect, the answer is ${capital}`
            } else {
                resultTextElement.innerHTML = 'Correct!'
            }
            //let capital = countryData.capitalCity
            console.log(countryData[1][0].capitalCity)
            //console.log(capital)
        })
        .catch(err => {
            console.log(err)
        })
})
//  * read the text from the userAnswerElement
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message.
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer.
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong.
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"


playAgainButton.addEventListener('click',function (){
    userAnswerElement.value = ''
    randomCountryItem = countriesAndCodes[Math.floor(Math.random()*countriesAndCodes.length)]
    randomCountryElement.innerHTML = randomCountryItem.name
    resultTextElement.innerHTML = ''

})//

// display the country's name, handle the user's guess. If you didn't use functions in the code you've
// already written, you should refactor your code to use functions to avoid writing very similar code twice.
