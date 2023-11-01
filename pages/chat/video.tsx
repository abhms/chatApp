import '@livekit/components-styles';
import {
    LiveKitRoom,
    VideoConference,
    GridLayout,
    ParticipantTile,
} from '@livekit/components-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Video = () => {
  const { users } = useSelector((state: any) => state.user);
console.log(users,"usuususus");
    // TODO: get user input for room and name
    const room = "quickstart-room";
    const name = "quickstart-user";
    const videoss=room
    const [token, setToken] = useState("");
    useEffect(() => {
        (async () => {
          try {
            const resp = await axios.get(
              `/api/chat/video?room=${room}&username=${users.firstname}`
            );
           console.log(resp,"respresp");
          } catch (e) {
            console.error(e);
          }
        })();
      }, []);
      return(
        <>
        </>
      )
}
export default Video;
