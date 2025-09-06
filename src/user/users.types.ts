export interface IUser {
    fullname: string;
    email: string;
    password: string;
    role: "employer" | "job-seeker" | "agent"
}