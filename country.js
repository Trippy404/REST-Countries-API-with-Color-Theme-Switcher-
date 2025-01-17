const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const counteryHeading = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const Countrypopulation = document.querySelector('.Population')
const region =document.querySelector('.resion')
const subRegino = document.querySelector('.sub-region')
const capital= document.querySelector('.capital')
const topLevelDomain= document.querySelector('.domain')
const currency = document.querySelector('.currency')
const language= document.querySelector('.language')
const bordercountries=document.querySelector('.border-countries')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {



    flagImage.src = country.flags.svg
    counteryHeading.innerText= country.name.common
    Countrypopulation.innerText = country.population.toLocaleString('en-IN')
    region.innerText=country.region
    
    
    topLevelDomain.innerText=country.tld.join(',')

    if(country.capital){
        capital.innerText=country.capital?.[0]
    }
   
    if(country.subregion){
        subRegino.innerText = country.subregion
    }
    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }
    else{
        nativeName.innerText = country.name.common
    }
    if(country.currencies){
        currency.innerText= Object.values(country.currencies).map((currency) =>currency.name).join(',')
       }

    if(country.languages){
        language.innerText=Object.values(country.languages).join(',');
       } 
       
    if(country.borders)   {
        country.borders.forEach((border) => {
            
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json())
            .then(([bordercountry]) => {
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText=bordercountry.name.common
                borderCountryTag.href=`country.html?name=${bordercountry.name.common}`
                bordercountries.append(borderCountryTag)
            })
        });
    }
})


