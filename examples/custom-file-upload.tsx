import React, { useState } from 'react'
import { ChatInput } from '../src/components/conversation/ChatInput'
import type { FileUploadHandlers, UploadedFile } from '../src/components/conversation/ChatInput'

// Example: Custom upload handlers for different storage solutions
export function CustomFileUploadExample() {
  const [message, setMessage] = useState('')

  // Example 1: AWS S3 Upload Handler
  const s3UploadHandlers: FileUploadHandlers = {
    onUpload: async (file: File) => {
      try {
        // Create form data for multipart upload
        const formData = new FormData()
        formData.append('file', file)
        
        // Upload to your backend API
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          throw new Error('Upload failed')
        }
        
        const data = await response.json()
        
        // Return the uploaded file info
        return {
          success: true,
          file: {
            id: data.id,
            name: file.name,
            size: file.size,
            type: file.type,
            isImage: file.type.startsWith('image/'),
            uploadedAt: new Date().toISOString(),
            url: data.url, // S3 URL
          }
        }
      } catch (error) {
        return {
          success: false,
          error: error.message || 'Upload failed'
        }
      }
    },
    
    onRemove: async (fileId: string) => {
      try {
        const response = await fetch(`/api/files/${fileId}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error('Delete failed')
        }
        
        return { success: true }
      } catch (error) {
        return {
          success: false,
          error: error.message || 'Delete failed'
        }
      }
    }
  }

  // Example 2: Google Drive Upload Handler
  const driveUploadHandlers: FileUploadHandlers = {
    onUpload: async (file: File) => {
      try {
        // Convert file to base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
        
        // Upload to Google Drive API
        const response = await fetch('/api/drive/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: file.name,
            mimeType: file.type,
            data: base64
          })
        })
        
        if (!response.ok) {
          throw new Error('Drive upload failed')
        }
        
        const data = await response.json()
        
        return {
          success: true,
          file: {
            id: data.id,
            name: file.name,
            size: file.size,
            type: file.type,
            isImage: file.type.startsWith('image/'),
            uploadedAt: new Date().toISOString(),
            url: data.webViewLink,
          }
        }
      } catch (error) {
        return {
          success: false,
          error: error.message || 'Google Drive upload failed'
        }
      }
    },
    
    onRemove: async (fileId: string) => {
      try {
        const response = await fetch(`/api/drive/files/${fileId}`, {
          method: 'DELETE'
        })
        
        return { success: response.ok }
      } catch (error) {
        return {
          success: false,
          error: 'Failed to remove from Google Drive'
        }
      }
    }
  }

  // Example 3: Database + Local Storage Handler
  const databaseUploadHandlers: FileUploadHandlers = {
    onUpload: async (file: File) => {
      try {
        // Save file to local storage or cloud
        const fileData = {
          name: file.name,
          size: file.size,
          type: file.type,
          // You might store the file in your preferred storage solution
          // and save metadata to your database
        }
        
        // Save metadata to database
        const response = await fetch('/api/files', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fileData)
        })
        
        if (!response.ok) {
          throw new Error('Database save failed')
        }
        
        const savedFile = await response.json()
        
        return {
          success: true,
          file: {
            id: savedFile.id,
            name: file.name,
            size: file.size,
            type: file.type,
            isImage: file.type.startsWith('image/'),
            uploadedAt: savedFile.createdAt,
            url: savedFile.downloadUrl,
          }
        }
      } catch (error) {
        return {
          success: false,
          error: error.message || 'Database upload failed'
        }
      }
    },
    
    onRemove: async (fileId: string) => {
      try {
        // Remove from database
        const response = await fetch(`/api/files/${fileId}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error('Database delete failed')
        }
        
        return { success: true }
      } catch (error) {
        return {
          success: false,
          error: error.message || 'Database delete failed'
        }
      }
    }
  }

  const handleSendMessage = (message: string, files?: UploadedFile[]) => {
    console.log('Message:', message)
    console.log('Files:', files)
    
    // Process the message and files
    // Files now contain URLs and can be used directly
    setMessage('')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Custom File Upload Examples</h2>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">AWS S3 Integration</h3>
            <ChatInput
              onSendMessage={handleSendMessage}
              showAttachment={true}
              maxFiles={5}
              maxFileSize={50 * 1024 * 1024} // 50MB
              fileUploadHandlers={s3UploadHandlers}
              placeholder="Type your message... (uploads to S3)"
            />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Google Drive Integration</h3>
            <ChatInput
              onSendMessage={handleSendMessage}
              showAttachment={true}
              maxFiles={3}
              maxFileSize={25 * 1024 * 1024} // 25MB
              fileUploadHandlers={driveUploadHandlers}
              placeholder="Type your message... (uploads to Google Drive)"
            />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Database + Storage Integration</h3>
            <ChatInput
              onSendMessage={handleSendMessage}
              showAttachment={true}
              maxFiles={10}
              maxFileSize={10 * 1024 * 1024} // 10MB
              fileUploadHandlers={databaseUploadHandlers}
              placeholder="Type your message... (uploads to database)"
            />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Default Mock Implementation</h3>
            <ChatInput
              onSendMessage={handleSendMessage}
              showAttachment={true}
              placeholder="Type your message... (uses mock upload)"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Example backend API implementations:

/*
// Express.js API Routes

// AWS S3 Upload Route
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    }
    
    const result = await s3.upload(s3Params).promise()
    
    // Save file metadata to database
    const savedFile = await db.files.create({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      url: result.Location,
      s3Key: result.Key,
    })
    
    res.json({
      id: savedFile.id,
      url: result.Location,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// File Delete Route
app.delete('/api/files/:id', async (req, res) => {
  try {
    const file = await db.files.findById(req.params.id)
    if (!file) {
      return res.status(404).json({ error: 'File not found' })
    }
    
    // Delete from S3
    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.s3Key,
    }).promise()
    
    // Delete from database
    await db.files.delete(req.params.id)
    
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Google Drive Upload Route
app.post('/api/drive/upload', async (req, res) => {
  try {
    const { name, mimeType, data } = req.body
    
    // Convert base64 to buffer
    const buffer = Buffer.from(data.split(',')[1], 'base64')
    
    // Upload to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      },
      media: {
        mimeType,
        body: buffer,
      },
    })
    
    // Make file publicly accessible
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })
    
    // Get file info
    const file = await drive.files.get({
      fileId: response.data.id,
      fields: 'id,name,webViewLink,webContentLink',
    })
    
    res.json({
      id: file.data.id,
      webViewLink: file.data.webViewLink,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Database File Storage Route
app.post('/api/files', async (req, res) => {
  try {
    const file = await db.files.create({
      name: req.body.name,
      size: req.body.size,
      type: req.body.type,
      uploadedAt: new Date(),
      downloadUrl: `/api/files/${req.body.id}/download`,
    })
    
    res.json(file)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
*/