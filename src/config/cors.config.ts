    const whitelist = ["http://localhost:3000", "http://localhost:5173"]

type Callback = (error : Error | null, allow?: boolean ) => void;
interface corsOption  {
    options: (option : string, callback : Callback) => void,
    optionsSuccessStatus : number,
    credentials: boolean
}


const corsOptions : corsOption = {
    options: (option, callback) => {
        if(!option || whitelist.includes(option)){
            callback(null, true)
        }
        else {
            callback(Error("Blocked by CORS"))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,

}

export default corsOptions;