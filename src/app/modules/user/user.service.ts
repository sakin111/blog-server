
import { Prisma } from "@prisma/client";
import { prisma } from "../../../config/db";





export const getMeService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {email: userId }, 
  });

  if (!user) return { data: null };

  const { password, ...userInfo } = user;
  return { data: userInfo };
};





export const about = async (email: string) => {
  const profile = await prisma.profile.findFirst({
    where: { user: { email } }, 
  });

  console.log(profile, "this is profile all");

  if (!profile) return { data: null };
  return { data: profile };
};





interface UpdateProfileInput {
  name?: string;
  bio?: string;
  profileUrl?: string;
  location?: string;
  skills?: string[];
  experience?: Prisma.JsonValue;
  socialLinks?: Prisma.JsonValue;
}

export const UpdateMe = async (email: string, payload: UpdateProfileInput) => {

  const profile = await prisma.profile.findUnique({
    where: { email },
  });

  if (!profile) return { data: null };

const data: any = {};

if (payload.name!== undefined) data.name = payload.name;
if (payload.bio !== undefined) data.bio = payload.bio;
if (payload.location !== undefined) data.location = payload.location;
if (payload.skills !== undefined) data.skills = payload.skills;
data.experience = payload.experience ?? Prisma.JsonNull;
data.socialLinks = payload.socialLinks ?? Prisma.JsonNull;


  const updatedProfile = await prisma.profile.update({
    where: { email },
    data
  });

  return { data: updatedProfile };
};










export const UserService = {
   getMeService,
   about,
   UpdateMe
}