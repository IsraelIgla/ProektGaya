import React, { useState, useEffect } from 'react';

const ErrorView = ({ error }) => {
    console.log("error", error)
    if(!error) return ""
    return <>{error && <div><b>ERROR: </b>{error.split("\r\n")
        .map(item => <p style={{margin: 0}}>{item}</p>)}</div>}</>
}

export default ErrorView;