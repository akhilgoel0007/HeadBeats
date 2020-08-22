export const ChangeData = (state, Payload) => {
    state.PlayingWindow = Payload.PlayingWindow;
    state.PlayingSong = Payload.PlayingSong;
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