  
  // create the file list, so the fileName can be set
  // this is to be used to set the file input types
  // ex: input.files = new createFileList('image.png')
const createFileList = (fileName) => {
    let fileListObj = new DataTransfer();
    // if the fileName passed add that file
    if (fileName) fileListObj.items.add(new File([''], fileName))
    return fileListObj.files
  };

export default createFileList;