{
  $('button#play-pause').on('click', function() {
    player.playPause();
    $(this).attr('playState', player.playState);
  });

  $('button#next').on('click', function() {
    if (player.playState !== 'playing') {return}

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const nextSongIndex = currentSongIndex + 1;
    const nextSong = album.songs[nextSongIndex];
    if (nextSongIndex >= album.songs.length) {return}
    player.playPause(nextSong);
});

  $('button#previous').on('click', function() {
    if (player.playState !== 'playing') {return}
    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const prevSongIndex = currentSongIndex - 1;
    if(currentSongIndex===0){return}
    const prevSong = album.songs[prevSongIndex];

    player.playPause(prevSong);
  });


  setInterval( () => {
    if (player.playState !== 'playing') {return}
    const currentTime = player.getTime();
    const duration = player.getDuration();
    const percent = (currentTime/duration) * 100;
    $('#time-control .total-time').text(player.prettyTime(duration) );
    $('#time-control .current-time').text(player.prettyTime(currentTime) );
    $('#time-control input').val(percent)
  }, 1000);

  $('#time-control input').on('input' , function (event){
    player.skipTo(event.target.value);
    });

  $('#volume-control input').on('input' , function (event){
      player.setVolume(event.target.value);
    });



}
