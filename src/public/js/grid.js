var elem = document.querySelector('.grid-container');

imagesLoaded( elem, ()=>{
    var msnry = new Masonry( elem, {
        // options
        itemSelector: '.mult'
    });
} )