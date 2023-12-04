import axios from "axios";

const UploadImg = async (formData: FormData): Promise<string> => {
  try {
    const uploadImage = async () => {
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY}/image/upload`,
          formData
        );
        console.log(response.data, "datatatattatat");
        return response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Propagate the error if needed
      }
    };

    // Usage
    const fileUrl = await uploadImage();
    return fileUrl;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Propagate the error if needed
  }
};

export default UploadImg;
