export const checkImage = (file: File) => {
    let err = '';

    if(!file) {
        return err = "File does not exist"
    }
    if(file.size > 1024 * 1024) {
        return err = "The largest image size is 1mb"
    }

    return err ;
}

export const ImgUploadFile = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset","owqc9zbq");
    formData.append("Cloud Name","thanhung")

    const res = await fetch('https://api.cloudinary.com/v1_1/thanhung/upload', {
        method: "POST",
        body: formData
    })

    const data = await res.json();

    return { public_id : data.public_id, url: data.secure_url };
    
}