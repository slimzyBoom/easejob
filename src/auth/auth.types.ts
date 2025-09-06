import { Types } from "mongoose";

interface IAuthToken {
    id: Types.ObjectId,
    role: "employer" | "job-seeker" | "agent"
}

export { IAuthToken };
