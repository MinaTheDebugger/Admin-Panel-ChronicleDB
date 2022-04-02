const axios = require('axios')

fetchDataJava = async () => {
    const fetch1 = await fetch('https://dbs-demo.mathematik.uni-marburg.de/native/get-streams')
    const response1 = await fetch1.json()
    this.setState({ id: response1 });
}


pingTest = async () => {
    const fetch1 = await fetch('https://dbs-demo.mathematik.uni-marburg.de/native/ping')
    const response1 = await fetch1.json()
    this.setState({ id: response1 });
}
function createStreamwithJava(streamName, schemaName, schemaType, Nullable, LightweightIndex) {
    //  console.log("its working");
    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/create-stream'
        let request = `{
            "streamName": ${streamName},
            "schema": [
              {
                "name": ${schemaName},
                "type": ${schemaType},
                "properties": {
                  "nullable": ${Nullable},
                  "index": ${LightweightIndex}
                }
              },
              {
                "name": "Y",
                "type": "DOUBLE",
                "properties": {
                  "nullable": false,
                  "index": true
                }
              }
            ]
          }`
        const response = axios.post(url, request)
        console.log("it worked", response.data)
        alert("it worked" + response.data)

    } catch (error) {
        alert(error)
    }
}
// https://dbs-demo.mathematik.uni-marburg.de/native/stream-info
function streamInfo(streamName) {
    //  console.log("its working");
    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/stream-info'
        let request = `{
        "name": ${streamName}
     }`
        const response = await axios.post(url, request)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
// https://dbs-demo.mathematik.uni-marburg.de/native/query


function query(queryString, startTime, endTime) {

    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/query'
        let request = `{
            "queryString":${queryString},
            "startTime": ${startTime},
            "endTime": ${endTime}
     }`
        const response = await axios.post(url, request)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
//{

function insertEvent(streamName, events) {

    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/insert'
        let request = `{
            "streamName": ${streamName},
            "events": ${events}
          }`
        const response = await axios.post(url, request)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

function insertEvent(queryString) {
    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/schema'
        let request = `{
            "queryString": ${queryString}
          }`
        const response = await axios.post(url, request)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
