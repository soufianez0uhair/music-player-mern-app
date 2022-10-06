import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';
import {FAVORITES_API, TRACKS_API} from '../Api';

const initialState = {
    tracks: [],
    status: 'idle',
    error: null,
    favorites: [],
    favoritesStatus: 'idle',
    favoritesError: null,
    currentTrack: null
}

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async (term = 'joji', {rejectWithValue}) => {
    try {
        const response = await axios.get(TRACKS_API + term);
        return response.data.data;
    } catch(err) {
        throw rejectWithValue(err.message);
    }
})

export const fetchFavorites = createAsyncThunk('tracks/fetchFavorites', async (thunkApi) => {
    try {
        const response = await axios.get(FAVORITES_API, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        });

        return response.data.data.favTracks;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        return thunkApi.rejectWithValue(err.response.data.message);
    }
})

export const addFavoriteTrack = createAsyncThunk('tracks/addFavoriteTrack', async (track, {rejectWithValue}) => {
    try {
        const response = await axios.post(FAVORITES_API, track, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        });

        return response.data.data.favTrack;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        return rejectWithValue(err.response.data.message);
    }
})

export const deleteTrackFromFavorites = createAsyncThunk('tracks/deleteTrackFromFavorites', async (track, thunkApi) => {
    const {id} = track;
    try {
        const response = await axios.delete(`${FAVORITES_API}/${id}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        });

        return response.data.data.favTrack.id;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        return thunkApi.rejectWithValue(err.response.data.message);
    }
})

const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        setCurrentTrack(state, action) {
            state.currentTrack = action.payload;
        },
        deleteAllFavorites(state) {
            state.favorites = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTracks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTracks.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.tracks = action.payload.map(track => (
                    {
                        id: track.id,
                        title: track.title,
                        artist: track.artist.name,
                        cover: track.album.cover_big,
                        preview: track.preview
                    }
                ))
            })
            .addCase(fetchTracks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchFavorites.pending, (state) => {
                state.favoritesStatus = 'loading';
            })
            .addCase(fetchFavorites.fulfilled, (state,action) => {
                state.favoritesStatus = 'succeeded';
                state.favorites = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state,action) => {
                state.favoritesStatus = 'failed';
                state.favoritesError = action.payload;
            })
            .addCase(addFavoriteTrack.fulfilled, (state,action) => {
                state.favorites.unshift(action.payload);
            })
            .addCase(deleteTrackFromFavorites.fulfilled, (state, action) => {
                const filteredFavorites = state.favorites.filter(trk => trk.id !== action.payload);
                state.favorites = filteredFavorites;
            })
    }
})

export default tracksSlice.reducer;
export const selectAllTracks = state => state.tracks.tracks
export const getStatusTracks = state => state.tracks.status;
export const getErrorTracks = state => state.tracks.error;
export const getCurrentTrack = state => state.tracks.currentTrack;
export const selectAllFavorites = state => state.tracks.favorites;
export const getStatusFavorites = state => state.tracks.favoritesStatus;
export const getErrorFavorites = state => state.tracks.favoritesError;
export const selectFavoriteTrackById = (state, trackId) => state.tracks.favorites.find(trk => trk.id === trackId);
export const {setCurrentTrack, deleteAllFavorites} = tracksSlice.actions;