const cron = require('cron')
const https = require('https')

const backendurl= 'https://blogger-backend-n0va.onrender.com/restart'
const job = new cron.CronJob('* * * * *', ()=>{
    console.log("Restarting server");

    https.
        get(backendurl, (res)=>{
            if(res.statusCode==200){
                console.log("Server restarted");
            }else{
                console.error("Failed to restart server");
            }
        })
        .on('error',(error)=>{
            console.log("Error during restart",error.message);
        })
})

module.exports={job:job}