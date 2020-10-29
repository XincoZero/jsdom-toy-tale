let addToy = false;
const toyList = document.querySelector('#toy-collection')


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys()
  createFormListener()
  likeButtonIncrease()
});


function fetchToys () {
  fetch ("http://localhost:3000/toys")
  .then (response => response.json())
  .then (json => renderToys(json) )
}

function renderOneToy(toy){
  const card = document.createElement('div')
    card.className = 'card'
    const header = document.createElement('h2')
    header.innerText = toy.name
    card.appendChild(header)
    const img = document.createElement('img')
    img.className = 'toy-avatar'
    img.src = toy.image
    card.appendChild(img)
    const numLikes = document.createElement('p')
    numLikes.innerText = toy.likes + ' likes'
    card.appendChild(numLikes)
    const likeButton = document.createElement('button')
    likeButton.className = 'like-btn'
    likeButton.innerText = 'Like <3'
    card.appendChild(likeButton)
    toyList.appendChild(card)
}


function renderToys(toys) {
  toys.forEach(toy => {
    renderOneToy(toy) 
  } )

}

function createFormListener () {
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', function (event){
    event.preventDefault()
    const formData = {
      name: event.target["name"].value,
      image: event.target["image"].value,
      likes: 0
    }
    const reqObj = {
      method: "POST", 
      headers: 
  {
       "Content-Type": "application/json",
       "Accept": "application/json"
  },
  body: JSON.stringify(formData)
    }
    fetch ("http://localhost:3000/toys", reqObj)
    .then (response => response.json())
    .then (newToy => {
      console.log(newToy)
      renderOneToy(newToy)
    } ) 
  })

}

function likeButtonIncrease() {
  const toyCollection = document.querySelector('#toy-collection')
  toyCollection.addEventListener('click', function(event){
    if(event.target.className === 'like-btn'){
      increaseLikes(event)
    }

  })

  function increaseLikes(event) {
    const likedCard = event.target.parentNode 
    debugger

  }

}




// PATCH http://localhost:3000/toys/:id
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "likes": <new number>
// })