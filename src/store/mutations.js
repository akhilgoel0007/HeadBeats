export const CHANGE_DATA = (state, Data) => {
    state.PlayingWindow = Data.PlayingWindow;
    state.PlayingSong = Data.PlayingSong;
}

export const MUSIC_PLAYING = (state, MusicPlaying) => {
    state.MusicPlaying = MusicPlaying;
}

export const CURRENT_THEME = (state, Theme) => {
    state.CurrentTheme = Theme;
}

export const PROFILE_IMAGE = (state, ProfileImage) => {
    state.ProfileImage = ProfileImage;
}

export const PROFILE_NAME = (state, ProfileName) => {
    state.ProfileName = ProfileName;
}

export const MAIN_DATA = (state, MainData) => {
    state.MainData = MainData;
}

export const ADD_NEW_SONG = (state, NewSong) => {
    state.MainData.AllSongs.push(NewSong);
}

export const ADD_NEW_PLAYLIST = (state, NewPlaylist) => {
    state.MainData.AllPlaylists.push(NewPlaylist);
}

export const CHANGE_PLAYING_SONG_STATUS = (state, Status) => {
    state.PlayingSongStatus = Status;
}