export const playlistTracksSize = ((millis: number) => {
    let minutes: number = Math.floor(millis / 60000)
    let seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0))
    return minutes + ' min ' + (seconds < 10 ? '0' : '') + seconds + ' sec'
})