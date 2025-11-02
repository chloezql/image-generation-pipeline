# API Integration Approach

## Overview

This document describes the API integration strategy and design decisions for the image generation pipeline.

## Architecture Pattern

### 1. Service Layer Pattern

Each external API is abstracted behind a service layer:

```
Controllers → Services → External APIs
```

**Benefits**:
- Easy to swap mock services with real APIs
- Centralized error handling
- Consistent interface across services
- Testable and maintainable

### 2. Mock Services

Mock services simulate real API behavior with:
- Realistic network delays
- Random failures
- Retry logic
- Proper response formats

## Image Search Service

### Design

Located in: `backend/services/imageSearchService.js`

**Features**:
- Searches for reference images based on text prompt
- Returns 30 images with style metadata
- Simulates 0.8-2 second delays
- 10% failure rate

### Integration Strategy

```javascript
const searchImages = async (prompt) => {
  // 1. Simulate network delay
  await randomDelay(DELAY_MIN, DELAY_MAX);
  
  // 2. Simulate occasional failures
  if (shouldFail()) {
    throw new Error('API temporarily unavailable');
  }
  
  // 3. Return mock results
  return generateMockImages(30);
};
```

### Error Handling

- Throws errors that are caught by controller
- No retry logic (assumed to be called once per job)
- Failures result in job failure (no partial results)

## AI Generation Service

### Design

Located in: `backend/services/aiGenerationService.js`

**Features**:
- Generates images from prompts
- Processes in batches of 5 concurrently
- Simulates 1.5-3.5 second delays per image
- 15% failure rate with retry logic

### Integration Strategy

```javascript
const generateImagesBatch = async (prompts) => {
  const batchSize = 5;
  const results = [];
  
  // Process in batches
  for (let i = 0; i < prompts.length; i += batchSize) {
    const batch = prompts.slice(i, i + batchSize);
    
    // Concurrent generation within batch
    const batchPromises = batch.map(prompt => 
      generateImage(prompt.text, prompt.options)
    );
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  
  return results;
};
```

### Retry Logic

```javascript
const generateImage = async (prompt, options) => {
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    attempts++;
    if (shouldFail()) {
      if (attempts >= MAX_RETRIES) {
        throw new Error('Failed after retries');
      }
      await randomDelay(500, 1000); // Wait before retry
      continue;
    }
    break;
  }
  // ... return success
};
```

### Error Handling

- Individual image failures don't stop the batch
- Failed images return error objects instead of throwing
- Partial results are acceptable
- Job continues with successful generations

## Concurrent Processing

### Strategy

Process 30 images with controlled concurrency:

1. **Batch Processing**: Groups of 5 images at a time
2. **Promise.all()**: Concurrent execution within batch
3. **Sequential Batches**: Waits for batch completion before next

**Why this approach?**
- Prevents overwhelming the API
- Provides progress feedback
- Balances speed and stability
- Easier to debug and monitor

### Implementation

```javascript
// Process in batches
for (let i = 0; i < prompts.length; i += batchSize) {
  const batch = prompts.slice(i, i + batchSize);
  
  const batchPromises = batch.map(prompt => 
    generateImage(prompt.text, prompt.options)
      .catch(error => ({ error: error.message }))
  );
  
  const batchResults = await Promise.all(batchPromises);
  results.push(...batchResults);
}
```

## Status Tracking

### Job States

1. `initializing` - Job created
2. `searching` - Fetching reference images
3. `constructing_prompts` - Building AI prompts
4. `generating` - Generating images (includes progress)
5. `completed` - All images generated
6. `failed` - Error occurred

### Progress Tracking

```javascript
const updateJob = (jobId, updates) => {
  const job = jobs.get(jobId);
  if (job) {
    Object.assign(job, updates);
    job.updatedAt = new Date().toISOString();
  }
  return job;
};
```

### Real-time Updates

- Backend updates job status as pipeline progresses
- Frontend polls `/api/status/:jobId` every 2 seconds
- Progress bar reflects `job.progress` (0-100)

## Error Boundaries

### Levels of Error Handling

1. **Service Level**: Individual API calls catch and handle errors
2. **Controller Level**: Overall job failure if critical step fails
3. **Frontend Level**: Display error messages to user

### Failure Modes

#### Partial Failures
- Some images fail to generate
- Job continues with successful images
- User sees both success and failure counts

#### Complete Failures
- Image search fails → Job fails
- No reference images → Job fails
- All generations fail → Job fails with errors

### Error Responses

```javascript
// Successful image
{
  generated_image_url: "https://...",
  status: "completed",
  ...
}

// Failed image
{
  error: "API failed after multiple attempts",
  status: "failed",
  ...
}
```

## Rate Limiting Simulation

### Mock Implementation

Mock services simulate rate limiting with:
- Delays to represent network latency
- Random failures to represent quota issues
- Retry logic for transient errors

### Production Considerations

For real APIs:
- Implement exponential backoff
- Use rate limit headers
- Queue jobs when rate limit hit
- Implement API key rotation

## Testing Strategy

### Unit Tests

Test individual services:
```javascript
describe('imageSearchService', () => {
  it('should return 30 images', async () => {
    const images = await searchImages('test prompt');
    expect(images).toHaveLength(30);
  });
});
```

### Integration Tests

Test full pipeline:
```javascript
describe('pipeline', () => {
  it('should process complete job', async () => {
    const jobId = await processGeneration(input);
    const status = await getStatus(jobId);
    expect(status.status).toBe('completed');
  });
});
```

### Error Injection

Test error handling:
```javascript
// Force failures
jest.spyOn(imageSearchService, 'searchImages')
  .mockRejectedValue(new Error('API error'));
```

## Production Readiness

### To Deploy with Real APIs:

1. **Replace mock services** with real API clients
2. **Add authentication**: API keys, OAuth, etc.
3. **Add monitoring**: Logging, metrics, alerts
4. **Add caching**: Redis for job status
5. **Add queue**: Bull or similar for job management
6. **Add scaling**: Multiple workers, load balancer

### Example Integration

```javascript
// Real API integration
const axios = require('axios');

const searchImages = async (prompt) => {
  const response = await axios.get('https://api.example.com/search', {
    params: { q: prompt },
    headers: { 'X-API-Key': process.env.SEARCH_API_KEY }
  });
  return response.data.images;
};
```

## Metrics & Monitoring

### Key Metrics

- Request latency
- Success/failure rates
- Concurrent job counts
- API quota usage
- Error rates by type

### Suggested Monitoring

- Application logs (Winston, Pino)
- Metrics (Prometheus)
- Distributed tracing (OpenTelemetry)
- Alerting (PagerDuty, etc.)
