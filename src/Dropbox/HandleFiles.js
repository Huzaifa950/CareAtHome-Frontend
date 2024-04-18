
const accessToken = 'sl.BzmiAQDwyQCu0x4Xzp1Oin_2K2iJbTlbaXME4ofA7nIFcjcXbekGnBwSEyXh2VoFffGhTtlyrZ8XKVUI8Solj8S2eclc5GpjyCfKUYDIqdFBbBpJ4YJBXO5l8kN60dbvoHF0P6Z2x6-p7yQ';

async function uploadFilesToDropbox(files) {
    const uploadedFiles = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadedFile = await uploadSingleFileToDropbox(file);
        uploadedFiles.push(uploadedFile);
    }

    return uploadedFiles;
}

async function uploadSingleFileToDropbox(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                path: '/' + file.name + " - " + Date.now(),
            })
        },
        body: formData
    });

    const data = await response.json();
    return data.path_display;
}

async function getSingleFileFromDropbox(filePath) {
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Dropbox-API-Arg': JSON.stringify({ path: filePath }),
        },
    });

    if (response.ok) {
        const blob = await response.blob();
        const arrayBuffer = await new Response(blob).arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const fileBlob = new Blob([uint8Array]);
        const file = new File([fileBlob], filePath.split('/').pop());

        return file
    } else {
        throw new Error('Error retrieving file from Dropbox: ' + response.statusText);
    }
}


export { uploadFilesToDropbox, uploadSingleFileToDropbox, getSingleFileFromDropbox };
