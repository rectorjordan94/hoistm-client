import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ShowFileModal from './ShowFileModal'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'start'
}

const FilesIndex = (props) => {

    const { msgAlert, user, files, filesError, triggerRefresh } = props

    const [fileModalShow, setFileModalShow] = useState(false)
    const [showFile, setShowFile] = useState({})
    // const [updated, setUpdated] = useState(false)
    console.log('index files', files)
    console.log('index file', showFile)
    if (filesError) {
        return <p>Loading...</p>
    }
    // if no pets loaded yet, display 'loading'
    if (!files) {
        return <p>Loading...</p>
        // otherwise if there are no pets, display that message
    } else if (files.length === 0) {
        return <p>No files yet, go add some!</p>
	}

    const onClick = (e) => {
        console.log('e', e.target)
        console.log('file index e value', e.target.value)
        setShowFile(JSON.parse(e.target.value))
        setFileModalShow(true)
    }

    const fileCards = files.map((file, i) => {
        return (
            <>
                <Card key={i} style={{ width: '30%' }}>
                    <Card.Header>{file.name}</Card.Header>
                    <Card.Body>
                        <Image src={file.url} thumbnail/>
                        <Button type='submit' className='m-2' onClick={onClick} value={JSON.stringify(file)}>View File</Button>
                    </Card.Body>
                </Card>
            </>
        )
    })
    
    // return some jsx, a container with all the pet cards
    return (
        <>
            <div className="container-fluid" style={cardContainerStyle}>
                { fileCards }
            </div>
            <ShowFileModal
                user={user}
                file={showFile}
                show={fileModalShow}
                handleClose={() => setFileModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

// export our component
export default FilesIndex