import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,VideoTrack,
  useTracks,
  RoomAudioRenderer,
  ControlBar,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Video = (id:any) => {
  const { users } = useSelector((state: any) => state.user);
  console.log(users, "usuususus",id.id);
  const url = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  // TODO: get user input for room and name
  const room = "quickstart-room";
  const name = "65242a848a13c6b0501a30b0";
  const videoss = room;
  const [token, setToken] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(
          `/api/chat/video?room=${room}&username=${id.id}`
        );
        setToken(resp.data.token);
        console.log(resp, "respresp");
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}
  function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
      [
        //@ts-ignore
        // { source: Track.Source.Camera, withPlaceholder: true },
        //@ts-ignore
        // { source: Track.Source.ScreenShare, withPlaceholder: false },
      ],
      { onlySubscribed: false }
    );
    return (
      <>
        <GridLayout
          tracks={tracks}
          style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
        >
          <ParticipantTile />
        </GridLayout>
        {/* <LiveKitRoom serverUrl={url} connect={true} token={token}> */}
          {/* <VideoConference /> */}
          {/**@ts-ignore */}
          {/* <VideoTrack trackRef={tracks} /> */}
        {/* </LiveKitRoom> */}
      </>
    );
  }

export default Video;
