const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
var bookmarks =[];  
// Show Modal, Focus on Input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

function hideModal(){
    modal.classList.remove('show-modal');
}


// Modal Event Listeners
modalShow.addEventListener('click',showModal)
modalClose.addEventListener('click',hideModal);
window.addEventListener('click', (e) => (e.target === modal ? hideModal() : false));

// Fetch bookmarks
function fetchBookmarks(){
    // get bookmarks from localstorage
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    else{
        // create bookmarks array in localStorage
        bookmarks = [{
            name:'Truong Bui',
            url: 'https://https://github.com/NhatTruong-dotnet?tab=repositories',
        },
    ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// validate form
function validate(nameValue, urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('Please submit values for both fields');
        return false;
    }
    if (!urlValue.match(regex)) {
        alert('Provide a valid web address');
        return false;
    }
    return true;
}

// Handle Data from form
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    if(!validate(nameValue, urlValue)){
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue
    };
    bookmarks.push(bookmark);
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Build Bookmarks DOM
function buildBookmarks(){
    bookmarks.forEach((bookmark) => {
        const{name,url} = bookmark;
        
    });
}
// event listener
bookmarkForm.addEventListener('submit', storeBookmark);  
fetchBookmarks();