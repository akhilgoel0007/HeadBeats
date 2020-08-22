export const GetAllSongs =  (state) => {
    return state.MainData.AllSongs;
}

export const GetAllPlaylists =  (state) => {
    return state.MainData.AllPlaylists;
}

export const GetMusicPlaying =  (state) => {
    return state.MusicPlaying;
}

export const GetProfileImage =  (state) => {
    return state.ProfileImage;
}

export const GetProfileName =  (state) => {
    return state.ProfileName;
}

export const GetTheme = (state) => {
    return state.CurrentTheme;
}

export const CheckProfileName =  (state) => {
    if(state.ProfileName === null || state.ProfileName === "") {
        return false;
    } else {
        return true;
    }
}