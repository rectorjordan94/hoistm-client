import { useEffect, useState } from 'react'
// import { Modal } from 'react-bootstrap'
import { getAllFiles } from '../../api/files'
import { showLabel } from '../../api/labels'
import FilesIndex from '../files/FilesIndex'
import messages from './AutoDismissAlert/messages'

//////////// <----This component takes props from Home.js  
//////////// and sends props to FilesIndex---->

const FilesContainer = (props) => {
    const { user, updatedFiles, labels, msgAlert, triggerRefresh, filterOn, labelFilter} = props
    // console.log('files in filesContainer: ', files)
    // State for files & fileError
    const [files, setFiles] = useState(null)
	const [filesError, setFilesError] = useState(false)

    // console.log('filterOn  files container', filterOn)
    // console.log('labelFilterfiles container', labelFilter)
    
    useEffect(() => {
        // If there's a labelFilter on, get files from that label's document
        if (filterOn && labelFilter) {
            showLabel(user, labelFilter)
                .then(res => setFiles(res.data.label.fileRef))
                .catch(err => {
                    msgAlert({
                        heading: 'Error',
                        // ! Message needed 
                        message: messages.getFilesFromLabelFailure,
                        variant: 'danger'
                    })
                    setFilesError(true)
                })
        } else { 
            // Otherwise, get files from the files collection
            getAllFiles(user)
                .then(res => setFiles(res.data.files))
                .catch(err => {
                    // msgAlert({
                    //     heading: 'Error getting files',
                    //     message: 'failed to get files',
                    //     variant: 'danger'
                    // })
                    setFilesError(true)
            })
        }
    }, [updatedFiles, labelFilter])

    return (
        <div className="container-fluid p-0">
            <FilesIndex
                user={user}
                msgAlert={msgAlert}
                files={files}
                filesError={filesError}
                labels={labels}
                triggerRefresh={triggerRefresh}
            />
        </div>
    )
}

export default FilesContainer