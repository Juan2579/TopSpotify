const API = "https://spotify-scraper.p.rapidapi.com/v1/chart/tracks/top"
const songsContainer = document.querySelector(".songs_content")
const songArtists = document.querySelector(".song_artists")
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
        const tracks = await fetchData(API)
        let count = 1
        const listSongs = tracks.tracks
        
        for (let i = 0; i < 10; i++) {
            const element = listSongs[i];
            for (let j = 0; j < element.artists.length; j++) {
                const artists = element.artists[j];
                const photos = element.album.cover.url
                let templateSongs = `${listSongs.map(song => 
                    `<div class="song_card">
                        <p class="song_name">${count++}. ${song.name}</p>
                        <img src="${song.album.cover[0].url}" alt="">
                        <p class="song_artists">${song.artists[j].name}, ${song.artists[1]?.name}</p>
                    </div>`).slice(0,10).join("")
                }`
        
        songsContainer.innerHTML = templateSongs
            }
        }
        
    } catch (error) {
        console.log(error)
    }

}

songs()