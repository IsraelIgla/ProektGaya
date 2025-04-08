import React, { useState, useEffect } from 'react';

const renderHeader = (action, operation) => {
    switch(action)
    {
        case "add": return "Add new operation";
        case "edit": return `Edit operation "${operation?.Name}"`;
    }
}

const styles = {
    panel: {
        border: '1px solid gray',
        marginTop: '10px',
        paddingBottom: '10px',
        borderRadius: '5px'
    },
    input: {
        backgroundColor: 'black',
        color: 'white',
        marginRight: '10px',
        verticalAlign: 'top'
    },
    okButton: {
        marginRight: "5px",
        marginTop: "5px"
    }
}

const UpsertOperation = ({ action, onConfirm, onCancel, operation }) => {
    console.log("UpsertOperation2", operation)

    if (!action) return null;

    const [newName, setNewName] = useState(operation?.Name || "");
    const [script, setScript] = useState(operation?.Script || "");

    useEffect(() => {
        setNewName(operation?.Name || "");
        setScript(operation?.Script || "");
    }, [action, operation]);

    return (
        <div style={styles.panel}>
            <p>{renderHeader(action, operation)}</p>
            {/* <text>Name: </text> */}
            <div>Name: <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} 
                placeholder="Operation name" style={styles.input} /></div>
            <div style={{ marginTop: "5px" }}>Script: <input type="text" value={script} onChange={(e) => setScript(e.target.value)} 
                placeholder="Operation script" style={styles.input} /></div>
            <button onClick={() => onConfirm({Name: newName, Script: script})} 
                style={styles.okButton}>Ok</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default UpsertOperation;