import axios from "axios"

(async () => {
    const r = await axios.request({
        method: "GET",
        url: "http://192.168.2.132:50325/api/v1/browser/start",
        data: {
            serial_number:57,
            launch_args: ['--host-rules="MAP * 127.0.0.1"']
        },
    })
    console.log('r', r.data)
})()