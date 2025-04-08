import React, { useState, useEffect } from 'react';
import { getOperations, postAPI, putAPI, deleteAPI} from '../components/Utilities'
import ErrorView from '../components/ErrorView';
import { Plus, Pencil, Trash2 } from "lucide-react"
import ConfirmDialog from "../components/ConfirmDialog";
import UpsertOperation from "../components/UpsertOperation";

const OperationManager = () => {

    const [operation, setOperation] = useState();
    const [operations, setOperations] = useState([]);
    const [error, setError] = useState("");
    const [action, setAction] = useState("");
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        _getOperations()
    }, []);

    const _getOperations = () => {
        getOperations().then((res) => {
            if(res.error) setError(res.error)
            else {
                setOperations(res.operations)
                if(res.operations.length)
                    setOperation(res.operations[0])
                console.log("res.operations[0]", res.operations[0])
            }
        })
    }

    const handleDeleteClick = () => { 
        setShowConfirmDelete(true);
        setAction("")
    }

    const handleConfirmDelete = async () => {
        setShowConfirmDelete(false);
      await deleteAPI(`operations/delete?operationName=${operation.Name}`).then((res) => {
        if(res.error) setError(res.error)
      })

      _getOperations();
    };

    const handleCancelDelete = () => setShowConfirmDelete(false);

    const handleUpsertClick = (_action) => {
        setAction(_action)
        setShowConfirmDelete(false)
    }

    const handleConfirmUsert = async (_operation) => {
        if(action == "add") {
            await postAPI(`operations/create?operationName=${_operation.Name}&script=${_operation.Script}`)
            .then((res) => {
                if(res.error) setError(res.error)
              })
        } else if(action == "edit") {
            //Put api/Operations/Update?operationOldName=a&operationNewName=b&script=s
            await putAPI(`operations/update?operationOldName=${operation.Name}
                &operationNewName=${_operation.Name}&script=${_operation.Script}`).then((res) => {
                    if(res.error) setError(res.error)
              })
        }
        setAction("")

        _getOperations();
    }

    const handleCancelUsert = async () => {
        setAction("")
    }

    const styles = {
        input: {
            backgroundColor: 'black',
            color: 'white',
            marginRight: '10px',
            height: '30px',
            verticalAlign: 'top'
        },
        form: {
            display: "inline-block",
        },
        button: {
            height: '30px',
            marginRight: '10px',
            pointerEvents: 'auto'
        }
    }

    return (
        <>
            <div style={styles.form}>
                <button type="button" title="Add new operation" onClick={() => handleUpsertClick("add")}
                    style={{...styles.button, marginRight: '30px'}}><Plus /></button>
                <select type="text" value={operation?.Name} onChange={(e) => {
                        const selected = operations.find(op => op.Name === e.target.value);
                        setOperation(selected);
                        console.log("selected", selected)
                        setAction("")
                        setShowConfirmDelete(false)
                    }}
                    placeholder="Operation" style={styles.input}>
                        {operations.map(operation => <option key={operation.ID} 
                        value={operation.Name}>{operation.Name}</option>)}
                </select>
                <button type="button" title="Edit operation chosen in list" onClick={() => handleUpsertClick("edit")}
                    style={styles.button}><Pencil /></button>
                <button type="button" title="Delete operation chosen in list" onClick={handleDeleteClick}
                    style={styles.button}><Trash2 /></button>
                <ErrorView error={error} />
                {/* <UpsertOperation action={action} onConfirm={handleConfirmUsert} 
                    onCancel={handleCancelUsert} operation={action == "add"? null : 
                        operations.find(op => op.Name === operation)
                    } /> */}
                <UpsertOperation action={action} onConfirm={handleConfirmUsert} 
                    onCancel={handleCancelUsert} operation={action == "add"? null : operation } />
            </div>
            <ConfirmDialog
                isOpen={showConfirmDelete}
                message={`Are you sure you want to delete operation "${operation?.Name}"?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    )
}

export default OperationManager;