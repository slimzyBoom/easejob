import { Types } from "mongoose"
export interface IAuthToken {
    id: Types.ObjectId,
    role: "employer" | "job-seeker" | "agent"
}

export interface ILoginUser {
    email: string,
    password: string
}
