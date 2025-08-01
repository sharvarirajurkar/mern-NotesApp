import ratelimit from "../config/upstash.js"


const rateLimiter = async (req ,res, next)=>{
    //done per user so we use userid
    try {
        const {success} = await ratelimit.limit("my-rate-limit");
        
        if(!success){
            return res.status(429).json({message:"too many requests, please try again later"})
        }

        next()

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
}

export default rateLimiter