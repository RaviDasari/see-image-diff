# See Image Diff - Requirements Document

## Document Version
- **Version**: 1.0
- **Date**: November 2025
- **Status**: Draft for Review

---

## 1. Executive Summary

This document outlines the requirements for enhancing the **See Image Diff** project, an image comparison utility that generates visual diffs between baseline and current images. The project will be expanded to include a web application with REST APIs, Google authentication, and AI-powered features using OpenAI's LLM.

### Current State
The tool currently operates as a CLI (Command Line Interface) utility that:
- Compares two folders of images (baseline vs current)
- Generates diff images highlighting differences
- Creates a JSON report with comparison results
- Provides a static web viewer to navigate results

### Vision - Phase 1
Transform the tool into a full-featured web application with:
- **Backend**: Python REST APIs for image processing and management
- **Frontend**: JavaScript-based web application (no TypeScript)
- **Authentication**: Google OAuth 2.0 for user authentication
- **AI Enhancement**: OpenAI LLM integration for intelligent image analysis and insights

---

## 2. Project Overview

### 2.1 Purpose
Enable users to compare images through a web-based platform with persistent storage, user management, and AI-powered insights.

### 2.2 Core Functionality (Current)
The existing CLI tool provides:
- Image comparison using pixelmatch algorithm (via jimp library)
- Configurable threshold for difference detection (0-1 range, default 0.1)
- Diff image generation with visual highlights
- JSON report generation with comparison metadata
- Static HTML viewer with image gallery
- Support for thumbnail folders

### 2.3 Technical Stack (Current)
- **Language**: JavaScript (Node.js)
- **Image Processing**: jimp (wrapper for pixelmatch)
- **CLI Framework**: command-line-args, command-line-usage
- **Web Viewer**: React 18 with Elastic UI components
- **Build Tool**: Parcel 2
- **Testing**: Jest with image snapshot testing

---

## 3. Phase 1 Requirements

### 3.1 High-Level Goals
1. Create a web application accessible via browser
2. Implement REST API backend using Python
3. Add Google OAuth 2.0 authentication
4. Integrate OpenAI LLM for intelligent image analysis
5. Enable multi-user support with data isolation
6. Provide persistent storage for comparison history

### 3.2 Technical Architecture

#### 3.2.1 Frontend (JavaScript - No TypeScript)
- **Framework**: React 18 (existing)
- **UI Library**: Elastic UI (existing) or alternative
- **State Management**: React Context or Redux (TBD)
- **HTTP Client**: Axios or Fetch API
- **Build Tool**: Parcel 2 or Webpack
- **Authentication**: Google OAuth 2.0 client library

#### 3.2.2 Backend (Python)
- **Framework**: Flask or FastAPI (recommended: FastAPI for async support)
- **Image Processing**: Pillow (PIL) or integration with existing Node.js jimp service
- **API Standard**: RESTful APIs with JSON responses
- **Authentication**: 
  - Google OAuth 2.0 (google-auth library)
  - JWT tokens for session management
- **ORM**: SQLAlchemy (if database required)
- **File Storage**: Local filesystem or cloud storage (S3/GCS)

#### 3.2.3 AI Integration (OpenAI LLM)
- **Service**: OpenAI API (GPT-4 or GPT-3.5-turbo)
- **Use Cases**:
  - Automatic description generation for image differences
  - Categorization of changes (UI, content, layout, etc.)
  - Severity assessment of visual differences
  - Natural language query interface for comparison results
  - Automated test failure analysis

---

## 4. Functional Requirements

### 4.1 User Authentication & Authorization

#### FR-1.1: Google OAuth 2.0 Login
- Users shall authenticate using their Google account
- System shall support OAuth 2.0 flow with Google
- System shall create user profile upon first login
- System shall maintain session state using JWT tokens

#### FR-1.2: User Profile Management
- Users shall view their profile information (name, email, avatar)
- Users shall have isolated data storage (cannot see other users' comparisons)
- System shall support logout functionality

### 4.2 Image Comparison (Enhanced)

#### FR-2.1: Upload Images for Comparison
- Users shall upload baseline images via web interface
- Users shall upload current images via web interface
- System shall support PNG format (primary)
- System shall validate image file types and sizes
- System shall support batch upload (multiple files)

#### FR-2.2: Comparison Configuration
- Users shall configure comparison threshold (0-1 range)
- Users shall optionally provide comparison names/descriptions
- System shall use default threshold of 0.1 if not specified

#### FR-2.3: Execute Comparison
- System shall compare images with matching filenames
- System shall generate diff images highlighting differences
- System shall calculate difference percentage for each pair
- System shall identify missing baseline images (new tests)
- System shall identify missing current images (obsolete tests)

#### FR-2.4: Store Comparison Results
- System shall store comparison metadata in database
- System shall store images in file system or cloud storage
- System shall maintain history of all comparisons per user
- System shall support comparison versioning

### 4.3 Results Visualization

#### FR-3.1: Comparison Gallery View
- Users shall view all image comparisons in a gallery layout
- System shall display baseline, current, and diff images side-by-side
- System shall show difference percentage for each comparison
- System shall filter by status: passed, failed, new, obsolete
- System shall sort by various criteria (name, date, difference %)

#### FR-3.2: Detailed Comparison View
- Users shall click on any comparison to view detailed information
- System shall display full-size images with zoom capability
- System shall show comparison metadata (date, threshold, user)
- System shall support image navigation (next/previous)

#### FR-3.3: AI-Powered Insights
- System shall generate automatic descriptions of differences using OpenAI LLM
- System shall categorize changes (e.g., "Button color changed", "Text alignment shifted")
- System shall assess severity (minor, moderate, significant)
- Users shall query results in natural language (e.g., "Show me all failures with button changes")

### 4.4 Comparison Management

#### FR-4.1: Comparison History
- Users shall view list of all past comparisons
- System shall display comparison date, name, and summary statistics
- Users shall filter comparisons by date range
- Users shall search comparisons by name or description

#### FR-4.2: Comparison Actions
- Users shall delete comparisons
- Users shall export comparison results as JSON
- Users shall share comparison results via link (with authentication)
- Users shall download diff images

### 4.5 API Functionality

#### FR-5.1: REST API Endpoints
The system shall provide the following REST API endpoints:

**Authentication:**
- `POST /api/auth/google` - Initiate Google OAuth flow
- `POST /api/auth/callback` - Handle OAuth callback
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/user` - Get current user profile

**Comparisons:**
- `POST /api/comparisons` - Create new comparison
- `GET /api/comparisons` - List user's comparisons
- `GET /api/comparisons/{id}` - Get specific comparison details
- `DELETE /api/comparisons/{id}` - Delete comparison
- `GET /api/comparisons/{id}/results` - Get comparison results
- `POST /api/comparisons/{id}/analyze` - Trigger AI analysis

**Images:**
- `POST /api/images/upload` - Upload images (baseline/current)
- `GET /api/images/{id}` - Retrieve specific image
- `GET /api/images/{id}/thumbnail` - Get thumbnail version

**AI Insights:**
- `POST /api/ai/analyze-diff` - Analyze specific diff image
- `POST /api/ai/query` - Natural language query interface
- `GET /api/ai/insights/{comparison_id}` - Get AI-generated insights

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **NFR-1.1**: Image comparison shall complete within 5 seconds for images up to 1920x1080
- **NFR-1.2**: API response time shall be under 2 seconds (excluding AI calls)
- **NFR-1.3**: AI analysis shall complete within 10 seconds
- **NFR-1.4**: Web interface shall load within 3 seconds on standard broadband

### 5.2 Scalability
- **NFR-2.1**: System shall support minimum 100 concurrent users
- **NFR-2.2**: System shall handle up to 1000 image comparisons per user
- **NFR-2.3**: System shall support images up to 10MB each

### 5.3 Security
- **NFR-3.1**: All API endpoints (except auth) shall require authentication
- **NFR-3.2**: Data isolation between users shall be enforced at API level
- **NFR-3.3**: File uploads shall be validated for type and size
- **NFR-3.4**: JWT tokens shall expire after 24 hours
- **NFR-3.5**: Sensitive data shall be encrypted in transit (HTTPS)
- **NFR-3.6**: OpenAI API keys shall be stored securely (environment variables)

### 5.4 Usability
- **NFR-4.1**: Web interface shall be responsive (mobile, tablet, desktop)
- **NFR-4.2**: Interface shall follow Material Design or Elastic UI guidelines
- **NFR-4.3**: Error messages shall be user-friendly
- **NFR-4.4**: Loading states shall be indicated for async operations

### 5.5 Reliability
- **NFR-5.1**: System uptime shall be 99.5% (excluding maintenance)
- **NFR-5.2**: Failed operations shall provide meaningful error messages
- **NFR-5.3**: System shall gracefully handle OpenAI API failures

### 5.6 Maintainability
- **NFR-6.1**: Code shall follow PEP 8 (Python) and ESLint standards (JavaScript)
- **NFR-6.2**: API shall be documented using OpenAPI/Swagger
- **NFR-6.3**: Unit test coverage shall be minimum 70%
- **NFR-6.4**: All external dependencies shall be documented

---

## 6. Technical Specifications

### 6.1 API Contract Examples

#### 6.1.1 Create Comparison
```http
POST /api/comparisons
Content-Type: multipart/form-data
Authorization: Bearer <jwt_token>

{
  "name": "Homepage Redesign Test",
  "description": "Comparing redesigned homepage",
  "threshold": 0.1,
  "baseline_images": [<file1>, <file2>, ...],
  "current_images": [<file1>, <file2>, ...]
}

Response 201 Created:
{
  "id": "comp_123456",
  "name": "Homepage Redesign Test",
  "status": "processing",
  "created_at": "2025-11-01T21:16:00Z",
  "user_id": "user_789"
}
```

#### 6.1.2 Get Comparison Results
```http
GET /api/comparisons/comp_123456/results
Authorization: Bearer <jwt_token>

Response 200 OK:
{
  "id": "comp_123456",
  "name": "Homepage Redesign Test",
  "status": "completed",
  "threshold": 0.1,
  "summary": {
    "total": 10,
    "passed": 7,
    "failed": 2,
    "new": 1,
    "obsolete": 0
  },
  "results": [
    {
      "filename": "homepage.png",
      "has_baseline": true,
      "has_current": true,
      "has_diff": true,
      "difference_percent": 0.23,
      "baseline_url": "/api/images/img_001",
      "current_url": "/api/images/img_002",
      "diff_url": "/api/images/img_003",
      "ai_insights": {
        "description": "Button color changed from blue to green",
        "category": "UI Component",
        "severity": "minor"
      }
    },
    ...
  ]
}
```

#### 6.1.3 AI Natural Language Query
```http
POST /api/ai/query
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "comparison_id": "comp_123456",
  "query": "Show me all failures related to navigation menu"
}

Response 200 OK:
{
  "query": "Show me all failures related to navigation menu",
  "matches": [
    {
      "filename": "nav-menu.png",
      "relevance_score": 0.95,
      "reason": "Navigation menu has layout changes",
      "difference_percent": 0.18
    }
  ],
  "explanation": "Found 1 failed comparison related to navigation menu. The main issue is a layout shift in the menu structure."
}
```

### 6.2 Data Models

#### 6.2.1 User
```python
{
  "id": "string (UUID)",
  "google_id": "string (unique)",
  "email": "string",
  "name": "string",
  "avatar_url": "string",
  "created_at": "datetime",
  "last_login": "datetime"
}
```

#### 6.2.2 Comparison
```python
{
  "id": "string (UUID)",
  "user_id": "string (foreign key)",
  "name": "string",
  "description": "string (optional)",
  "threshold": "float (0-1)",
  "status": "enum (processing, completed, failed)",
  "created_at": "datetime",
  "completed_at": "datetime (optional)",
  "summary": {
    "total": "integer",
    "passed": "integer",
    "failed": "integer",
    "new": "integer",
    "obsolete": "integer"
  }
}
```

#### 6.2.3 ComparisonResult
```python
{
  "id": "string (UUID)",
  "comparison_id": "string (foreign key)",
  "filename": "string",
  "has_baseline": "boolean",
  "has_current": "boolean",
  "has_diff": "boolean",
  "difference_percent": "float (optional)",
  "baseline_image_id": "string (optional)",
  "current_image_id": "string (optional)",
  "diff_image_id": "string (optional)",
  "ai_insights": {
    "description": "string",
    "category": "string",
    "severity": "enum (minor, moderate, significant)"
  }
}
```

### 6.3 Technology Stack Details

#### 6.3.1 Backend (Python)
- **Framework**: FastAPI 0.104+ (recommended for async support and automatic OpenAPI docs)
- **Web Server**: Uvicorn (ASGI server)
- **Authentication**: 
  - `google-auth` library for OAuth
  - `PyJWT` for JWT token handling
- **Image Processing**: 
  - Option 1: Call existing Node.js service via subprocess
  - Option 2: Pure Python with Pillow + numpy (port algorithm)
- **Database**: PostgreSQL or SQLite (for development)
- **ORM**: SQLAlchemy 2.0+
- **Storage**: 
  - Development: Local filesystem
  - Production: AWS S3 or Google Cloud Storage
- **AI**: OpenAI Python SDK
- **Async Tasks**: Celery with Redis (for long-running comparisons)

#### 6.3.2 Frontend (JavaScript)
- **Framework**: React 18.3+ (existing)
- **Language**: JavaScript (ES6+) - No TypeScript
- **UI Components**: Elastic UI or migrate to Material-UI
- **State Management**: React Context API with useReducer
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Authentication**: react-oauth/google library
- **Form Handling**: React Hook Form (optional)
- **Build**: Parcel 2 or Vite
- **Testing**: Jest + React Testing Library

#### 6.3.3 Development Tools
- **API Documentation**: Swagger UI (auto-generated by FastAPI)
- **Python Linting**: pylint, black, flake8
- **JavaScript Linting**: ESLint (existing config)
- **Version Control**: Git
- **CI/CD**: GitHub Actions (existing)

---

## 7. Implementation Phases

### Phase 1.1: Backend Foundation (Weeks 1-2)
- [ ] Set up FastAPI project structure
- [ ] Implement Google OAuth 2.0 authentication
- [ ] Create database schema and models
- [ ] Implement JWT token management
- [ ] Set up file storage infrastructure
- [ ] Create basic CRUD APIs for comparisons

### Phase 1.2: Image Processing Integration (Weeks 3-4)
- [ ] Integrate existing Node.js comparison logic OR port to Python
- [ ] Implement image upload API
- [ ] Create comparison execution service
- [ ] Add thumbnail generation
- [ ] Implement result storage and retrieval

### Phase 1.3: Frontend Development (Weeks 5-6)
- [ ] Implement Google OAuth login flow in frontend
- [ ] Create authentication state management
- [ ] Build image upload interface
- [ ] Implement comparison configuration UI
- [ ] Create results gallery view
- [ ] Build detailed comparison viewer

### Phase 1.4: OpenAI Integration (Weeks 7-8)
- [ ] Integrate OpenAI API client
- [ ] Implement diff image analysis
- [ ] Create insight generation service
- [ ] Build natural language query interface
- [ ] Add AI-powered categorization and severity assessment

### Phase 1.5: Testing & Deployment (Weeks 9-10)
- [ ] Write unit tests for backend (Python)
- [ ] Write unit tests for frontend (JavaScript)
- [ ] Perform integration testing
- [ ] Conduct security review
- [ ] Set up production environment
- [ ] Deploy Phase 1 MVP

---

## 8. Questions for Clarification

### 8.1 Technical Decisions

1. **Database Selection**: 
   - Do you have a preference between PostgreSQL, MySQL, or SQLite for development?
   - For production, should we plan for cloud-hosted database (AWS RDS, Google Cloud SQL)?

2. **Image Storage**:
   - Should we store images on local filesystem or use cloud storage (S3, GCS) from the start?
   - What is the expected storage limit per user?
   - Should old comparisons be automatically archived/deleted after a certain period?

3. **Python-Node.js Integration**:
   - Should we keep the existing Node.js image comparison logic and call it from Python, or port everything to Python?
   - If keeping Node.js, is a microservices architecture acceptable?

4. **AI Features Priority**:
   - Which OpenAI feature should be prioritized?
     - Automatic diff descriptions?
     - Natural language queries?
     - Severity assessment?
   - What is the budget for OpenAI API usage?
   - Should AI features be optional (feature flag)?

5. **Deployment Environment**:
   - Where will this be deployed? (AWS, Google Cloud, Azure, on-premise, Docker containers?)
   - Do you need CI/CD pipeline automation?
   - What monitoring and logging tools should we use?

### 8.2 Business Requirements

6. **User Management**:
   - Should we support team/organization accounts or only individual users?
   - Are there any compliance requirements (GDPR, HIPAA, SOC 2)?

7. **Pricing/Quotas**:
   - Should there be usage limits per user (number of comparisons, storage space)?
   - Is this a free tool or will there be paid tiers?

8. **Multi-tenancy**:
   - Should users be able to share comparisons with other users?
   - Do we need role-based access control (admin, viewer, editor)?

### 8.3 Feature Scope

9. **CLI Compatibility**:
   - Should the existing CLI tool continue to work alongside the web app?
   - Should CLI users be able to upload results to the web platform?

10. **Browser Support**:
    - What browsers must be supported? (Chrome, Firefox, Safari, Edge?)
    - What is the minimum browser version?

11. **Notification System**:
    - Should users receive email notifications when comparisons complete?
    - Should there be in-app notifications?

12. **Export/Reporting**:
    - What export formats are needed beyond JSON? (PDF, CSV, Excel?)
    - Should there be scheduled reports?

---

## 9. Success Criteria

### Phase 1 will be considered successful when:

1. **Authentication**:
   - Users can log in using Google OAuth 2.0
   - Sessions persist across browser refreshes
   - User data is properly isolated

2. **Core Functionality**:
   - Users can upload baseline and current images via web interface
   - System generates diff images with configurable threshold
   - Results are displayed in an intuitive gallery view
   - Detailed view shows side-by-side comparison

3. **AI Integration**:
   - OpenAI generates meaningful descriptions of differences
   - Users can query results using natural language
   - Severity assessment provides actionable insights

4. **API Completeness**:
   - All Phase 1 REST endpoints are implemented
   - API documentation is available via Swagger/OpenAPI
   - APIs return appropriate status codes and error messages

5. **Performance**:
   - All NFRs are met or exceeded
   - No major security vulnerabilities
   - Test coverage meets minimum 70% threshold

6. **User Experience**:
   - Interface is intuitive and requires minimal training
   - Responsive design works on mobile and desktop
   - Loading states and error messages are clear

---

## 10. Risks and Mitigations

### Risk 1: OpenAI API Costs
- **Impact**: High usage could lead to unexpected costs
- **Mitigation**: 
  - Implement rate limiting per user
  - Add caching for repeated queries
  - Make AI features optional
  - Monitor usage with alerts

### Risk 2: Image Processing Performance
- **Impact**: Large images or batch comparisons may be slow
- **Mitigation**:
  - Implement async processing with job queue (Celery)
  - Add progress indicators
  - Generate thumbnails for preview
  - Set reasonable file size limits

### Risk 3: Python-JavaScript Integration Complexity
- **Impact**: Mixing Python backend with existing Node.js code could be complex
- **Mitigation**:
  - Option A: Port Node.js comparison logic to Python using Pillow
  - Option B: Keep Node.js as microservice, call from Python
  - Option C: Use subprocess to call Node.js CLI from Python

### Risk 4: Google OAuth Configuration
- **Impact**: OAuth setup can be tricky with redirects and CORS
- **Mitigation**:
  - Use well-tested libraries (google-auth, react-oauth/google)
  - Test thoroughly in development environment
  - Document OAuth app setup steps clearly

### Risk 5: Storage Scalability
- **Impact**: Image storage could grow quickly
- **Mitigation**:
  - Plan for cloud storage (S3/GCS) from the start
  - Implement automatic cleanup of old comparisons
  - Compress images where possible
  - Use thumbnails for gallery views

---

## 11. Dependencies

### External Services
- Google OAuth 2.0 (for authentication)
- OpenAI API (for LLM features)
- Cloud storage service (AWS S3 or Google Cloud Storage) - optional for Phase 1

### Third-Party Libraries
See Technical Stack Details (Section 6.3) for complete list

### Development Tools
- Python 3.11+
- Node.js 18+ (for frontend build tools)
- Git
- PostgreSQL or SQLite
- Docker (optional, for containerization)

---

## 12. Out of Scope for Phase 1

The following features are explicitly **not** included in Phase 1:

1. Team/organization accounts
2. Real-time collaboration features
3. Video comparison
4. Scheduled/automated comparisons
5. Integration with CI/CD pipelines (webhooks, APIs)
6. Mobile native applications (iOS/Android)
7. Advanced analytics and dashboards
8. PDF report generation
9. Email notifications
10. Multiple authentication providers (GitHub, Microsoft, etc.)
11. On-premise deployment support
12. LDAP/Active Directory integration

These may be considered for Phase 2 based on user feedback and prioritization.

---

## 13. Documentation Requirements

### For Development Team:
1. API documentation (OpenAPI/Swagger)
2. Database schema documentation
3. Architecture diagrams
4. Setup and installation guide
5. Contribution guidelines

### For End Users:
1. User guide with screenshots
2. Getting started tutorial
3. FAQ document
4. Video demonstrations
5. API usage examples (for developers using the API)

---

## 14. Appendix

### A. Glossary

- **Baseline Image**: The reference image used for comparison (expected result)
- **Current Image**: The new image being compared against baseline (actual result)
- **Diff Image**: Generated image showing visual differences highlighted
- **Threshold**: Sensitivity setting for difference detection (0 = exact match, 1 = ignore all differences)
- **JWT**: JSON Web Token, used for authentication
- **OAuth**: Open Authorization, standard for secure authorization
- **LLM**: Large Language Model (e.g., GPT-4)
- **REST API**: Representational State Transfer Application Programming Interface

### B. Reference Links

- Current Repository: https://github.com/RaviDasari/see-image-diff
- Jimp Library: https://github.com/oliver-moran/jimp
- Pixelmatch: https://github.com/mapbox/pixelmatch
- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- OpenAI API: https://platform.openai.com/docs/api-reference

### C. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-01 | System | Initial draft based on README and requirements |

---

## Notes

This requirements document is a living document and will be updated based on stakeholder feedback, technical discoveries, and changing priorities. All changes should be tracked in the Change History section.

**Next Steps:**
1. Review this document with stakeholders
2. Answer clarification questions (Section 8)
3. Prioritize features if timeline is constrained
4. Create detailed technical design document
5. Begin Phase 1.1 implementation
