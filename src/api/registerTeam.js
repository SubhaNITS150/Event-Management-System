import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { teamName, members } = req.body;

    // Check if team name already exists
    const existingTeam = await prisma.teams.findUnique({
      where: { team_name: teamName },
    });

    if (existingTeam) {
      return res.status(400).json({ error: "Team name already exists" });
    }

    // Create team and members together in one transaction
    const newTeam = await prisma.team.create({
      data: {
        team_name: teamName,
        team_members: {
          create: members.map((m) => ({
            user_id: m.user_id, // from Supabase
            college: m.college,
            aadhar: m.aadhar,
            role: m.role || "user",
          })),
        },
      },
      include: {
        team_members: true,
      },
    });

    return res.status(200).json({ success: true, team: newTeam });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Server error" });
  }
}
