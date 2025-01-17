const contriesContainer = document.querySelector('.countries-container');
const filter = document.querySelector('.filter')
const searchInput =document.querySelector('.search-container')
const theamChanger = document.querySelector('.theamChanger')
let allcountriesData


fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data)=>{
  renderCountry(data)
  allcountriesData = data
})



filter.addEventListener('change' , (e)=>{
  fetch(`https://restcountries.com/v3.1/region/${filter.value}`)
.then((res) => res.json())
.then(renderCountry)
})


function renderCountry (data){
  contriesContainer.innerHTML=''
  data.forEach((country) => {
  
  
    const countryCard = document.createElement('a')
    countryCard.href=`country.html?name=${country.name.common}`
    countryCard.classList.add('country-card')



countryCard.innerHTML = `
    <img src="${country.flags.svg}" alt="${country.name.common}" />
            <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population}</p>
            <p><b>Resion: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
`

contriesContainer.append(countryCard)

    
  })
  
}

searchInput.addEventListener('input' , (e)=>{
  console.log(e.target.value);
  const filteredCountry = allcountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountry(filteredCountry);

})

theamChanger.addEventListener('click', ()=>
{
  document.body.classList.toggle('dark')
})