import Vue from 'vue'
import Vuex from 'vuex'
import fs from 'fs'
import * as mm from 'music-metadata';
import * as util from 'util';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MainData: [],
    MusicPlaying: 2,
    PlayingWindow: null,
    PlayingSong: null,
  },

  mutations: {

    ChangeData: function(state, Payload) {
      state.PlayingWindow = Payload.PlayingWindow
      state.PlayingSong = Payload.PlayingSong
    },
  },
  
  getters: {
    GetAllSongs: state => {
      return state.MainData.AllSongs
    },

    GetAllPlaylists: state => {
      return state.MainData.AllPlaylists
    },

    GetMusicPlaying: state => {
      return state.MusicPlaying
    }
  },

  actions: {
    LoadData: function() {
      fs.readFile('src/Songs.json', (err, data) => {
        if(err) {
          throw err;
        } else {
          this.state.MainData = JSON.parse(data)
          this.state.MainData.AllSongs.forEach(Song => {
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

          this.state.MainData.AllPlaylists.forEach(Playlist => {
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
    },
    
    UpdateChanges: async function() {
      var Buffer = {
        AllSongs: [],
        AllPlaylists: []
      }

      this.state.MainData.AllSongs.forEach(Song => {
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

      this.state.MainData.AllPlaylists.forEach(Playlist => {
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
    },

    ChangeAuthorName: function(context, Payload) {
      this.state.MainData.AllSongs.forEach(Song => {
        if(Song.Source === Payload.Source) {
          Song.Author = Payload.AuthorName
        }
      })

      this.state.MainData.AllPlaylists.forEach(Playlist => {
        Playlist.ContentOfPlaylist.forEach(PlaylistSong => {
          if(PlaylistSong.Source === Payload.Source) {
            PlaylistSong.Author = Payload.AuthorName
          }
        })
      })

      context.dispatch('UpdateChanges');
    },

    ChangeSongName: function(context, Payload) {
      this.state.MainData.AllSongs.forEach(Song => {
        if(Song.Source === Payload.Source) {
          Song.Title = Payload.SongName
        }
      })

      this.state.MainData.AllPlaylists.forEach(Playlist => {
        Playlist.ContentOfPlaylist.forEach(PlaylistSong => {
          if(PlaylistSong.Source === Payload.Source) {
            PlaylistSong.Title = Payload.SongName
          }
        })
      })

      context.dispatch('UpdateChanges');
    },

    AddPayload: async function(context, Payload) { 
      //Identifies if the added song is already present.. if not adds it to list..
      
      for(var i=0; i<Payload.length; ++i) {
        var Present = false;
        this.state.MainData.AllSongs.forEach(Song => {
          if((Song.Title == Payload[i].Title) || (Song.Source == Payload[i].Source)) {
            Present = true;
          }
        })

        if(!Present) {
          Payload[i].Id = this.state.MainData.AllSongs.length + 1
          
          await mm.parseFile(Payload[i].Source)
          .then( metadata => {
            util.inspect(metadata, {showHidden:true, depth: null});
            if(metadata.common.picture) {
              Payload[i].ImageSrc = `data:${metadata.common.picture[0].format}; base64,${metadata.common.picture[0].data.toString('base64')}`;
            } else {
              Payload[i].ImageSrc = 'http://localhost:8080/data/logo.png'
            }
          });

          this.state.MainData.AllSongs.push(Payload[i])
        }
      }

      context.dispatch('UpdateChanges');
    },

    AddNewSongs: function(context, payload) {
      context.dispatch('AddPayload', payload);
    },

    AddToPlaylist: function(context, Payload) {
      this.state.MainData.AllSongs.forEach(Song => {
        if(Song.Id === Payload.Id) {
          const ThisSong = {
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
            this.state.MainData.AllPlaylists.forEach(Playlist => {
              if(Playlist.Name === Payload.Playlists[i]) {
                ThisSong.Id = Playlist.ContentOfPlaylist.length + 1
                Playlist.ContentOfPlaylist.push(ThisSong)
              }
            })
          }
        } 
      })

      context.dispatch('UpdateChanges');
    },

    AddNewPlaylist: function (context, NewPlaylist) {
      var CreatePlaylist = {
        Name: NewPlaylist,
        ContentOfPlaylist: []
      }

      this.state.MainData.AllPlaylists.push(CreatePlaylist)
      context.dispatch('UpdateChanges');
    }
  },
  
  modules: {
    //  
  },
})