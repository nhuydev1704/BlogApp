

export const checkImage = (file: File) => {
    const types = ['image/png', 'image/jpeg']
    let err = ''
    if (!file) return err = "Tập tin không tồn tại."

    if (file.size > 1024 * 1024)
        err = "Kích cỡ vượt quá 1mb."

    if(!types.includes(file.type))
        err = "Ảnh không đúng định dạnh png / jpg."

    return err;
}

export const imageUpload = async (file: File) => {
    const formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", "jeeadokf")
    formData.append("cloud_name", "hunre")

    const res = await fetch("https://api.cloudinary.com/v1_1/hunre/upload", {
        method: "POST",
        body: formData,
    })

    const data = await res.json()
    return { public_id: data.public_id, url: data.secure_url };
}