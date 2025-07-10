# File Upload Integration Guide

The `ChatInput` component now supports custom file upload handlers, allowing you to integrate with any storage solution or backend API. This guide explains how to implement your own upload handlers.

## Quick Start

```tsx
import { ChatInput, type FileUploadHandlers } from 'agentic-ui'

const uploadHandlers: FileUploadHandlers = {
  onUpload: async (file: File) => {
    // Your upload logic here
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    
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
        url: data.url,
      }
    }
  },
  
  onRemove: async (fileId: string) => {
    const response = await fetch(`/api/files/${fileId}`, {
      method: 'DELETE'
    })
    
    return { success: response.ok }
  }
}

function MyComponent() {
  return (
    <ChatInput
      onSendMessage={(message, files) => {
        // Handle message with uploaded files
        console.log('Files:', files) // Files contain URLs ready for use
      }}
      showAttachment={true}
      fileUploadHandlers={uploadHandlers}
    />
  )
}
```

## Type Definitions

### FileUploadHandlers

```tsx
interface FileUploadHandlers {
  onUpload?: (file: File) => Promise<FileUploadResult>
  onRemove?: (fileId: string) => Promise<{ success: boolean; error?: string }>
  onProgress?: (fileId: string, progress: FileUploadProgress) => void
}
```

### FileUploadResult

```tsx
interface FileUploadResult {
  success: boolean
  file?: UploadedFile
  error?: string
}
```

### UploadedFile

```tsx
interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  isImage?: boolean
  uploadedAt: string
  url?: string
}
```

### FileUploadProgress

```tsx
interface FileUploadProgress {
  progress: number
  isUploading: boolean
  error?: string
}
```

## Implementation Examples

### AWS S3 Integration

```tsx
const s3UploadHandlers: FileUploadHandlers = {
  onUpload: async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload/s3', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) throw new Error('Upload failed')
      
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
      
      return { success: response.ok }
    } catch (error) {
      return {
        success: false,
        error: 'Delete failed'
      }
    }
  }
}
```

### Google Drive Integration

```tsx
const driveUploadHandlers: FileUploadHandlers = {
  onUpload: async (file: File) => {
    try {
      // Convert to base64
      const base64 = await fileToBase64(file)
      
      const response = await fetch('/api/upload/drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: file.name,
          mimeType: file.type,
          data: base64
        })
      })
      
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
        error: 'Google Drive upload failed'
      }
    }
  }
}
```

### Database + Local Storage

```tsx
const databaseUploadHandlers: FileUploadHandlers = {
  onUpload: async (file: File) => {
    try {
      const fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
      }
      
      const response = await fetch('/api/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fileData)
      })
      
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
        error: 'Database upload failed'
      }
    }
  }
}
```

## Backend API Examples

### Express.js with AWS S3

```javascript
const AWS = require('aws-sdk')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

app.post('/api/upload/s3', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    }
    
    const result = await s3.upload(s3Params).promise()
    
    // Save metadata to database
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

app.delete('/api/files/:id', async (req, res) => {
  try {
    const file = await db.files.findById(req.params.id)
    
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
```

### Next.js API Routes

```typescript
// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { uploadToS3 } from '../../lib/aws'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const form = formidable()
  const [fields, files] = await form.parse(req)
  
  const file = files.file?.[0]
  if (!file) {
    return res.status(400).json({ error: 'No file provided' })
  }

  try {
    const result = await uploadToS3(file)
    
    res.json({
      id: result.id,
      url: result.url,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

## Error Handling

The upload handlers should always return a consistent response format:

```tsx
// Success response
{
  success: true,
  file: {
    id: 'unique-file-id',
    name: 'filename.pdf',
    size: 1024,
    type: 'application/pdf',
    isImage: false,
    uploadedAt: '2023-01-01T00:00:00.000Z',
    url: 'https://example.com/files/filename.pdf'
  }
}

// Error response
{
  success: false,
  error: 'Detailed error message'
}
```

## Configuration Options

When using custom upload handlers, you can still configure the component:

```tsx
<ChatInput
  fileUploadHandlers={uploadHandlers}
  maxFiles={5}                    // Maximum number of files
  maxFileSize={50 * 1024 * 1024} // 50MB limit
  allowedFileTypes={[             // Allowed MIME types
    'application/pdf',
    'image/jpeg',
    'image/png',
    'text/plain'
  ]}
  attachmentAccept=".pdf,.jpg,.png,.txt"
  showAttachment={true}
/>
```

## Fallback Behavior

If no `fileUploadHandlers` are provided, the component will use the default mock implementation for development/testing purposes. This allows you to:

1. **Develop the UI** without implementing upload handlers
2. **Test the component** with simulated uploads
3. **Gradually integrate** your storage solution

## Best Practices

1. **Always handle errors** in your upload handlers
2. **Validate file types** and sizes on the backend
3. **Use unique file identifiers** to avoid conflicts
4. **Implement proper authentication** in your API routes
5. **Consider file optimization** (compression, resizing) for images
6. **Provide progress feedback** for large file uploads
7. **Clean up failed uploads** from your storage

## Security Considerations

- Validate file types on both client and server
- Implement file size limits
- Scan uploaded files for malware
- Use signed URLs for private file access
- Implement proper authentication and authorization
- Consider rate limiting for upload endpoints

This integration approach gives you complete control over where and how files are stored while maintaining a consistent user experience.