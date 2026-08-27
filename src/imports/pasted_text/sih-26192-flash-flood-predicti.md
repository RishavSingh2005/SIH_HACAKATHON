You are an elite multidisciplinary engineering team responsible for building a complete working MVP for Smart India Hackathon 2026 Problem Statement 26192.

============================================================
PROJECT
============================================================

Problem Statement ID:
26192

Title:
Flash Flood Prediction System for Hilly Regions using Multi-Source Data

Organization:
Ministry of Home Affairs

Department:
National Disaster Response Force (NDRF), DM Division

Category:
Software

============================================================
PROBLEM
============================================================

Hilly regions of India are highly vulnerable to flash floods and
landslides.

These events can develop rapidly, leaving very little time for
evacuation.

Existing warning mechanisms often lack hyper-local prediction and
actionable warnings at village/ward level.

The proposed system must integrate multiple sources:

- Rainfall
- Soil moisture
- Slope
- Elevation
- Terrain characteristics
- Historical landslide/flood records
- Real-time IoT sensor readings
- Weather information where available

The system should estimate local flash-flood/landslide risk and
generate actionable early warnings.

============================================================
PRIMARY OBJECTIVE
============================================================

Build a functional prototype called:

"PRAVAAH"

Tagline:

"Hyper-Local Flash Flood Intelligence & Early Warning System"

The system should demonstrate:

MULTI-SOURCE DATA
        ↓
DATA PROCESSING
        ↓
RISK ENGINE
        ↓
VILLAGE/WARD LEVEL RISK
        ↓
LEAD-TIME ESTIMATION
        ↓
EARLY WARNING
        ↓
ACTIONABLE RESPONSE

The MVP must be functional.

Do NOT create a dashboard that only contains fake charts.

Every important displayed value must come from either:

1. Real data
2. A clearly labelled simulation
3. A documented predictive model

Never secretly fabricate results.

============================================================
DEVELOPMENT CONSTRAINT
============================================================

I am a student.

I have approximately one week to build the SIH prototype.

I am not an expert programmer.

Your job is to BUILD the project.

Do not merely explain what I should build.

You are allowed to:

- Create files
- Modify files
- Install dependencies
- Run commands
- Run tests
- Debug errors
- Refactor code
- Improve UI
- Generate documentation
- Create sample datasets
- Build the complete MVP

When something fails:

1. Read the error
2. Find the root cause
3. Fix it
4. Run again
5. Continue

Do not stop at a plan.

============================================================
IMPORTANT SIH STRATEGY
============================================================

Prioritize a strong working MVP over unnecessary enterprise features.

Do NOT spend the first week implementing:

- Kubernetes
- Microservices
- Complex authentication
- Payment systems
- Mobile applications
- Enterprise IAM
- Huge distributed infrastructure

The priority is:

P0:
Risk prediction

P0:
Multi-source data integration

P0:
Hyper-local map

P0:
Early warning

P0:
Lead-time estimation

P1:
IoT simulation/live sensor ingestion

P1:
Explainable AI

P1:
Historical analysis

P1:
What-if simulation

P2:
Advanced scalability

============================================================
CORE SYSTEM
============================================================

Build the following pipeline:

                 RAINFALL
                    │
                 SOIL MOISTURE
                    │
                 SLOPE/ELEVATION
                    │
              HISTORICAL EVENTS
                    │
                 IoT DATA
                    │
                    ▼
             DATA INGESTION
                    │
                    ▼
           DATA NORMALIZATION
                    │
                    ▼
          FEATURE ENGINEERING
                    │
                    ▼
             RISK ENGINE
                    │
              ┌─────┴─────┐
              ▼           ▼
          FLOOD RISK   LANDSLIDE RISK
              │           │
              └─────┬─────┘
                    ▼
             LOCAL RISK SCORE
                    │
                    ▼
             LEAD TIME MODEL
                    │
                    ▼
          WARNING GENERATION
                    │
                    ▼
        VILLAGE/WARD ALERT SYSTEM
                    │
                    ▼
        ACTIONABLE RESPONSE PLAN

============================================================
TECH STACK
============================================================

Backend:

Python
FastAPI
Pydantic

Data processing:

Pandas
NumPy

Machine learning:

Scikit-learn

Optional:

XGBoost if it can be installed and used reliably.

Geospatial:

GeoPandas
Rasterio
Shapely
PyProj

Map:

Leaflet
React-Leaflet

Frontend:

React
Vite
TypeScript or JavaScript

Charts:

Recharts or Chart.js

Database:

SQLite for MVP

Design architecture for later migration to:

PostgreSQL + PostGIS

Optional real-time:

WebSockets

============================================================
PROJECT STRUCTURE
============================================================

Create:

pravaah/

    backend/
        main.py
        config.py

        api/
            risk.py
            alerts.py
            sensors.py
            locations.py
            history.py
            simulation.py

        services/
            risk_engine.py
            rainfall_service.py
            soil_service.py
            terrain_service.py
            sensor_service.py
            alert_service.py
            lead_time_service.py
            feature_engineering.py

        ml/
            train.py
            predict.py
            model.py
            preprocessing.py

        geospatial/
            terrain.py
            raster.py
            spatial_analysis.py

        models/
            schemas.py
            database.py

        utils/
            logging.py
            validation.py

    frontend/
        src/
            components/
            pages/
            services/
            hooks/
            utils/
            App.jsx

    data/
        raw/
        processed/
        samples/

    models/

    tests/

    docs/

    scripts/

    README.md

============================================================
MAIN DASHBOARD
============================================================

Build a professional disaster-management dashboard.

It should NOT look like a generic admin dashboard.

Design language:

- Emergency management
- GIS
- Scientific monitoring
- Clear risk communication

Main screen:

------------------------------------------------------------

PRAVAAH
Flash Flood Intelligence & Early Warning System

[Selected Region]

[CURRENT RISK]
LOW / MODERATE / HIGH / CRITICAL

[Lead Time]
XX minutes

[Rainfall]
XX mm/hr

[Soil Moisture]
XX %

[Slope]
XX°

------------------------------------------------------------

Interactive Map

Show:

- villages
- wards
- rivers/streams where data exists
- elevation
- rainfall
- risk zones
- sensor locations
- warning zones

Risk colors:

LOW
MODERATE
HIGH
CRITICAL

Use accessible colors and legends.

------------------------------------------------------------

LIVE SENSOR PANEL

Sensor ID
Location
Rainfall
Soil Moisture
Water Level
Battery
Last Updated

------------------------------------------------------------

ALERT PANEL

Active Alerts

Location
Risk
Reason
Lead Time
Recommended Action

------------------------------------------------------------
============================================================
INTERACTIVE MAP
============================================================

Use Leaflet.

The map must support:

- Zoom
- Pan
- village/ward boundaries
- risk heatmap
- sensor markers
- rainfall overlay where available
- terrain/elevation layer if available
- selected-location details

Clicking a village/ward should open:

Location:
Risk:
Rainfall:
Soil Moisture:
Slope:
Elevation:
Historical Events:
Current Sensor Status:
Predicted Risk:
Estimated Lead Time:
Recommended Action:

============================================================
RISK ENGINE
============================================================

Build a real risk engine.

Do not simply generate random risk values.

The system should combine:

Rainfall intensity
Rainfall accumulation
Soil moisture
Slope
Elevation
Historical events
Sensor readings
Terrain characteristics

Create engineered features such as:

rainfall_1h
rainfall_3h
rainfall_6h
rainfall_24h

rainfall_change_rate

soil_moisture

soil_moisture_change

slope

elevation

historical_event_frequency

sensor_water_level

sensor_rainfall

============================================================
MODEL
============================================================

For the MVP use a practical ML model.

Preferred:

Random Forest

Alternative:

Gradient Boosting

Do not use a huge deep learning model unless there is a strong
reason.

The model should output:

flood_probability

landslide_probability

overall_risk_score

Example conceptual output:

Flood probability: 0.82
Landslide probability: 0.67
Overall risk: 0.78
Risk level: HIGH

Do NOT pretend these numbers are real-world calibrated probabilities
unless the model has actually been trained and calibrated.

Label them appropriately.

============================================================
TRAINING DATA
============================================================

Use real/open datasets where practical.

Possible sources to investigate:

- IMD rainfall/open rainfall datasets
- NASA GPM precipitation
- NASA/ESA satellite datasets
- ISRO/Bhuvan datasets where legally accessible
- SRTM elevation
- Copernicus DEM
- Historical flood datasets
- Historical landslide inventories
- Geological/terrain datasets
- OpenStreetMap for geographic context

Do NOT scrape websites illegally.

Do NOT hardcode fake historical disaster records.

If suitable real training data cannot be obtained within the MVP
timeline:

create a clearly labelled synthetic training dataset based on
documented relationships between rainfall, soil moisture, slope,
and disaster risk.

The UI must say:

"Prototype model using simulated training data"

when applicable.

Never present synthetic model performance as real-world accuracy.

============================================================
RAINFALL
============================================================

Implement rainfall ingestion.

Support:

CSV
JSON
API-ready architecture

Example fields:

timestamp
latitude
longitude
rainfall_mm

Calculate:

1-hour rainfall
3-hour accumulation
6-hour accumulation
24-hour accumulation
rainfall intensity
rainfall trend

Create a service:

rainfall_service.py

============================================================
SOIL MOISTURE
============================================================

Support:

CSV
JSON
sensor input

Fields:

sensor_id
timestamp
latitude
longitude
soil_moisture
temperature

Calculate:

current soil moisture
change rate
rolling average

============================================================
IoT SENSOR SYSTEM
============================================================

Implement a simulated IoT sensor system for the MVP.

The simulation must be clearly labelled:

"SIMULATED SENSOR STREAM"

Sensors should periodically produce:

- rainfall
- soil moisture
- water level
- temperature
- battery

Example:

Sensor HILL-001
Rainfall: 72 mm/hr
Soil Moisture: 89%
Water Level: +1.2m
Battery: 91%

Allow the frontend to show changing sensor readings.

Use WebSocket if practical.

If WebSocket creates unnecessary complexity, use polling.

Architecture should later support:

MQTT

but do NOT implement a complex MQTT infrastructure unless easy.

============================================================
LEAD TIME ESTIMATION
============================================================

This is a critical feature.

The system should estimate:

"Estimated time until critical risk"

Example:

Current risk:
HIGH

Estimated lead time:
38 minutes

Lead time should be based on a documented prototype methodology.

Potential inputs:

- rainfall intensity
- rainfall trend
- soil saturation
- terrain/slope
- water-level rise

Do NOT claim that the lead time is operationally accurate.

Clearly label it:

"Prototype estimated lead time"

============================================================
WARNING SYSTEM
============================================================

Create warning levels:

GREEN
LOW RISK

YELLOW
WATCH

ORANGE
HIGH RISK

RED
CRITICAL

Each warning must contain:

Location
Risk level
Reason
Estimated lead time
Recommended action

Example:

RED ALERT

Location:
Village X

Risk:
CRITICAL

Estimated lead time:
28 minutes

Drivers:
- extreme rainfall
- saturated soil
- steep slope
- rapidly increasing water level

Recommended action:
Begin evacuation toward designated safe zones.

============================================================
ACTIONABLE WARNINGS
============================================================

Do not simply say:

"Flood risk detected."

Generate useful explanations.

Example:

"Heavy rainfall over the previous 3 hours combined with high soil
moisture and steep terrain has increased flash-flood risk."

Also provide:

"Why this alert?"

with contributing factors.

============================================================
EXPLAINABLE AI
============================================================

Implement a simple explanation layer.

For each prediction show:

Top risk contributors:

Rainfall:
HIGH

Soil moisture:
HIGH

Slope:
HIGH

Historical risk:
MEDIUM

Water level trend:
HIGH

Use model feature importance where possible.

If using Random Forest:

display feature importance.

Do not generate explanations that contradict model inputs.

============================================================
HISTORICAL ANALYSIS
============================================================

Create a historical events page.

Display:

Date
Location
Event type
Rainfall
Severity
Affected area

Allow:

- filtering by date
- filtering by location
- filtering by event type

Show charts:

events over time
rainfall vs events
risk distribution

============================================================
WHAT-IF SIMULATOR
============================================================

This can be a major demo feature.

Allow user to change:

Rainfall:
20 → 50 → 100 → 150 mm/hr

Soil moisture:
40% → 60% → 80% → 95%

Water level:
Normal → Rising → Critical

Then calculate:

Risk Score
Risk Level
Estimated Lead Time

Display:

CURRENT SCENARIO

vs

WHAT-IF SCENARIO

Example:

Rainfall:
50 mm/hr → 120 mm/hr

Risk:
MODERATE → CRITICAL

Lead Time:
74 min → 24 min

This must use the actual risk engine.

============================================================
VILLAGE/WARD LEVEL RISK
============================================================

The key differentiator is hyper-local prediction.

Do not only show district-level risk.

Create a spatial grid or village/ward-level prediction.

Each location should have:

location_id
name
latitude
longitude
risk_score
risk_level
rainfall
soil_moisture
slope
elevation
lead_time

The map should allow users to see which locations are most at risk.

============================================================
ROUTE / EVACUATION SUPPORT
============================================================

For MVP:

Show safe-zone markers.

If possible:

provide a basic evacuation direction.

Do not build a complex navigation system.

Display:

Current location
Nearest safe zone
Risk zone
Suggested direction

If routing data is unavailable:

clearly label it as prototype guidance.

============================================================
ALERT PRIORITIZATION
============================================================

Create an alert queue.

Sort locations by:

risk score
lead time
population if available
severity

Example:

CRITICAL
Village A
18 min

CRITICAL
Village B
26 min

HIGH
Village C
41 min

============================================================
POPULATION / IMPACT
============================================================

If population data is available:

include population at risk.

Otherwise:

do not fabricate it.

Allow future integration with census/geospatial datasets.

Display:

Population potentially affected

only when supported by data.

============================================================
API
============================================================

Create:

GET /api/health

GET /api/risk

GET /api/risk/{location_id}

POST /api/predict

POST /api/simulate

GET /api/alerts

GET /api/sensors

POST /api/sensors

GET /api/history

GET /api/locations

GET /api/terrain

GET /api/metrics

GET /api/model/status

WebSocket:

/ws/sensors

============================================================
DATABASE
============================================================

Use SQLite for MVP.

Tables:

locations
sensors
sensor_readings
rainfall
historical_events
predictions
alerts
model_metrics

Keep the schema compatible with future PostgreSQL/PostGIS migration.

============================================================
DATA VALIDATION
============================================================

Validate:

- missing values
- invalid coordinates
- impossible rainfall values
- negative soil moisture
- duplicate sensor readings
- timestamp errors

Do not allow corrupt data to silently enter the model.

============================================================
GEOSPATIAL PROCESSING
============================================================

Implement basic support for:

GeoJSON
GeoTIFF
DEM

Use:

Rasterio
GeoPandas
Shapely
PyProj

Where terrain data exists, derive:

elevation
slope

Slope should be calculated from elevation data where possible.

============================================================
MODEL VALIDATION
============================================================

If labelled historical data is available, calculate:

Accuracy
Precision
Recall
F1
ROC-AUC where appropriate

For disaster prediction:

PAY PARTICULAR ATTENTION TO RECALL.

Missing a dangerous event can be more serious than generating a
false alarm.

Display a confusion matrix.

Do not optimize solely for accuracy.

If synthetic data is used:

clearly label the evaluation:

"Prototype evaluation on synthetic/simulated dataset"

============================================================
FALSE ALARM / MISSED EVENT
============================================================

Add an explanation page:

False Positive:
Warning issued but no event occurred.

False Negative:
Event occurred but system failed to issue sufficient warning.

Explain why this matters for disaster management.

============================================================
CONFIDENCE
============================================================

Do not display misleading certainty.

Show:

Risk:
HIGH

Prediction confidence:
0.81

only if confidence is actually calculated appropriately.

Otherwise use:

Model score:
0.81

instead of:

81% probability

============================================================
UI PAGES
============================================================

Create:

1. Dashboard

2. Live Monitoring

3. Risk Map

4. Location Details

5. Historical Events

6. What-If Simulator

7. Alerts

8. Model/Validation

9. About / Methodology

============================================================
DASHBOARD KPIs
============================================================

Display:

Active Alerts
Critical Locations
High Risk Locations
Sensors Online
Average Rainfall
Highest Rainfall
Highest Risk Location
Minimum Estimated Lead Time

============================================================
LIVE MONITORING
============================================================

Show:

Live rainfall graph

Soil moisture graph

Water-level graph

Sensor map

Risk trend

Update automatically.

============================================================
ALERT TIMELINE
============================================================

Show:

10:42
Rainfall threshold exceeded

10:45
Soil moisture rapidly increased

10:47
Risk upgraded to HIGH

10:51
CRITICAL alert generated

10:52
Evacuation recommendation issued

This timeline must be generated from actual system events.

============================================================
DEMO MODE
============================================================

Create a controlled demo mode.

Purpose:

SIH judges should understand the system within 2-3 minutes.

Demo scenario:

A hypothetical hilly region experiences intense rainfall.

Start:

Rainfall:
35 mm/hr

Risk:
LOW

Then increase rainfall:

70 mm/hr

Risk:
MODERATE

Then:

110 mm/hr

Soil moisture:
90%

Water level rising

Risk:
HIGH

Then:

Extreme rainfall + saturated soil + steep slope

Risk:
CRITICAL

Alert appears:

RED ALERT

Estimated lead time:
XX minutes

Recommended action:
Evacuation toward safe zone.

The system must actually recalculate the risk.

Clearly label this:

"Demonstration Simulation"

============================================================
PROFESSIONAL UI
============================================================

The design must feel like a disaster intelligence platform.

Use:

- clean typography
- responsive layout
- clear risk hierarchy
- map-first design
- charts
- cards
- status indicators
- alert banners

Avoid:

- excessive gradients
- unnecessary animations
- generic AI chatbot appearance
- fake futuristic interfaces
- excessive text

The map and risk state should be the visual focus.

============================================================
SCALABILITY
============================================================

Design for future architecture:

                    USERS
                      ↓
                React Frontend
                      ↓
                  FastAPI
                      ↓
              API / Prediction
                      ↓
              Processing Queue
                      ↓
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
    ML Worker    Geo Worker     Alert Worker
        ↓             ↓             ↓
        └─────────────┼─────────────┘
                      ↓
             PostgreSQL/PostGIS
                      ↓
               Object Storage

Future technologies may include:

Redis
Celery
PostgreSQL
PostGIS
Kafka/MQTT
Docker
Cloud GPU workers

But these are NOT required for the first MVP.

============================================================
SECURITY
============================================================

Implement basic:

- input validation
- file validation
- API validation
- safe file handling
- no arbitrary code execution
- environment variables for secrets

Never hardcode API keys.

============================================================
TESTING
============================================================

Create tests for:

- risk calculation
- rainfall processing
- soil moisture processing
- slope calculation
- sensor ingestion
- alert generation
- lead-time calculation
- API endpoints
- what-if simulation

Create one end-to-end test:

sensor/rainfall data
→ feature engineering
→ risk prediction
→ alert
→ dashboard result

============================================================
PERFORMANCE
============================================================

The MVP must run on a normal student laptop.

Do not require:

- cloud GPU
- distributed cluster
- Kubernetes

Use efficient Pandas/NumPy operations.

Cache expensive terrain operations.

Do not reload ML models for every prediction.

============================================================
DOCUMENTATION
============================================================

Create:

README.md

docs/
    ARCHITECTURE.md
    DATA_SOURCES.md
    ML_METHODOLOGY.md
    RISK_ENGINE.md
    GEO_PROCESSING.md
    API.md
    DEMO_GUIDE.md
    LIMITATIONS.md
    FUTURE_ROADMAP.md

Explain:

What data is real.

What data is simulated.

What is predicted.

What is calculated.

What assumptions are made.

What limitations exist.

============================================================
SCIENTIFIC HONESTY
============================================================

This is extremely important.

Never claim:

"100% accurate"

"guaranteed warning"

"real-time government-grade system"

unless independently validated.

Use terminology such as:

"prototype"

"estimated risk"

"model score"

"simulated sensor stream"

"prototype lead-time estimate"

when appropriate.

The system should be presented as a decision-support prototype, not
as a replacement for official disaster-warning authorities.

============================================================
SIH PRESENTATION VALUE
============================================================

The system should communicate five things immediately:

1. WE INTEGRATE MULTIPLE DATA SOURCES.

2. WE PREDICT AT HYPER-LOCAL LEVEL.

3. WE PROVIDE LEAD-TIME ESTIMATION.

4. WE EXPLAIN WHY THE RISK IS HIGH.

5. WE TURN PREDICTIONS INTO ACTIONABLE WARNINGS.

============================================================
KEY DEMO
============================================================

The final demonstration should follow:

STEP 1

Open PRAVAAH dashboard.

STEP 2

Show live map of the selected hilly region.

STEP 3

Show normal conditions.

STEP 4

Increase rainfall through demo simulator.

STEP 5

Show soil moisture increasing.

STEP 6

Show risk changing.

LOW
→ MODERATE
→ HIGH
→ CRITICAL

STEP 7

Show affected village highlighted.

STEP 8

Show:

Risk score
Risk contributors
Estimated lead time

STEP 9

Generate alert.

STEP 10

Show recommended action.

STEP 11

Open "Why this alert?"

Show:

Rainfall
Soil moisture
Slope
Water level
Historical risk

STEP 12

Open What-If Simulator.

Show:

"If rainfall increases by 30%, risk changes from HIGH to CRITICAL."

============================================================
IMPLEMENTATION ORDER
============================================================

Do NOT attempt everything at once.

Phase 1:

Create backend and frontend.

Make application run.

Phase 2:

Create sample data.

Phase 3:

Implement risk engine.

Phase 4:

Implement ML model.

Phase 5:

Implement API.

Phase 6:

Implement interactive map.

Phase 7:

Implement sensor simulation.

Phase 8:

Implement alerts.

Phase 9:

Implement lead-time estimation.

Phase 10:

Implement what-if simulator.

Phase 11:

Implement historical analysis.

Phase 12:

Implement validation.

Phase 13:

Polish UI.

Phase 14:

Test entire system.

============================================================
ONE-WEEK PRIORITY
============================================================

If time becomes limited:

MUST HAVE:

1. Risk engine
2. Interactive map
3. Multi-source data
4. Hyper-local risk
5. Alert generation
6. Lead-time estimate
7. Sensor simulation
8. Explainable risk
9. What-if simulator
10. Working demo

NICE TO HAVE:

11. Advanced terrain layers
12. Real-time WebSocket
13. Advanced evacuation routing
14. PostgreSQL
15. Docker
16. Cloud deployment

============================================================
FINAL ACCEPTANCE TEST
============================================================

The project is complete only when:

1. Backend starts successfully.

2. Frontend starts successfully.

3. Dashboard loads.

4. Map loads.

5. Sample region appears.

6. Sample sensors appear.

7. Rainfall data appears.

8. Soil moisture appears.

9. Risk engine calculates risk.

10. Risk changes when inputs change.

11. Village/ward risk is displayed.

12. Critical locations are highlighted.

13. Alert is generated.

14. Alert explains its causes.

15. Lead-time estimate is displayed.

16. What-if simulator works.

17. Historical data can be displayed.

18. Model metrics can be displayed when valid data exists.

19. No fake scientific metrics are displayed.

20. Complete demo can be performed in under 3 minutes.

============================================================
FINAL RULE
============================================================

BUILD FIRST.

TEST SECOND.

EXPLAIN THIRD.

Do not give me a giant theoretical answer.

Inspect the workspace and start implementing the project immediately.

If the workspace already contains code, audit it before replacing anything.

If useful existing components exist, reuse them.

If a dependency fails to install, choose a stable alternative.

If a sophisticated feature cannot be reliably implemented within the
MVP timeframe, implement the simplest technically honest version.

At every stage keep the application runnable.

START BUILDING PRAVAAH NOW.