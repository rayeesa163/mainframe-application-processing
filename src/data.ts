export interface Capability {
  icon: string
  title: string
  description: string
  tags: string[]
}

export const capabilities: Capability[] = [
  {
    icon: 'COB',
    title: 'COBOL Programming',
    description:
      'Developed and maintained COBOL programs for batch and transactional processing. Handled compilation, testing, debugging, and structured error analysis across application modules.',
    tags: ['COBOL', 'Compilation', 'Debugging', 'Error Analysis'],
  },
  {
    icon: 'JCL',
    title: 'JCL Job Execution',
    description:
      'Created and submitted JCL jobs for batch processing workflows. Reviewed job output listings, analyzed return codes, and resolved execution failures through structured troubleshooting.',
    tags: ['JCL', 'Batch Jobs', 'Job Output', 'Return Codes'],
  },
  {
    icon: 'DB2',
    title: 'DB2 SQL & Data Access',
    description:
      'Wrote DB2 SQL queries to retrieve, validate, and manipulate application data. Supported database-driven processing through embedded SQL in COBOL programs.',
    tags: ['DB2', 'SQL', 'Data Validation', 'Embedded SQL'],
  },
  {
    icon: 'VSM',
    title: 'VSAM Dataset Management',
    description:
      'Worked with VSAM datasets including KSDS, ESDS, and RRDS for high-performance keyed access. Managed record-level operations across application workflows.',
    tags: ['VSAM', 'KSDS', 'ESDS', 'RRDS'],
  },
  {
    icon: 'CIC',
    title: 'CICS Transaction Processing',
    description:
      'Applied CICS transaction-processing concepts to build interactive application workflows. Handled screen maps, program linkage, and resource management within CICS regions.',
    tags: ['CICS', 'Transactions', 'BMS Maps', 'Program Linkage'],
  },
  {
    icon: 'ZOS',
    title: 'z/OS Environment',
    description:
      'Operated within the z/OS environment across all application workflows. Navigated TSO/ISPF, managed PDS libraries, and coordinated job submission and output review.',
    tags: ['z/OS', 'TSO/ISPF', 'PDS', 'Job Submission'],
  },
]

export interface WorkflowStep {
  title: string
  description: string
}

export const workflowSteps: WorkflowStep[] = [
  {
    title: 'Job Submission (JCL)',
    description:
      'Create JCL job cards defining program to execute, input/output datasets, and library allocations. Submit to internal reader and monitor job queue status.',
  },
  {
    title: 'Compilation (COBOL)',
    description:
      'Compile COBOL source from PDS library. Review compile listing for errors, warnings, and diagnostics. Resolve syntax and binding issues before link-edit.',
  },
  {
    title: 'Execution & Processing',
    description:
      'Execute compiled program in batch or CICS region. Program reads input files, processes business logic, accesses DB2/VSAM data, and writes output datasets.',
  },
  {
    title: 'Output Review & Analysis',
    description:
      'Review job output listing for return codes, abend information, and SYSOUT messages. Validate data integrity and confirm successful completion or diagnose failures.',
  },
  {
    title: 'Troubleshooting & Debugging',
    description:
      'Analyze abend codes, file status codes, and SQL return codes. Use dumps, traces, and structured debugging to identify root cause and apply corrective action.',
  },
]

export interface TroubleshootItem {
  type: 'error' | 'warn' | 'info'
  icon: string
  title: string
  symptoms: string[]
  resolution: string
}

export const troubleshootItems: TroubleshootItem[] = [
  {
    type: 'error',
    icon: 'CE',
    title: 'COBOL Compile Errors',
    symptoms: [
      'Syntax errors flagged in compile listing (e.g., missing period, invalid verb)',
      'Undefined data names or procedure names',
      'Severity level 8 or higher prevents object module generation',
    ],
    resolution:
      'Review the compile listing error summary at the top. Cross-reference each message number with the source line. Fix syntax, ensure all data names are defined in DATA DIVISION, and recompile until return code is 0.',
  },
  {
    type: 'error',
    icon: 'JE',
    title: 'JCL Execution Failures',
    symptoms: [
      'Job abends with user or system abend code (e.g., S0C7, U999)',
      'Dataset not found or allocation errors (IEC150I)',
      'Time or space abends (S322, SB37)',
    ],
    resolution:
      'Check the job output for the abend code and the failing step. Verify dataset names and allocations in JCL. For S0C7 (decimal data error), inspect input data. For space abends, increase SPACE parameter. Correct and resubmit.',
  },
  {
    type: 'warn',
    icon: 'SQ',
    title: 'DB2 SQL Return Codes',
    symptoms: [
      'SQLCODE +100 (row not found) when data is expected',
      'SQLCODE -805 (plan/package not found) at program startup',
      'SQLCODE -911 (timeout or deadlock) during concurrent access',
    ],
    resolution:
      'For +100, verify WHERE clause predicates and data availability. For -805, bind the plan/package with correct DBRM. For -911, review locking strategy and consider isolation level adjustments or retry logic.',
  },
  {
    type: 'warn',
    icon: 'VS',
    title: 'VSAM File Status Codes',
    symptoms: [
      'File status 23 (key not found) on READ/START operations',
      'File status 34 or 44 (space or boundary) on WRITE operations',
      'File status 92 (logic error) during sequential processing',
    ],
    resolution:
      'For status 23, verify key values and file organization. For space errors, redefine the dataset with larger allocation or use CI/CA freespace. For logic errors, ensure correct file open mode and access type match the operation.',
  },
  {
    type: 'info',
    icon: 'CI',
    title: 'CICS Transaction Abends',
    symptoms: [
      'ASRA abend (program check) during transaction execution',
      'AEIB abend (program not found) at transaction start',
      'AICA abend (runaway task / time interval exceeded)',
    ],
    resolution:
      'For ASRA, inspect the transaction dump for the offset and data conditions. For AEIB, verify the program is defined in PPT and installed. For AICA, review for infinite loops or add HANDLE AICA to gracefully terminate.',
  },
  {
    type: 'info',
    icon: 'ZO',
    title: 'z/OS System Issues',
    symptoms: [
      'TSO logon failures or session limits reached',
      'PDS member not found or library full conditions',
      'Job stuck in execution queue or held status',
    ],
    resolution:
      'For TSO issues, check user ID and system limits with sysadmin. For PDS, compress the library or allocate additional space. For stuck jobs, use SDSF to check queue position, hold/release status, and initiator availability.',
  },
]

export interface TerminalLine {
  type: 'prompt' | 'output' | 'error' | 'info' | 'warning' | 'normal'
  text: string
}

export const terminalSequence: TerminalLine[] = [
  { type: 'prompt', text: 'READY' },
  { type: 'output', text: 'SUBMIT JOB(PROD01.PDS.JCL(PAYROLL))' },
  { type: 'info', text: 'ICH408I JOB PAYROLL  SUBMITTED TO INTERNAL READER' },
  { type: 'output', text: 'JOB PAYROLL (JOB12345) EXECUTING' },
  { type: 'normal', text: '' },
  { type: 'output', text: 'STEP: COBOLC   PROC=IGYWC   RC=0000' },
  { type: 'info', text: 'COMPILATION SUCCESSFUL - 0 ERRORS, 2 WARNINGS' },
  { type: 'normal', text: '' },
  { type: 'output', text: 'STEP: LINKEDIT  PROC=IEWL    RC=0000' },
  { type: 'info', text: 'MODULE PAYROLL.LOADLIB(PAYROLL) CREATED' },
  { type: 'normal', text: '' },
  { type: 'output', text: 'STEP: PAYRUN    PROC=GO      EXECUTING...' },
  { type: 'output', text: 'OPENING  VSAM.KSDS.EMPMAST  (KSDS)' },
  { type: 'output', text: 'OPENING  DB2.SYSIBM.SYSEMP   (SQL)' },
  { type: 'output', text: 'PROCESSING 48,392 EMPLOYEE RECORDS...' },
  { type: 'output', text: 'SQLCODE = 0    ROWS RETRIEVED: 48392' },
  { type: 'output', text: 'WRITING  PAYROLL.PAYFILE.G0926' },
  { type: 'output', text: 'CLOSING  ALL DATASETS' },
  { type: 'info', text: 'STEP: PAYRUN    RC=0000' },
  { type: 'normal', text: '' },
  { type: 'output', text: 'JOB PAYROLL (JOB12345) COMPLETED  RC=0000' },
  { type: 'info', text: 'CPU TIME: 00:00:03.21   ELAPSED: 00:00:08.74' },
  { type: 'prompt', text: 'READY' },
]

export const stats = [
  { value: '6', label: 'Core Technologies' },
  { value: '5', label: 'Workflow Stages' },
  { value: '6', label: 'Troubleshooting Guides' },
  { value: '48K+', label: 'Records Processed' },
]
