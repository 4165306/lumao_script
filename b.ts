import axios from "axios"

(async () => {
    const r = await axios.post("http://127.0.0.1:54345/browser/open", {
        id: 'c426d5ceb253444bb16c663d30dd413f',
    })
    console.log('r', r.data)
})()