/**
 * Utility function to handle file uploads
 * @param {File[]} files - Array of files to upload
 * @returns {Promise<string[]>} - Array of uploaded file URLs
 */
export const uploadFiles = async (files) => {
    // In a real application, you would use FormData to upload files to your server
    // This is a simulation of that process
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Simulate successful upload with generated URLs
          const uploadedUrls = files.map((file, index) => {
            // Generate a unique filename based on timestamp and original name
            const timestamp = Date.now()
            const fileName = file.name.replace(/\s+/g, "-").toLowerCase()
            return `https://example.com/uploads/${timestamp}-${index}-${fileName}`
          })
  
          console.log("Files uploaded successfully:", uploadedUrls)
          resolve(uploadedUrls)
        } catch (error) {
          console.error("Error uploading files:", error)
          reject(error)
        }
      }, 1500) // Simulate network delay
    })
  }
  
  /**
   * Creates object URLs for file previews
   * @param {File[]} files - Array of files to preview
   * @returns {string[]} - Array of object URLs
   */
  export const createFilePreviews = (files) => {
    return files.map((file) => URL.createObjectURL(file))
  }
  
  /**
   * Revokes object URLs to prevent memory leaks
   * @param {string[]} urls - Array of object URLs to revoke
   */
  export const revokeFilePreviews = (urls) => {
    urls.forEach((url) => URL.revokeObjectURL(url))
  }
  
  