"use client"

import { useState, useRef, useEffect } from "react"
import "./VirtualTryOn.css"

const VirtualTryOn = () => {
  const [activeTab, setActiveTab] = useState("camera")
  const [cameraActive, setCameraActive] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Sample jewelry products
  const products = [
    {
      id: 1,
      name: "Diamond Stud Earrings",
      category: "Earrings",
      price: 749.99,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tryOnImage:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: "ears",
    },
    {
      id: 2,
      name: "Gold Pendant Necklace",
      category: "Necklaces",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tryOnImage:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: "neck",
    },
    {
      id: 3,
      name: "Elegant Diamond Ring",
      category: "Rings",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tryOnImage:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: "hand",
    },
    {
      id: 4,
      name: "Pearl Tennis Bracelet",
      category: "Bracelets",
      price: 599.99,
      image:
        "https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tryOnImage:
        "https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: "wrist",
    },
  ]

  useEffect(() => {
    // Set the first product as selected by default
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0])
    }

    // Clean up camera on unmount
    return () => {
      if (cameraActive) {
        stopCamera()
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Could not access camera. Please check permissions and try again.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)

    if (tab === "camera" && !cameraActive) {
      startCamera()
    } else if (tab === "upload") {
      stopCamera()
    }
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    // Reset position when changing products
    setPosition({ x: 0, y: 0 })
    setScale(1)
    setRotation(0)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleScaleChange = (e) => {
    setScale(Number.parseFloat(e.target.value))
  }

  const handleRotationChange = (e) => {
    setRotation(Number.parseInt(e.target.value))
  }

  const handleCapture = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      // Set canvas dimensions
      canvas.width = 1280
      canvas.height = 720

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height)

      // Draw video or uploaded image
      if (activeTab === "camera" && videoRef.current) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
      } else if (activeTab === "upload" && uploadedImage) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height)

          // Draw jewelry
          if (selectedProduct) {
            const jewelryImg = new Image()
            jewelryImg.crossOrigin = "anonymous"
            jewelryImg.onload = () => {
              // Apply transformations
              context.save()
              context.translate(
                position.x + (jewelryImg.width * scale) / 2,
                position.y + (jewelryImg.height * scale) / 2,
              )
              context.rotate((rotation * Math.PI) / 180)
              context.drawImage(
                jewelryImg,
                (-jewelryImg.width * scale) / 2,
                (-jewelryImg.height * scale) / 2,
                jewelryImg.width * scale,
                jewelryImg.height * scale,
              )
              context.restore()

              // Create download link
              const dataUrl = canvas.toDataURL("image/png")
              const link = document.createElement("a")
              link.href = dataUrl
              link.download = `virtual-try-on-${selectedProduct.name.replace(/\s+/g, "-").toLowerCase()}.png`
              link.click()
            }
            jewelryImg.src = selectedProduct.tryOnImage
          }
        }
        img.src = uploadedImage
      }
    }
  }

  return (
    <div className="virtual-try-on">
      <h1 className="try-on-title">Virtual Jewelry Try-On</h1>

      <div className="try-on-container">
        <div className="try-on-sidebar">
          <h2>Select Jewelry</h2>
          <div className="product-list">
            {products.map((product) => (
              <div
                key={product.id}
                className={`product-item ${selectedProduct && selectedProduct.id === product.id ? "active" : ""}`}
                onClick={() => handleProductSelect(product)}
              >
                <div className="product-item-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                </div>
                <div className="product-item-info">
                  <h3>{product.name}</h3>
                  <p className="product-item-category">{product.category}</p>
                  <p className="product-item-price">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="try-on-controls">
            <h2>Adjust Position</h2>

            <div className="control-group">
              <label>Scale:</label>
              <input type="range" min="0.5" max="2" step="0.1" value={scale} onChange={handleScaleChange} />
              <span>{scale.toFixed(1)}x</span>
            </div>

            <div className="control-group">
              <label>Rotation:</label>
              <input type="range" min="-180" max="180" step="5" value={rotation} onChange={handleRotationChange} />
              <span>{rotation}°</span>
            </div>

            <button className="capture-btn" onClick={handleCapture}>
              <i className="fas fa-camera"></i> Capture & Save
            </button>

            <button className="add-to-cart-btn">
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>

        <div className="try-on-main">
          <div className="try-on-tabs">
            <button
              className={`tab-btn ${activeTab === "camera" ? "active" : ""}`}
              onClick={() => handleTabChange("camera")}
            >
              <i className="fas fa-video"></i> Live Camera
            </button>
            <button
              className={`tab-btn ${activeTab === "upload" ? "active" : ""}`}
              onClick={() => handleTabChange("upload")}
            >
              <i className="fas fa-upload"></i> Upload Photo
            </button>
          </div>

          <div className="try-on-view">
            {activeTab === "camera" ? (
              <div className="camera-view">
                <video ref={videoRef} autoPlay playsInline muted />
                {cameraActive && selectedProduct && (
                  <div
                    className="jewelry-overlay"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
                      cursor: isDragging ? "grabbing" : "grab",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <img src={selectedProduct.tryOnImage || "/placeholder.svg"} alt={selectedProduct.name} />
                  </div>
                )}
              </div>
            ) : (
              <div className="upload-view">
                {uploadedImage ? (
                  <div className="uploaded-image-container">
                    <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="uploaded-image" />
                    {selectedProduct && (
                      <div
                        className="jewelry-overlay"
                        style={{
                          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
                          cursor: isDragging ? "grabbing" : "grab",
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                      >
                        <img src={selectedProduct.tryOnImage || "/placeholder.svg"} alt={selectedProduct.name} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Upload a photo to try on jewelry</p>
                    <label className="upload-btn">
                      <input type="file" accept="image/*" onChange={handleImageUpload} />
                      Choose Photo
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          <canvas ref={canvasRef} style={{ display: "none" }} />

          <div className="try-on-instructions">
            <h3>How to Use Virtual Try-On</h3>
            <ol>
              <li>Select a jewelry piece from the sidebar</li>
              <li>Use live camera or upload a photo</li>
              <li>Drag the jewelry to position it correctly</li>
              <li>Adjust the size and rotation using the controls</li>
              <li>Capture and save your image or add to cart</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VirtualTryOn

