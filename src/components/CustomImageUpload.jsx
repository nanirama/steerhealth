// components/CustomImageUpload.jsx
import React, { useState, useCallback } from 'react';
import { TextInput, Button, Card, Text, Flex, Stack, Box } from '@sanity/ui';
import { UploadIcon, ImageIcon, TrashIcon } from '@sanity/icons';
import { set, unset } from 'sanity';

export const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };
const CustomImageUpload = React.forwardRef((props, ref) => {
  const { 
    elementProps, 
    onChange, 
    value = '', 
    readOnly, 
    schemaType 
  } = props;
  
  const [uploading, setUploading] = useState(false);
  const [availableImages, setAvailableImages] = useState([]);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value || '');
  const [loadingImages, setLoadingImages] = useState(false);

  // Helper function to format file sizes - DEFINED HERE


  // Add CSS for spinner animation
  React.useEffect(() => {
    const styleId = 'custom-image-upload-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Load available images from public/images/hero folder
  const loadAvailableImages = useCallback(async () => {
    setLoadingImages(true);
    try {
      const response = await fetch('/api/images/list-hero-images');
      if (response.ok) {
        const images = await response.json();
        setAvailableImages(images);
      } else {
        console.error('Failed to fetch images');
        setAvailableImages([]);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      setAvailableImages([]);
    } finally {
      setLoadingImages(false);
    }
  }, []);

  // Handle file upload
  const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file');
    return;
  }

  // Validate file size (e.g., max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    alert('File is too large. Please select a file smaller than 10MB');
    return;
  }

  setUploading(true);
  
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    
    const response = await fetch('/api/images/upload-hero', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      const result = await response.json();
      
      // Save only the filename in Sanity, not the full path
      const filename = result.filename;
      
      // Set preview URL for display (full path)
      setPreviewUrl(result.original.path);
      
      // Save only filename to Sanity
      onChange(set(filename));
      
      loadAvailableImages(); // Refresh the list
      
      // Show success message with file size info and preserved format
      const originalSizeKB = (result.original.size / 1024).toFixed(1);
      const blurSizeKB = (result.blur.size / 1024).toFixed(1);
      const reductionPercent = Math.round((1 - result.blur.size / result.original.size) * 100);
      const format = result.format.toUpperCase();
      
      alert(`${format} image uploaded successfully! 🎉
📁 Original: ${originalSizeKB}KB (${result.original.dimensions.width}×${result.original.dimensions.height})
🌫️ Blur: ${blurSizeKB}KB (same dimensions, ${format} format preserved)
💾 Blur is ${reductionPercent}% smaller
💾 Saved in Sanity: ${filename}`);
    } else {
      const errorData = await response.json();
      console.error('Upload failed:', errorData);
      alert(errorData.error || 'Upload failed. Please try again.');
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert(`Upload failed: ${error.message}`);
  } finally {
    setUploading(false);
    event.target.value = '';
  }
};

  // Handle image selection from existing images
const handleImageSelect = (imagePath) => {
  // Extract filename from path
  const filename = imagePath.split('/').pop();
  
  // Set preview URL for display (full path)
  setPreviewUrl(imagePath);
  
  // Save only filename to Sanity
  onChange(set(filename));
  
  setShowImageSelector(false);
};

  // Handle image deletion
  const handleImageDelete = async () => {
    if (!value) return;
    
    try {
      const filename = value.split('/').pop();
      const response = await fetch(`/api/images/delete-hero?filename=${filename}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setPreviewUrl('');
        onChange(unset());
        loadAvailableImages();
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed. Please try again.');
    }
  };

  // Handle manual URL input
const handleInputChange = (event) => {
  const inputValue = event.currentTarget.value;
  
  // If user enters a full path, extract just the filename
  let filename = inputValue;
  if (inputValue.includes('/')) {
    filename = inputValue.split('/').pop();
  }
  
  // Set preview URL (construct full path if just filename)
  const previewPath = filename && !filename.startsWith('/') 
    ? `/images/hero/${filename}` 
    : inputValue;
  
  setPreviewUrl(previewPath);
  
  // Save only filename to Sanity (or empty if no value)
  onChange(filename ? set(filename) : unset());
};

React.useEffect(() => {
  if (value) {
    // If value is just a filename, construct the full path for preview
    const previewPath = value.startsWith('/') 
      ? value 
      : `/images/hero/${value}`;
    setPreviewUrl(previewPath);
  } else {
    setPreviewUrl('');
  }
}, [value]);
  return (
    <Stack space={3}>
      {/* Title */}
      <Text weight="semibold" size={2}>
        {schemaType.title || 'Hero Image'}
      </Text>
      
      {schemaType.description && (
        <Text size={1} muted>
          {schemaType.description}
        </Text>
      )}

      {/* URL Input Field */}
      <TextInput
        {...elementProps}
        ref={ref}
        value={value || ''}
        onChange={handleInputChange}
        readOnly={readOnly}
        placeholder="/images/hero/your-image.jpg"
      />

      {/* Preview */}
      {previewUrl && (
        <Card padding={3} border>
          <Stack space={3}>
            <Box>
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  height: 'auto',
                  borderRadius: '4px'
                }}
              />
            </Box>
            <Flex gap={2}>
              <Button
                icon={TrashIcon}
                mode="ghost"
                tone="critical"
                text="Remove"
                onClick={handleImageDelete}
                disabled={readOnly}
              />
            </Flex>
          </Stack>
        </Card>
      )}

      {/* Upload Controls */}
      {!readOnly && (
        <Stack space={2}>
          <Flex gap={2}>
            {/* File Upload */}
            <Box flex={1}>
              <label style={{ display: 'block', width: '100%' }}>
                <Button
                  as="span"
                  icon={UploadIcon}
                  text={uploading ? "Uploading..." : "Upload New"}
                  tone="primary"
                  disabled={uploading}
                  style={{ width: '100%' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  disabled={uploading}
                />
              </label>
            </Box>

            {/* Select Existing */}
            <Box flex={1}>
              <Button
                icon={ImageIcon}
                text={loadingImages ? "Loading..." : "Select Existing"}
                onClick={() => {
                  if (!showImageSelector) {
                    loadAvailableImages();
                  }
                  setShowImageSelector(!showImageSelector);
                }}
                disabled={loadingImages}
                style={{ width: '100%' }}
              />
            </Box>
          </Flex>
        </Stack>
      )}

      {/* Image Selector */}
      {showImageSelector && (
        <Card padding={3} border>
          <Stack space={3}>
            <Text weight="semibold">Select from existing images:</Text>
            
            {loadingImages ? (
              <Card padding={4} border>
                <Flex align="center" justify="center" gap={2}>
                  <Box style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid #e1e3e4',
                    borderTop: '2px solid #0066cc',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <Text>Loading images...</Text>
                </Flex>
              </Card>
            ) : availableImages.length === 0 ? (
              <Card padding={4} tone="caution" border>
                <Flex align="center" justify="center">
                  <Text>No images found in /public/images/hero/</Text>
                </Flex>
              </Card>
            ) : (
              <Box
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
                  gap: '12px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '4px'
                }}
              >
                {availableImages.map((image, index) => (
                  <Card
                    key={`${image.filename}-${index}`}
                    padding={2}
                    radius={2}
                    tone={previewUrl === image.path ? 'primary' : 'default'}
                    border
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => handleImageSelect(image.path)}
                  >
                    <Stack space={2}>
                      {/* Image Container */}
                      <Box
                        style={{
                          position: 'relative',
                          width: '100%',
                          paddingBottom: '75%',
                          overflow: 'hidden',
                          borderRadius: '3px',
                          backgroundColor: '#f1f3f4'
                        }}
                      >
                        <img
                          src={image.path}
                          alt={image.filename}
                          loading="lazy"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '3px'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `
                              <div style="
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                color: #666;
                                text-align: center;
                                font-size: 12px;
                              ">
                                Image not found
                              </div>
                            `;
                          }}
                        />
                        
                        {/* Selected indicator */}
                        {previewUrl === image.path && (
                          <Box
                            style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              backgroundColor: '#0066cc',
                              color: 'white',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}
                          >
                            ✓
                          </Box>
                        )}
                      </Box>
                      
                      {/* Image Info */}
                      <Stack space={1}>
                        <Text 
                          size={1} 
                          weight="medium"
                          style={{
                            wordBreak: 'break-word',
                            lineHeight: '1.2',
                            maxHeight: '2.4em',
                            overflow: 'hidden',
                            textAlign: 'center'
                          }}
                        >
                          {image.filename && image.filename.length > 20 
                            ? `${image.filename.substring(0, 17)}...` 
                            : image.filename || 'Unknown'
                          }
                        </Text>
                        
                        <Text 
                          size={0} 
                          muted
                          style={{ textAlign: 'center' }}
                        >
                          {image.size ? formatFileSize(image.size) : 'Unknown size'}
                        </Text>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </Box>
            )}
            
            {/* Action buttons */}
            <Flex gap={2} justify="flex-end">
              <Button
                text="Cancel"
                mode="ghost"
                onClick={() => setShowImageSelector(false)}
              />
              {availableImages.length > 0 && (
                <Button
                  text="Refresh"
                  mode="ghost"
                  onClick={loadAvailableImages}
                />
              )}
            </Flex>
          </Stack>
        </Card>
      )}
    </Stack>
  );
});

CustomImageUpload.displayName = 'CustomImageUpload';

export default CustomImageUpload;