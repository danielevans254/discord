import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// FIXME: Description
export async function POST(req: Request) {
  try {
    const { name, description, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized [SERVER POST]", { status: 401 });
    }
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        description,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
              type: "TEXT",
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },

      }
    });

    return NextResponse.json(server, { status: 200 })

  } catch {
    return new NextResponse("Internal Server Error [SERVER POST]", { status: 500 });
  }
}