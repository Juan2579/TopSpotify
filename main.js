const API = "https://spotify-scraper.p.rapidapi.com/v1/chart"

const songsContainer = document.querySelector(".songs_content")

const songArtists = document.querySelector(".song_artists")

const albumsContainer = document.querySelector(".albums_content")

//navbar
const menuHamburger = document.querySelector(".navbar_menu")
const menuClose = document.querySelector(".navbar_close")
const menuHidden = document.querySelector(".navbar_mobile-hidden")

const openNavigation = () => {
    menuHamburger.style.display = "none"

    menuClose.style.display = "block"

    menuHidden.classList.add("shown")
    menuHidden.classList.remove("hidden")

}
const closeNavigation = () => {
    menuHamburger.style.display = "block"

    menuClose.style.display = "none"

    menuHidden.classList.remove("shown")
    menuHidden.classList.add("hidden")
    
}
//end of navbar
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c723e9296dmshc409b9d1e1ad335p1c4721jsnac0711b1ef90',
		'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
	}
};

// const fetchData = async (urlApi) => {
//     const response = await fetch(urlApi, options);
//     const data = await response.json();
//     return data
// }

async function songs(){
    try {
        const response = await fetch(`${API}/tracks/top`, options)
        const tracks = await response.json();
        let count = 1
        const listSongs = tracks?.tracks
        
            let templateSongs = `${listSongs.map(song => 
                `<div class="song_card">
                <a href="${song.shareUrl}" target="_blank">
                    <p class="song_name">${count++}. ${song.name}</p>
                    <img src="${song.album.cover[0].url}" alt="">
                    <p class="song_artists">${song.artists?.map(artist => artist.name).join(', ')}</p>
                </a>
                </div>`).slice(0,10).join("")
                }`
        songsContainer.innerHTML = templateSongs    
    } catch (error) {
        console.log(error)
    }
}

async function albums(){
    
    try {
        const response = await fetch(`${API}/albums/top`, options)
        const albums = await response.json();
        let count = 1
        const listAlbums = albums?.albums

        let templateAlbums = `${listAlbums.map(album => 
            `<div class="album_card">
                <a href="${album.shareUrl}" target="_blank">
                <p class="album_name">${count++}. ${album?.name}</p>
                <img src="${album?.cover[0].url}"/>
                <p class="album_artist">${album?.artists[0].name}</p>
                </a>
            </div>`).slice(0,10).join("")
            
        }`
        albumsContainer.innerHTML = templateAlbums

    } catch (error) {
        console.log(error)
    }

}
function executeSongs(){
    return new Promise(resolve => setTimeout(
        songs, 1000)
    )
}
function executeAlbums() {
    return new Promise(resolve => setTimeout(
        albums, 5000)
    )
}
async function create(){ 
    executeSongs()
    executeAlbums()
    
}
create()

