import React, { useEffect} from "react";
import { connect, createLocalVideoTrack, createLocalTracks } from "twilio-video";
import styles from './VideoCall.module.scss';

export interface VideoCallProps {
    token: string
}

const VideoCall: React.FC<VideoCallProps> = ({ token }) => {

    const connector = (token: string) => {
        createLocalTracks({
            audio: true,
            video: { width: 350, height: 350 },
          }).then(localTracks => {
            return connect(token, {
              name: 'my-room-name',
              tracks: localTracks,
            });
          }).then(room => {
            console.log(`Successfully joined a Room: ${room}`);
            createLocalVideoTrack().then(track => {
                const localMediaContainer = document.getElementById('local-media');
                localMediaContainer!.appendChild(track.attach());
            });

            const localParticipant = room.localParticipant;
            console.log(`Connected to the Room as LocalParticipant "${localParticipant}"`);

            // Log any Participants already connected to the Room
            room.participants.forEach(participant => {
                console.log(`Participant "${participant}" is connected to the Room`);
                participant.tracks.forEach((publication: any) => {
                    if (publication.isSubscribed) {
                        const track = publication.track;
                        document.getElementById('remote-media-div')!.appendChild(track.attach());
                    }
                });

                participant.on('trackSubscribed', (track: any) => {
                    document.getElementById('remote-media-div')!.appendChild(track.attach());
                });
            });

            // Log new Participants as they connect to the Room
            room.on('participantConnected', participant => {
                console.log(`Participant "${participant.identity}" connected`);

                participant.tracks.forEach((publication: any) => {
                    if (publication.isSubscribed) {
                        const track = publication.track;
                        document.getElementById('remote-media-div')!.appendChild(track.attach());
                    }
                });

                participant.on('trackSubscribed', (track: any) => {
                    document.getElementById('remote-media-div')!.appendChild(track.attach());
                });
            });

            room.on('participantDisconnected', participant => {
                console.log(`Participant disconnected: ${participant.identity}`);
                // Detach the local media elements
                room.localParticipant.tracks.forEach(publication => {
                    const attachedElements = publication.track;
                    console.log(attachedElements);
                });
            });
        }, error => {
            console.error(`Unable to connect to Room: ${error.message}`);
        });
    }
    useEffect(() => {
        connector(token);
    }, [token])
    return (
        <div className={`${styles.videoCall}`}>
            <div className={`${styles.container}`}>
                <div className={`${styles.local}`} id="local-media"></div>
                <div className={`${styles.remote}`} id="remote-media-div"></div>
            </div>
            <button className={`${styles.button}`} type="submit">Disconnect</button>
        </div>
    )
}


export default VideoCall;