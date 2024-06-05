import axios from "axios";

export const getAccountPatients = async (accountKey) => {
    console.log("Account Key from API", accountKey)
    const url = `https://pksolsfms.ottomatic.cloud/fmi/odata/v4/Legacy/ACJ?$filter="__ACT" eq '${accountKey}'&$expand=PAT&$top=10`
    const config = {
        headers:{
            Authorization: 'Basic' + btoa('DataAPI:1234'),
            "Access-Control-Allow-Origin": "*"
        },
        withCredentials: false
    }

    try{
        const response = await axios.get(url, config)
        return response.data.value
    }
    catch(error){
        console.log("Originating From getAccountPatients",error)
    }

}