import fs from 'fs'
import * as mm from 'music-metadata';
import * as util from 'util';

export const LoadData = ({ commit, getters }) => {
    fs.readFile('src/MainData.json', (err, Data) => {
        if(err) {
            throw err;
        } else {
            var CurrentData = JSON.parse(Data);

            commit('MUSIC_PLAYING', CurrentData.MusicPlaying);
            commit('CURRENT_THEME', CurrentData.Theme);
            
            if(CurrentData.ProfileImage === "" || CurrentData.ProfileName === null) {
                commit('PROFILE_IMAGE', '../../../data/logo.png');
            } else {
                commit('PROFILE_IMAGE', CurrentData.ProfileImage);
            }

            commit('PROFILE_NAME', CurrentData.ProfileName);
        }
    })

    fs.readFile('src/Songs.json', (err, data) => {
        if(err) {
            throw err;
        } else {
            var GetMainData = JSON.parse(data)
            commit('MAIN_DATA', GetMainData);

            getters.GetAllSongs.forEach(Song => {
                mm.parseFile(Song.Source)
                .then( metadata => {
                    util.inspect(metadata, {showHidden:true, depth: null});
                
                    if(metadata.common.picture) {
                        Song.ImageSrc = `data:${metadata.common.picture[0].format}; base64,${metadata.common.picture[0].data.toString('base64')}`;
                    } else {
                        Song.ImageSrc = 'http://localhost:8080/data/logo.png'
                    }
                });
            })

            getters.GetAllPlaylists.forEach(Playlist => {
                Playlist.ContentOfPlaylist.forEach(PlaylistSong => {
                    mm.parseFile(PlaylistSong.Source)
                    .then( metadata => {
                        util.inspect(metadata, {showHidden:true, depth: null});
                        if(metadata.common.picture) {
                            PlaylistSong.ImageSrc = `data:${metadata.common.picture[0].format}; base64,${metadata.common.picture[0].data.toString('base64')}`;
                        } else {
                            PlaylistSong.ImageSrc = 'http://localhost:8080/data/logo.png'
                        }
                    });
                })
            })
        }
    })
}

export const UpdateChanges = async function({ getters }) {
    var Buffer = {
        AllSongs: [],
        AllPlaylists: []
    }

    getters.GetAllSongs.forEach(Song => {
        const ThisSong = {
            Id: Song.Id,
            Source: Song.Source,
            Author: Song.Author,
            Title: Song.Title,
            Duration: Song.Duration,
            DisplayDuration: Song.DisplayDuration,
            Tags: Song.Tags
        }

        Buffer.AllSongs.push(ThisSong);
    })

    getters.GetAllPlaylists.forEach(Playlist => {
        const ThisPlaylist = {
            Name: Playlist.Name,
            ContentOfPlaylist: []
        }

        Playlist.ContentOfPlaylist.forEach(PlaylistSong => {
            const ThisPlaylistSong = {
                Id: PlaylistSong.Id,
                Source: PlaylistSong.Source,
                Author: PlaylistSong.Author,
                Title: PlaylistSong.Title,
                Duration: PlaylistSong.Duration,
                DisplayDuration: PlaylistSong.DisplayDuration,
                Tags: PlaylistSong.Tags
            }

            ThisPlaylist.ContentOfPlaylist.push(ThisPlaylistSong)
        })

        Buffer.AllPlaylists.push(ThisPlaylist)
    })

    fs.writeFile('src/Songs.json', JSON.stringify(Buffer), (err) => {
        if(err) {
            throw err;
        }
    });
}

export const UpdateSettings = async function({ commit, getters }, Payload) {
    commit('MUSIC_PLAYING', Payload.MusicPlaying)
    Payload.ProfileImage = getters.GetProfileImage;
    Payload.ProfileName = getters.GetProfileName;
    
    var SettingsBuffer = Object.assign({}, Payload);

    fs.writeFile('src/MainData.json', JSON.stringify(SettingsBuffer), (err) => {
        if(err) {
            throw err;
        }
    });
}

export const UpdateMainData = async function({ commit, getters }, Payload) {
    var MainPayload = {
        MusicPlaying: getters.GetAllSongs, 
        ProfileImage: getters.GetProfileImage,
        ProfileName: getters.GetProfileName,
        Theme: getters.GetTheme
    }

    if(Payload.Target === 'MusicPlaying') {

        MainPayload.MusicPlaying = Payload.MusicPlaying;
        commit('MUSIC_PLAYING', Payload.MusicPlaying);
    
    } else if(Payload.Target === 'ProfileImage') {
    
        MainPayload.ProfileImage = Payload.ProfileImage;
        commit('PROFILE_IMAGE' , Payload.ProfileImage);
    
    } else if(Payload.Target === 'ProfileName') {
    
        MainPayload.ProfileName = Payload.ProfileName;
        commit('PROFILE_NAME', Payload.ProfileName);
    
    } else if(Payload.Target === 'Theme') {
    
        MainPayload.Theme = Payload.Theme;
    
    }

    var ProfileBuffer = Object.assign({}, MainPayload);
    
    fs.writeFile('src/MainData.json', JSON.stringify(ProfileBuffer), (err) => {
        if(err) {
            throw err;
        }
    });
}

export const UpdateProfile = async function({ commit }, Payload) {
    Payload.MusicPlaying = this.state.MusicPlaying
    commit('PROFILE_IMAGE' , Payload.ProfileImage);
    commit('PROFILE_NAME', Payload.ProfileName);
    
    var ProfileBuffer = Object.assign({}, Payload);

    fs.writeFile('src/MainData.json', JSON.stringify(ProfileBuffer), (err) => {
        if(err) {
            throw err;
        }
    });
}

export const ChangeAuthorName = ({ dispatch, getters }, Payload) => {
    getters.GetAllSongs.forEach(Song => {
        if(Song.Source === Payload.Source) {
            Song.Author = Payload.AuthorName
        }
    })

    getters.GetAllPlaylists.forEach(Playlist => {
        Playlist.ContentOfPlaylist.forEach(PlaylistSong => {
            if(PlaylistSong.Source === Payload.Source) {
                PlaylistSong.Author = Payload.AuthorName;
            }
        })
    })

    dispatch('UpdateChanges');
}

export const ChangeSongName = ({ dispatch, getters }, Payload) => {
    getters.GetAllSongs.forEach(Song => {
        if(Song.Source === Payload.Source) {
            Song.Title = Payload.SongName
        }
    })

    getters.GetAllPlaylists.forEach(Playlist => {
        Playlist.ContentOfPlaylist.forEach(PlaylistSong => {
            if(PlaylistSong.Source === Payload.Source) {
            PlaylistSong.Title = Payload.SongName
            }
        })
    })

    dispatch('UpdateChanges');
}

export const AddPayload = async function({ dispatch, commit, getters }, Payload) { 
    //Identifies if the added song is already present.. if not adds it to list..
    
    for(var i=0; i<Payload.length; ++i) {
        var Present = false;
        getters.GetAllSongs.forEach(Song => {
            if((Song.Title == Payload[i].Title) || (Song.Source == Payload[i].Source)) {
                Present = true;
            }
        })

        if(!Present) {
            Payload[i].Id = getters.GetAllSongs.length + 1
            
            await mm.parseFile(Payload[i].Source)
            .then( metadata => {
                util.inspect(metadata, {showHidden:true, depth: null});
                if(metadata.common.picture) {
                    Payload[i].ImageSrc = `data:${metadata.common.picture[0].format}; base64,${metadata.common.picture[0].data.toString('base64')}`;
                } else {
                    Payload[i].ImageSrc = 'http://localhost:8080/data/logo.png'
                }
            });

            commit('ADD_NEW_SONG', Payload[i]);
        }
    }

    dispatch('UpdateChanges');
}

export const AddNewSongs = ({ dispatch }, payload) => {
    dispatch('AddPayload', payload);
}

export const AddToPlaylist = ({ dispatch, getters }, Payload) => {
    getters.GetAllSongs.forEach(Song => {
        if(Song.Id === Payload.Id) {
            let ThisSong = {
                Id: 0,
                Source: Song.Source,
                Author: Song.Author,
                Title: Song.Title,
                Duration: Song.Duration,
                DisplayDuration: Song.DisplayDuration,
                ImageSrc: Song.ImageSrc,
                Tags: Song.Tags
            }

            for(var i=0; i<Payload.Playlists.length; ++i) {
                getters.GetAllPlaylists.forEach(Playlist => {
                    var AlreadyPresent = false;
                    if(Playlist.Name === Payload.Playlists[i]) {
                        Playlist.ContentOfPlaylist.forEach(Song => {
                            if(Song.Source === ThisSong.Source) {
                                AlreadyPresent = true;
                            }
                        })

                        if(!AlreadyPresent) {
                            ThisSong.Id = Playlist.ContentOfPlaylist.length + 1
                            Playlist.ContentOfPlaylist.push(ThisSong)
                        }
                    }
                })
            }
        } 
    })

    dispatch('UpdateChanges');
}

export const AddNewPlaylist = ({ dispatch, commit}, NewPlaylist) => {
    var CreatePlaylist = {
        Name: NewPlaylist,
        ContentOfPlaylist: []
    }

    commit('ADD_NEW_PLAYLIST', CreatePlaylist);
    dispatch('UpdateChanges');
}

export const SetImagePath = ({ commit }, Payload) => {
    commit('PROFILE_IMAGE', Payload);
}