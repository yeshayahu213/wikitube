function onGetResBySearch(searchTxt) {
    //const results = getMovies(searchTxt)
    // console.log('results:', results)
    console.log(searchTxt);

    getMoviesBySearch(searchTxt).then(renderMovies)
}
function renderMovies(res) {
    console.log(res);

    var movies = res[0]

    const strHTMLs = movies.map(movie => `
    <article class="movieComtainer" onclick="changeSelectVideo(${movie.idx})">
   
    <img src="${movie.imgUrl}" alt="">   
    <p class="image-description"> ${movie.title}
    </p>
    </article>
`
    )
    const idx = gCurrVideoIdx
    var wikicontent = res[1]
    var wikiData = [wikicontent[0], wikicontent[1], wikicontent[2], wikicontent[3]]
    console.log(wikicontent[3]);
    const strWiki = wikiData.map(wiki => `${wiki.title} <br> ${wiki.snippet} <br> <br>`

    )
    const selectedStrHtml = ` <iframe src="https://www.youtube.com/embed/${movies[idx].id}" width="500" frameborder="0"></iframe>`

    document.querySelector('.wiki-section').innerHTML = strWiki.join('')
    document.querySelector('.items').innerHTML = strHTMLs.join('')
    document.querySelector('.video-player').innerHTML = selectedStrHtml
}

function onInit() {
    onGetResBySearch('bee')
}
function changeSelectVideo(idx) {

    changeVideo(idx)
    renderMovies([gMovies, gWiki])
}