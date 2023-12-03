// import { AccessToken } from 'livekit-server-sdk';
// import { NextApiRequest, NextApiResponse } from 'next';
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {

//     const createToken = () => {
//       // if this room doesn't exist, it'll be automatically created when the first
//       // client joins
//       const roomName = 'quickstart-room';
//       // identifier to be used for participant.
//       // it's available as LocalParticipant.identity with livekit-client SDK
//       const participantName = 'quickstart-username';

//       const at = new AccessToken('API92uK6LT74kFm', 'mySecretKey123', {
//         identity: participantName,
//       });
//       at.addGrant({ roomJoin: true, room: roomName });

//    const aaa= at.toJwt();
//    console.log(aaa,"aaaaaaaaaa");
//   }
//   createToken()
//   res.status(200).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'An internal server error occurred' });

//   }
// }


import { AccessToken } from "livekit-server-sdk";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function video(  req: NextApiRequest,
  res: NextApiResponse) {
  try {
    
    //@ts-ignore
  const {video,room,username}=req.query
    //@ts-ignore
  console.log(video[0],"aaaaaaaaaaa",video,room,"aaaaaaaaaaa",username,req.query);
  // const room = req.nextUrl.searchParams.get("room");
  // const username = req.nextUrl.searchParams.get("username");
  // if (!room) {
  //   return NextResponse.json(
  //     { error: 'Missing "room" query parameter' },
  //     { status: 400 }
  //   );
  // } else if (!username) {
  //   return NextResponse.json(
  //     { error: 'Missing "username" query parameter' },
  //     { status: 400 }
  //   );
  // }

  // const apiKey = process.env.LIVEKIT_API_KEY;
  // const apiSecret = process.env.LIVEKIT_API_SECRET;
  // const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  // if (!apiKey || !apiSecret || !wsUrl) {
  //   return NextResponse.json(
  //     { error: "Server misconfigured" },
  //     { status: 500 }
  //   );
  // }

  // const at = new AccessToken(apiKey, apiSecret, { identity: username });

  // at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

  // return NextResponse.json({ token: at.toJwt() });
  if (!room) {
    return  res.status(400).json({ error: 'room not found' });
    
  } else if (!username) {
    return res.status(400).json({ error: 'username not found' });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  if (!apiKey || !apiSecret || !wsUrl) {
    return  res.status(400).json({ error: ' found' });
  }
//@ts-ignore
  const at = new AccessToken(apiKey, apiSecret, { identity: username });
  console.log(at,"atttttttttt");
//@ts-ignore
//  const aw= at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
// const aw=at.addGrant({ roomJoin: true, room });
const aw=at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
console.log(at.toJwt(),"awwww",aw);
  return res.json({ token: at.toJwt() });
  } catch (error) {
    res.status(500).json({ error: 'An internal server error occurred' });
    
  }
}