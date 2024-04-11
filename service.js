var gCurrVideoIdx = 0
var gWiki

//const gOuth = `AIzaSyDSp-_fO5RWW8qCu4_NnIOVvUJme6zpkqY`
//const gOuth = `AIzaSyCA9lhu-WxSO6PCnTkiTyWaW4GW4Oqh2MU`
const gOuth = `AIzaSyCrwdxv8O0gVhUYv9Z6DV_gxGuY2My6r5U`


var gMovies
function getMoviesBySearch(searchTxt) {
    console.log(searchTxt);
    gMovies = loadFromStorage('movies')
    gWiki = loadFromStorage('wiki')
    console.log(gMovies);
    if (gWiki.length > 0 && gMovies.length > 0) {
        console.log(gMovies, gWiki);
        var prmGmovies = Promise.resolve(gMovies)
        var prmGmovies = Promise.resolve(gWiki)
        return Promise.all([gMovies, gWiki])
    }

    var usApi = `https://www.googleapis.com/youtube/v3/search?part=snippet
&videoEmbeddable=true&type=video&key=${gOuth}&q=${searchTxt}`
    var urlWiki = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchTxt}&format=json`
    // const movies = loadFromStorage(movies_key) || {}

    // if (movies[genre.name]) {
    //  return Promise.resolve(movies[genre.name])
    //  }
    var prmsWiki = axios.get(urlWiki).then(res => {

        gWiki = res.data.query.search
        saveToStorage('wiki', gWiki)
        console.log(res.data.query.search)
        return res.data.query.search
    })

    var prmsYou = axios.get(usApi)
        .then(res => {
            console.log(res.data.items);


            var youtubeVid = getIdVideo(res.data.items)
            // gMovies = youtubeVid
            console.log(youtubeVid);
            gMovies = youtubeVid
            console.log(gMovies);
            saveToStorage('movies', gMovies)
            return getIdVideo(res.data.items)

        })
    // .then(data => {
    // const moviesData = getPrepareData(data)
    //  movies[genre.name] = moviesData
    //saveToStorage(movies_key, movies)

    //}
    // )

    console.log(gMovies);



    return Promise.all([prmsYou, prmsWiki])
}

function getIdVideo(res) {
    console.log(res);
    var map = []
    for (var i = 0; i < res.length; i++) {
        var youtubeElement = {
            idx: i,
            id: res[i].id.videoId,
            title: res[i].snippet.title,
            imgUrl: res[i].snippet.thumbnails.default.url
        }
        console.log(youtubeElement);
        map.push(youtubeElement)

    }
    return map
}

function changeVideo(idx) {
    gCurrVideoIdx = idx
}