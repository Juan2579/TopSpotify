//api variables
const API = "https://spotify-scraper.p.rapidapi.com/v1/chart"
const APIartists = "https://spotify23.p.rapidapi.com/artists/?ids="

const optionsArtists = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c723e9296dmshc409b9d1e1ad335p1c4721jsnac0711b1ef90',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};
const optionsMain = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c723e9296dmshc409b9d1e1ad335p1c4721jsnac0711b1ef90',
		'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
	}
};

//dom
const songsContainer = document.querySelector(".songs_content")

const songArtists = document.querySelector(".song_artists")

const albumsContainer = document.querySelector(".albums_content")

const artistsContainer = document.querySelector(".artists_content")

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

//api functions
async function songs(){
    try {
        const response = await fetch(`${API}/tracks/top`, optionsMain)
        const tracks = await response.json();
        let count = 1
        const listSongs = tracks?.tracks
        
            let templateSongs = `${listSongs.map(song => 
                `<div class="song_card">
                <a href="${song.shareUrl}" target="_blank">
                    <p class="song_name">${count++}. ${song.name}</p>
                    <img src="${song.album.cover[0].url}" alt="${song.name}">
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
        const response = await fetch(`${API}/albums/top`, optionsMain)
        const albums = await response.json();
        let count = 1
        const listAlbums = albums?.albums

        let templateAlbums = `${listAlbums.map(album => 
            `<div class="album_card">
                <a href="${album.shareUrl}" target="_blank">
                <p class="album_name">${count++}. ${album?.name}</p>
                <img src="${album?.cover[0].url}" alt="${album?.name}</"/>
                <p class="album_artist">${album?.artists[0].name}</p>
                </a>
            </div>`).slice(0,10).join("")
            
        }`
        albumsContainer.innerHTML = templateAlbums

    } catch (error) {
        console.log(error)
    }

}

async function artists(){
    try {
        const response = await fetch(`${API}/artists/top`, optionsMain)
        const artists = await response.json();
        const listArtists = artists.artists

        let top10Artists = listArtists.map(artist => artist.id).slice(0,10)

        let nameTop10Artists = top10Artists.join(',');

        const top10ArtistsNames = await fetch(`${APIartists}${nameTop10Artists}`, optionsArtists)
        const nameTop10ArtistsNames = await top10ArtistsNames.json();


        let count = 1
        let templateArtists = `${nameTop10ArtistsNames.artists.map(artist => 
            
            `<div class="artists_card">
                <a href="${artist.uri}" target="_blank">
                <p class="artist_name">${count++}. ${artist.name} </p>
                <img src="${artist.images[0].url}" alt="${artist.name}"/>
                </a>
            </div>`).slice(0,10).join("")
            
        }`
        artistsContainer.innerHTML = templateArtists
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
        albums, 4000)
    )
}
function executeArtists() {
    return new Promise(resolve => setTimeout(
        artists, 6000)
    )
}
async function create(){ 
    executeSongs()
    executeAlbums()
    executeArtists()
    
}
create()