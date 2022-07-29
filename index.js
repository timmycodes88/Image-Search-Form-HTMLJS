const API_KEY = '563492ad6f91700001000001e2939803b030407cbd005aafdc1843e8';

let defaultUrl = `https://api.pexels.com/v1/search?query=people`;
fetchImages(defaultUrl)


let form = document.querySelector('#search-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchQuery = document.querySelector('#search-bar').value;
    fetchImages(`https://api.pexels.com/v1/search?query=${searchQuery}`);
})


function fetchImages(urlString) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        let data = JSON.parse(xhttp.responseText);

        let container = document.querySelector('#image-containers');
        container.innerHTML = '';
        data.photos.forEach(photo => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('image-container');
            console.log(photo)
            let img = `
                    <a href="${photo.url}" target="_blank">
                        <img src="${photo.src.large}"/>
                    </a>
            `;
            newDiv.innerHTML = img;
            container.appendChild(newDiv);
        });
        }
    };
    xhttp.open("GET", urlString, true);
    xhttp.setRequestHeader('Authorization', API_KEY);
    xhttp.send();
}
