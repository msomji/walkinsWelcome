import React, { useEffect, useState } from "react";
import { connect, createLocalVideoTrack, createLocalTracks } from "twilio-video";


const VideoCall: React.FC = () => {

    const connector = (token: string) => {
        createLocalTracks({
            audio: true,
            video: { width: 640 }
        }).then(localTracks => {
            return connect(token, {
                name: 'my-room-name',
                tracks: localTracks
            });
        }).then(room => {
            console.log(`Connected to Room: ${room.name}`);
            createLocalVideoTrack().then(track => {
                const localMediaContainer: any = document.getElementById('local-media');
                localMediaContainer.appendChild(track.attach());
            });
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

                const localParticipant = room.localParticipant;
                console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);

                // Log any Participants already connected to the Room
                room.participants.forEach(participant => {
                    console.log(`Participant "${participant.identity}" is connected to the Room`);
                });

                // Log new Participants as they connect to the Room
                room.once('participantConnected', participant => {
                    console.log(`Participant "${participant.identity}" has connected to the Room`);
                });

                // Log Participants as they disconnect from the Room
                room.once('participantDisconnected', participant => {
                    console.log(`Participant "${participant.identity}" has disconnected from the Room`);
                });
            });
        });
    }
    const [token, setToken] = useState('');

    const handleChange = (key: string) => (event: any) => {
        console.log(event.target.value)
        setToken(event.target.value)
  
      }

    const onCreate = (e:any) => {
        e.preventDefault();
        connector(token);
    }


    return (
        <div className="videoCall">
            <form onSubmit={onCreate}>
            <label htmlFor="token">token</label>
                <input value={token} onChange={handleChange("description")} type="text" id="description" name="description"/>
                
            </form>
            <div id="local-media"></div>
            <div id="remote-media-div"></div>
        </div>
    )
}


export default VideoCall;