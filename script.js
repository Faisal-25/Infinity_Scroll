const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// unplash api
const count = 30;
const apiKey = `FXjaaZ6tHmVFHZzT2KGviizfzYh_p8gM2R1fclt6cR4`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
 
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// create elements for links and photos and we are adding that to dom 
function imageLoaded(){
    console.log('imageLoaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        console.log('ready =',ready);
    }
}
function displayPhotos(){
    totalImages = photosArray.length;
    console.log('totalImages', totalImages);
    //for each method 
    Array.from(photosArray).forEach((photo)=>{
        
        //Create <a> to link unsplash
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        //create images for photo
 
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        //Event Listener, check when each is finished loading
        img.addEventListener('load',imageLoaded);
        //adding shadow to image
        // item.style.box-shadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
        imagesLoaded = 0;
        //put <img > inside a

        item.appendChild(img);
        imageContainer.appendChild(item);
 
 
    });
}
//fetch request
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
         photosArray = await response.json();
         console.log(photosArray);
        displayPhotos();
        
    }catch(error){

    }
}
let counter = 0;
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos();
        
        
    
    }
});
//On Load
getPhotos();