
import React, { useState, useEffect } from 'react';
import ErrorView from '../components/ErrorView';
import { getAPI } from '../components/Utilities'
import parse from 'html-react-parser';
//import DOMPurify from 'dompurify';
const Help = () => {

    const [helpInfo, setHelpInfo] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        getHelpInfo()
    }, []);

    const getHelpInfo = () => getAPI("operations/help").then((res) => {
        console.log("getHelpInfo res", res)
        if(res.name == "AxiosError") {
            console.log("AxiosError")
            if(res.code == "ERR_NETWORK")
                setError("Server is down");
            else if(res.code == "ERR_BAD_REQUEST")
                setError(res.message + "\r\n" + res.response.data.Message);
        } else if(res.status == 500)
            setError(res.error);
        else {
            setHelpInfo(res.data)
        }
    })

    const safeComponent = (html) => {
        const htmlString = '<p>This is <strong>parsed</strong> as React!</p>';
      
        return (
          <div>
            {html && parse(html)}
          </div>
        );
    }

    return (
        <>
            {safeComponent(helpInfo)}
            {/* {error && <b>ERROR: </b>} {error} */}
            <ErrorView error={error} />
        </>
    )
}

export default Help;