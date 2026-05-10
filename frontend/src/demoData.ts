export type Incident = {
  id: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  source: string;
  notes: string;
  createdAt: string;
};

export type ParserAlert = {
  title: string;
  description: string;
  severity: string;
  source: string;
  evidence: string;
};

export type ParserResult = {
  alertCount: number;
  alerts: ParserAlert[];
  redactedPreview: string[];
};

export const demoIncidents: Incident[] = [
  {
    id: 1,
    title: 'Multiple failed login attempts',
    description:
      'Synthetic demo alert: repeated failed login attempts were detected from the same IP address.',
    severity: 'HIGH',
    status: 'OPEN',
    source: 'demo-auth.log',
    notes: 'Public demo mode uses synthetic incident data only.',
    createdAt: '2026-05-10T00:00:00Z',
  },
  {
    id: 2,
    title: 'Possible credential exposure',
    description:
      'Synthetic demo alert: a token-like value appeared in a log line and was redacted by the parser.',
    severity: 'MEDIUM',
    status: 'TRIAGE',
    source: 'demo-auth.log',
    notes: 'No raw uploaded logs are accepted in the hosted public demo.',
    createdAt: '2026-05-10T00:05:00Z',
  },
  {
    id: 3,
    title: 'Suspicious PowerShell usage',
    description:
      'Synthetic demo alert: encoded PowerShell command pattern was detected in lab-generated text.',
    severity: 'HIGH',
    status: 'OPEN',
    source: 'demo-endpoint.log',
    notes: 'This is simulated parser output for portfolio review.',
    createdAt: '2026-05-10T00:10:00Z',
  },
];

export const demoParserResult: ParserResult = {
  alertCount: 4,
  alerts: [
    {
      title: 'Failed login attempt',
      description: 'A failed login attempt was detected in a synthetic log line.',
      severity: 'LOW',
      source: 'parser-service',
      evidence:
        '2026-05-09T09:16:03Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password',
    },
    {
      title: 'Multiple failed login attempts from same IP',
      description: '3 failed login attempts were detected from 198.51.100.23.',
      severity: 'HIGH',
      source: 'parser-service',
      evidence: 'ip=198.51.100.23 failed_login_count=3',
    },
    {
      title: 'Possible credential exposure',
      description: 'A sensitive-looking value appeared in the log and was redacted.',
      severity: 'MEDIUM',
      source: 'parser-service',
      evidence:
        '2026-05-09T09:18:30Z WARN user=tester action=password_reset status=requested ip=192.0.2.50 token=[REDACTED]',
    },
    {
      title: 'Suspicious PowerShell usage',
      description: 'A suspicious PowerShell command pattern was detected.',
      severity: 'HIGH',
      source: 'parser-service',
      evidence: 'PowerShell.exe -EncodedCommand synthetic-demo-command',
    },
  ],
  redactedPreview: [
    '2026-05-09T09:14:22Z INFO user=alice action=login status=success ip=192.0.2.10',
    '2026-05-09T09:16:03Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password',
    '2026-05-09T09:16:18Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password',
    '2026-05-09T09:16:44Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password',
    '2026-05-09T09:18:30Z WARN user=tester action=password_reset status=requested ip=192.0.2.50 token=[REDACTED]',
    'PowerShell.exe -EncodedCommand synthetic-demo-command',
  ],
};