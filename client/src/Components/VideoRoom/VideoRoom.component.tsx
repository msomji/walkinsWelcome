import React from 'react';
import Footer from '../Footer/Footer';
import VideoCall from '../VideoCall/VideoCall.component';
import { useLocation } from 'react-router';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  


const VideoRoom: React.FC = () => {
    let query = useQuery();
    return (
        <>
        <VideoCall token={query.get('token') || ''}/>
        <Footer />
        </>
    )
}

export default VideoRoom;