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
		'X-RapidAPI-Key': '2f1e30ad67msh7626fc9efeaaa81p13d475jsn2f50be4152a0',
		'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
	}
};

const fetchData = async (urlApi) => {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data
}

async function songs(){
    try {
        const tracks = await fetchData(`${API}/tracks/top`)
        let count = 1
        const listSongs = tracks?.tracks
        
            let templateSongs = `${listSongs.map(song => 
                `<div class="song_card">
                    <p class="song_name">${count++}. ${song.name}</p>
                    <img src="${song.album.cover[0].url}" alt="">
                    <p class="song_artists">${song.artists?.map(artist => artist.name).join(', ')}</p>
                </div>`).slice(0,10).join("")
                }`
        songsContainer.innerHTML = templateSongs    
    } catch (error) {
        console.log(error)
    }
}

async function albums(){
    
    try {
        const albums = await fetchData(`${API}/albums/top`)
        let count = 1
        const listAlbums = albums?.albums

        let templateAlbums = `${listAlbums.map(album => 
            `<div class="album_card">
                <p class="album_name">${count++}. ${album?.name}</p>
                <img src="${album?.cover[0].url}"/>
                <p class="album_artist">${album?.artists[0].name}</p>

            </div>`).slice(0,10).join("")

        }`
        albumsContainer.innerHTML = templateAlbums

    } catch (error) {
        console.log(error)
    }

}
async function create(){
    setTimeout(
        await songs(), 1000
    )
    await albums()
}
create()

