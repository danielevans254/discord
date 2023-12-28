import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
// TODO: Add invite code to server, not working it doesn't redirect to the server upon pasting the invite code

export async function PATCH(
  _req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const inviteCode = nanoid(15);
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}