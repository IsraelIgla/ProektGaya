import React, { useState, useEffect } from 'react';
import { getAPI, getOperations } from '../components/Utilities'
import ErrorView from '../components/ErrorView';

const Calculator = () => {

    const [field1, setField1] = useState("");
    const [field2, setField2] = useState("");
    const [operation, setOperation] = useState();
    const [operations, setOperations] = useState([]);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [showHystory, setShowHystory] = useState(false);
    const [lastHystory, setLastHystory] = useState([]);
    const [hystoryCount, setHystoryCount] = useState(0);

    useEffect(() => {
        getOperations().then((res) => {
            if(res.error) setError(res.error)
            else {
                setOperations(res.operations)
                //console.log("getOperations res", res)
                if(res.operations.length)
                    setOperation(res.operations[0])
            }
        })
    }, []);

    const calculate = () => getAPI(`operations/calculate?field1=${field1}&field2=${field2}
            &operationName=${operation?.Name}`).then((res) => {
                console.log("operation", operation)
        if(res.name == "AxiosError") {
            if(res.code == "ERR_BAD_REQUEST")
                setError(res.message + "\r\n" + res.response.data.Message);
        } else {
            if (res.status === 200){
                setResult(res.data)
            } else {
                console.log(res)
            }
        }
    })

    const getLastHystory = () => getAPI(`OperationsHystory/operationsLastHystory?operationName=${operation?.Name}&count=3`).then((res) => {
            console.log("operation", operation)
        if(res.name == "AxiosError") {
            if(res.code == "ERR_BAD_REQUEST")
                setError(res.message + "\r\n" + res.response.data.Message);
        } else {
            if (res.status === 200){
                console.log("getLastHystory res.data" ,res.data)
                setLastHystory(res.data)
            } else {
                console.log(res)
            }
        }
    })

    const getHystoryCount = () => getAPI(`OperationsHystory/operationsHystoryCount?operationName=${operation?.Name}`).then((res) => {
            console.log("operation", operation)
        if(res.name == "AxiosError") {
            if(res.code == "ERR_BAD_REQUEST")
                setError(res.message + "\r\n" + res.response.data.Message);
        } else {
            if (res.status === 200){
                console.log("getHystoryCount res.data", res.data)
                setHystoryCount(res.data)
                setShowHystory(true)
            } else {
                console.log(res)
            }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        calculate()
        getLastHystory()
        getHystoryCount()
      };

    const styles = {
        input: {
            backgroundColor: 'black',
            color: 'white',
            marginRight: '10px'
        },
        // button: {

        // },
        resultPanel: {
            border: '1px solid black',
            marginTop: '10px',
            padding: '3px',
            height: '50px',
            textAlign: 'left'
        },
        form: {
            display: "inline-block"
        }
    }

    const hystoryView = () => {
        return <>
            {showHystory && 
            <div style={styles.form}>
                <b>Hystory: </b>
                <table border="1">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Script</td>
                            <td>Field1</td>
                            <td>Field2</td>
                            <td>Result</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {lastHystory.map((item) => (
                        <tr key={item.ID}>
                            <td>{item.Name}</td>
                            <td>{item.Script}</td>
                            <td>{item.Field1}</td>
                            <td>{item.Field}2</td>
                            <td>{item.Result}</td>
                            <td>{item.Date}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                Total for {operation.Name}: {hystoryCount}
            </div>}
        </>
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                    <input type="text" value={field1} onChange={(e) => setField1(e.target.value)} 
                        placeholder="Field 1" style={styles.input} />
                    <select
                        value={operation?.Name || ""}
                        onChange={(e) => {
                            const selected = operations.find(op => op.Name === e.target.value);
                            setOperation(selected);
                            console.log("selected", selected)
                        }}
                        style={styles.input}
                        >
                        {operations.map(_operation => (
                            <option key={_operation.ID} value={_operation.Name}>
                            {_operation.Name}
                            </option>
                        ))}
                    </select>
                    <input type="text" value={field2} onChange={(e) => setField2(e.target.value)} 
                        placeholder="Field 2" style={styles.input} />
                    <button type="submit"><b>CALCULATE</b></button>   
                </div>
                <ErrorView error={error} />
                    {/* {error && error.split("\r\n").map(item => <p style={{margin: 0}}>{item}</p>)} */}
                <div style={styles.resultPanel}>
                    <b>RESULT: </b>{result}
                </div>
                {hystoryView()}
            </form>

        </>
    )
}

export default Calculator;
