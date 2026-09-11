# Mainframe Application Processing System

An interactive portfolio project demonstrating **mainframe application processing workflows** using COBOL, JCL, DB2, VSAM, CICS, and z/OS concepts.

## Project Overview

This project demonstrates an end-to-end mainframe application workflow covering application development, job execution, data processing, output analysis, and troubleshooting.

The application presents these concepts through an interactive web interface that includes capability overviews, workflow stages, representative JCL, structured troubleshooting guides, and a simulated z/OS terminal execution flow.

> **Note:** The terminal and job execution shown in this project are simulated for demonstration and educational purposes. The application does not execute jobs on a live IBM z/OS mainframe.

## Technologies & Mainframe Skills

### Mainframe Technologies

* **COBOL** – Program development, compilation, testing, debugging, and error analysis
* **JCL** – Job creation, submission, dataset allocation, execution, and return-code analysis
* **DB2** – SQL queries, data retrieval, validation, and embedded SQL concepts
* **VSAM** – KSDS, ESDS, RRDS, and file-status handling
* **CICS** – Transaction-processing concepts, BMS maps, and program linkage
* **z/OS** – TSO/ISPF, PDS libraries, job submission, and output analysis

### Web Technologies

* React
* TypeScript
* Vite
* CSS
* Supabase

The project uses React 18, TypeScript, Vite, and Supabase.

## Key Features

### 1. Mainframe Application Capabilities

The project demonstrates six core areas:

* COBOL Programming
* JCL Job Execution
* DB2 SQL & Data Access
* VSAM Dataset Management
* CICS Transaction Processing
* z/OS Environment

These capabilities cover the major technologies used throughout the demonstrated application-processing workflow.

### 2. End-to-End Processing Workflow

The application demonstrates the following lifecycle:

```text
JCL Job Submission
        ↓
COBOL Compilation
        ↓
Link-Edit
        ↓
Application Execution
        ↓
DB2 / VSAM Data Processing
        ↓
Output Review
        ↓
Troubleshooting & Debugging
```

The workflow includes job submission, COBOL compilation, execution and processing, output analysis, and troubleshooting.

### 3. JCL Job Example

A representative payroll-processing JCL workflow is included in the application.

```jcl
//* PAYROLL PROCESSING JOB
//PAYROLL JOB ,
//        CLASS=A,MSGCLASS=H,MSGLEVEL=(1,1),
//        NOTIFY=&SYSUID
//COBOLC EXEC COBOLC
//SYSLIN  DD DSN=PROD01.PDS.COBOL(PAYROLL),
//             DISP=SHR
//PAYRUN  EXEC PGM=PAYROLL,COND=(0,NE)
//STEPLIB DD DSN=PAYROLL.LOADLIB,DISP=SHR
//EMPMAST DD DSN=VSAM.KSDS.EMPMAST,
//             DISP=SHR
//PAYFILE DD DSN=PAYROLL.PAYFILE.G+,
//             DISP=(NEW,CATLG),
//             SPACE=(TRK,(100,50),RLSE),
//             DCB=(RECFM=FB,LRECL=200)
//SYSOUT  DD SYSOUT=*
//SYSPRINT DD SYSOUT=*
```

This demonstrates concepts such as job cards, execution steps, load libraries, VSAM dataset allocation, output datasets, and SYSOUT processing.

## 4. COBOL Development & Testing

The project demonstrates a COBOL-oriented application lifecycle involving:

* Program development
* Compilation
* Compile-listing review
* Syntax and data-definition error analysis
* Debugging
* Testing
* Return-code verification
* Execution troubleshooting

The troubleshooting section includes examples of common COBOL compile issues such as invalid verbs, undefined data names, and compilation severity levels.

## 5. DB2 Processing

The project demonstrates DB2 processing concepts including:

* SQL queries
* Data retrieval
* Data validation
* Embedded SQL concepts
* SQL return-code analysis

Example SQL conditions covered include:

```text
SQLCODE +100  → Row not found
SQLCODE -805  → Plan/package not found
SQLCODE -911  → Timeout or deadlock
```

The project provides troubleshooting guidance for each scenario.

## 6. VSAM Processing

VSAM concepts demonstrated include:

* KSDS
* ESDS
* RRDS
* Record-level processing
* File-status analysis

Example file-status scenarios include:

```text
23 → Key not found
34 / 44 → Space or boundary-related condition
92 → Logic error
```

The project explains potential causes and corrective actions for these scenarios.

## 7. CICS Transaction Processing

The project covers CICS application concepts including:

* Transaction processing
* BMS maps
* Program linkage
* Resource management
* Transaction abend analysis

Common CICS abends demonstrated include:

```text
ASRA → Program check
AEIB → Program not found
AICA → Runaway task / time interval exceeded
```

## 8. Troubleshooting & Error Analysis

A structured troubleshooting section covers six major categories:

| Area  | Examples                                    |
| ----- | ------------------------------------------- |
| COBOL | Compile errors, undefined data names        |
| JCL   | Dataset errors, allocation failures, abends |
| DB2   | SQLCODE +100, -805, -911                    |
| VSAM  | File-status codes 23, 34, 44, 92            |
| CICS  | ASRA, AEIB, AICA                            |
| z/OS  | TSO, PDS, job queue issues                  |

The application provides symptoms and recommended resolution approaches for each category.

## 9. Simulated z/OS Terminal

The project includes an animated terminal demonstration representing a payroll batch-processing job.

Example flow:

```text
READY
   ↓
SUBMIT JOB(PROD01.PDS.JCL(PAYROLL))
   ↓
JOB PAYROLL SUBMITTED
   ↓
COBOL COMPILATION
   ↓
LINK-EDIT
   ↓
VSAM DATASET ACCESS
   ↓
DB2 SQL PROCESSING
   ↓
EMPLOYEE RECORD PROCESSING
   ↓
OUTPUT FILE GENERATION
   ↓
JOB COMPLETED RC=0000
```

The simulated sequence represents processing of **48,392 employee records**, followed by successful completion with return code `0000`.

## Project Structure

```text
mainframe-application-processing/
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
│
├── src/
│   ├── App.tsx
│   ├── data.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
└── supabase/
    └── migrations/
        └── 20260911103023_create_visitor_log.sql
```

The main React application manages navigation, workflow sections, troubleshooting content, terminal animation, and visitor tracking.

## Getting Started

### Prerequisites

* Node.js 18+
* npm
* Supabase project

### Clone the Repository

```bash
git clone https://github.com/rayeesa163/mainframe-application-processing.git
cd mainframe-application-processing
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The frontend uses these environment variables to initialize the Supabase client.

### Run the Application

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

The available npm scripts are defined in `package.json`.

## Visitor Tracking

The project uses Supabase to maintain a simple visitor counter.

When the application loads:

1. A visit is inserted into the `visitor_log` table.
2. The application retrieves the total visit count.
3. The count is displayed in the footer.

The database migration creates the `visitor_log` table and enables Row Level Security policies for visitor logging and count retrieval.

## Learning Outcomes

This project demonstrates knowledge of:

* Mainframe application lifecycle
* COBOL development and testing
* JCL job processing
* Batch processing concepts
* DB2 SQL data access
* VSAM dataset processing
* CICS transaction processing
* z/OS and TSO/ISPF concepts
* Job output and return-code analysis
* Mainframe error and abend troubleshooting
* Enterprise application workflow documentation

## Resume Project Description

**Mainframe Application Processing System | COBOL, JCL, DB2, VSAM, CICS, z/OS**

* Developed and tested mainframe application workflows using **COBOL, JCL, DB2, VSAM, and CICS** concepts within a z/OS environment.
* Created representative **JCL job workflows**, reviewed job outputs, and analyzed return codes and execution results.
* Developed COBOL-oriented processing workflows covering **compilation, testing, debugging, and structured error analysis**.
* Demonstrated **DB2 and VSAM data-processing scenarios** and troubleshooting techniques for SQL return codes, file-status codes, and common execution failures.
* Built an interactive **z/OS terminal simulation** demonstrating job submission, compilation, execution, data processing, and successful job completion.

## Disclaimer

This is an **educational and portfolio demonstration project**. The web application simulates mainframe job execution and troubleshooting workflows and does not execute workloads on a live IBM z/OS system.

## Author

**Rayeesa Tabusum**

GitHub: `rayeesa163`

## License

No license is currently specified for this repository.
