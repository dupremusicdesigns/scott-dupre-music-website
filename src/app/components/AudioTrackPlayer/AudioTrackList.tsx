'use client';

import { css } from '../../../../styled-system/css';
import { flex } from '../../../../styled-system/patterns';
import { AudioProvider } from '../../context/AudioContext';
import { AudioTrackPlayer } from './AudioTrackPlayer';

type AudioTrack = {
    id: number;
    trackName: string;
    audioUrl: string;
}

type AudioTrackListProps = {
    tracks: AudioTrack[];
}

export const AudioTrackList = ( { tracks }: AudioTrackListProps ) => {
    if ( tracks.length === 0 ) {
        return (
            <p
                className={
                    css( {
                        textAlign: 'center'
                        , color: 'text.secondary'
                        , padding: 'xl'
                    } )
                }
            >
                Audio previews coming soon
            </p>
        );
    }

    return (
        <AudioProvider>
            <div
                className={
                    flex( {
                        flexDirection: 'column'
                        , gap: 'md'
                    } )
                }
            >
                {
                    tracks.map( ( track, index ) => (
                        <AudioTrackPlayer
                            key={ track.id }
                            partNumber={ index + 1 }
                            trackName={ track.trackName }
                            audioUrl={ track.audioUrl }
                        />
                    ) )
                }
            </div>
        </AudioProvider>
    );
};
