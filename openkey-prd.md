OpenKey Product Requirements Document (PRD)
Executive Summary
OpenKey is an AI-native platform that transforms how users discover, evaluate, and acquire off-plan real estate in the UAE. Unlike traditional property portals like Bayut and Dubizzle, which often suffer from outdated listings and lack of personalization, OpenKey leverages advanced machine learning (ML) and natural language processing (NLP) to deliver highly personalized property recommendations through its proprietary OpenKey Score. This dynamic, evolving score assesses projects based on user prompts, developer transparency, and lifestyle fit, providing a seamless end-to-end journey from discovery to acquisition. The platform integrates continuous data discovery, automated page generation, and a polished user experience (UX) to address market gaps, enhance transparency, and build user trust. This PRD outlines the vision, features, technical architecture, business model, and implementation roadmap to make OpenKey a market leader in UAE’s real estate sector.
Market Analysis
UAE Real Estate Market Insights
The UAE real estate market, particularly in Dubai, is experiencing strong demand for off-plan properties due to investor interest and government initiatives like the Dubai 2040 Urban Master Plan. Research indicates that dominant property portals like Bayut and Dubizzle hold significant market shares but face challenges such as outdated listings, compliance issues, and lack of personalized recommendations. Emerging AI-driven platforms like JustOffPlan.ai and Kyna.ai are addressing these gaps by offering conversational search, predictive analytics, and verified insights, transforming property discovery into a faster, smarter, and more tailored experience.
Opportunities for OpenKey

Transparency Gap: Traditional portals lack robust mechanisms to verify developer disclosures, leading to user distrust. OpenKey’s transparency-focused OpenKey Score addresses this by quantifying developer reliability and project fit.
Personalization Demand: Investors seek tailored recommendations that align with their lifestyle and financial goals. OpenKey’s NLP-driven prompt parsing and dynamic scoring meet this need.
Market Growth: The UAE’s off-plan property market is projected to grow, driven by foreign investment and infrastructure development, creating a strong opportunity for an AI-native platform like OpenKey.

Competitive Positioning
OpenKey differentiates itself by combining AI-driven personalization, real-time data integration, and a seamless UX. Unlike competitors, OpenKey’s continuous discovery and automated page generation ensure up-to-date listings, while its end-to-end acquisition flow simplifies the user journey.
Technical Architecture
Overview
OpenKey’s technical foundation is designed to support scalable, real-time data processing, personalized scoring, and a polished UX. The architecture integrates advanced AI models, vector databases, and modern web frameworks to deliver a robust and efficient platform.
Technology Stack

Frontend: Next.js for a responsive, high-performance user interface.
Backend: Supabase for data management and authentication.
Vector Database: Pinecone or Weaviate for efficient storage and retrieval of project and user data.
AI Orchestration: LangChain for managing NLP and ML workflows.
AI Models: GPT for prompt parsing and rationale generation, custom ranking models for OpenKey Score calculations, and reinforcement learning for score evolution based on user interactions.
Automation: Continuous scraping and ingestion pipelines to update project data and trigger auto-scoring.

Data Flow

Data Ingestion: Continuous discovery agents scrape developer websites, news outlets, government announcements, and property portals to collect structured (e.g., price, size, handover) and contextual (e.g., lifestyle, connectivity) data.
Processing: NLP models parse user prompts and project data, while vector search and ranking models compute OpenKey Scores.
Storage: Data is stored in Supabase for structured attributes and Pinecone/Weaviate for vectorized metadata.
Output: Real-time scores and rationales are displayed across search results, project detail views, and dashboards, with automated page updates for new or “just announced” projects.

Scalability and Security

Scalability: Modular architecture ensures the platform can handle increasing user and data volumes.
Security: Supabase provides robust authentication, while data encryption and compliance with UAE regulations (e.g., GDPR-equivalent standards) protect user privacy.

Data Requirements and Content Specifications
Property Data Structure

Core Attributes:

Project Name, Developer, Location, Price Range, Unit Types (size, bedrooms), Handover Date, Payment Plan.


Lifestyle Metadata:

Proximity to schools, parks, transit, cultural/health facilities.
Community vibe (e.g., family-friendly, luxury, urban).


Developer Transparency Metrics:

Public disclosure completeness (e.g., financials, project updates).
Historical reliability (e.g., on-time delivery, compliance).


Media Assets:

High-resolution images, floor plans, virtual tours.



User Data

Prompt Data: Explicit filters (budget, bedrooms) and implicit intent (lifestyle preferences, emotional drivers).
Behavioral Data: Saved projects, enquiries, interaction patterns.
Profile Data: Contact details, communication preferences.

Content Quality Standards

Accuracy: Verified data from developer websites, government sources, and portals.
Completeness: Full project pages include all core attributes and metadata; “just announced” pages use templates with minimal data and update automatically.
Consistency: Standardized formats for prices, sizes, and timelines.
Management: Automated ingestion and manual review for high-stakes data (e.g., pricing).

Data Processing

Continuous Discovery: AI agents scrape and parse data from developer websites, news, and government sources.
Scoring: Real-time OpenKey Score calculation using vector search and ranking models.
Storage: Structured data in Supabase, vectorized metadata in Pinecone/Weaviate.

Customer Acquisition and Retention

Acquisition:

Digital marketing via Meta Ads and Google Ads targeting UAE investors.
Partnerships with developers and real estate agencies.
Content marketing with blogs and videos on off-plan investment trends.


Retention:

Personalized email campaigns based on user preferences.
Loyalty rewards for frequent users (e.g., discounted premium subscriptions).
In-app notifications for score updates and new projects.



Operational Requirements

Team: Developers, data scientists, UX designers, customer support.
Infrastructure: Cloud hosting on AWS with Supabase and Pinecone integration.
Quality Assurance: Regular testing of AI models, UI functionality, and data accuracy.
Customer Support: 24/7 chat and email support for premium users.

Legal Compliance and Risk Management

Compliance: Adherence to UAE real estate regulations (e.g., RERA) and data privacy laws.
Risks:

Data accuracy: Mitigated by automated and manual verification.
Platform uptime: Ensured by AWS redundancy and monitoring.
User trust: Built through transparent scoring and clear rationales.

Implementation Roadmap
Phase 1: Foundation (0–3 Months)

Objectives: Build core infrastructure and MVP features.
Tasks:

Set up Supabase, Pinecone/Weaviate, and Next.js environments.
Develop OpenKey Score framework (prompt parsing, matching, scoring).
Implement basic search interface and project detail view.
Launch continuous discovery pipeline for initial data ingestion.


Deliverables: MVP with basic search, scoring, and project pages.

Phase 2: Enhancement (4–6 Months)

Objectives: Expand features and refine UX.
Tasks:

Add dashboard with saved projects and enquiry tracker.
Implement automated page generation for “just announced” projects.
Enhance OpenKey Score with reinforcement learning for dynamic updates.
Integrate mobile-responsive design and accessibility features.


Deliverables: Fully functional platform with dashboard and advanced scoring.

Phase 3: Scale and Launch (7–12 Months)

Objectives: Finalize platform and launch to market.
Tasks:

Conduct beta testing with select users and developers.
Implement go-to-market strategy (digital ads, partnerships).
Optimize performance for scalability and high user volumes.
Launch premium subscription and transaction fee models.


Deliverables: Public launch with full feature set and marketing campaigns.

Phase 4: Growth and Iteration (12+ Months)

Objectives: Expand user base and refine platform.
Tasks:

Add enterprise API and sponsored listings.
Iterate on user feedback to enhance UX and scoring accuracy.
Expand data sources for continuous discovery.


Deliverables: Market-leading platform with growing user base and revenue.

Conclusion
This PRD provides a clear, actionable blueprint for building OpenKey, an AI-native platform that redefines off-plan real estate discovery in the UAE. By integrating advanced AI models, real-time data processing, and a polished UX, OpenKey addresses market gaps in transparency and personalization. The detailed UI/UX specifications, data requirements, business model, and implementation roadmap ensure the platform is buildable, measurable, and executable. The next steps are to initiate Phase 1 development, focusing on the core infrastructure and MVP features, as outlined in the implementation roadmap.
