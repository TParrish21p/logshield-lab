import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import './App.css';
import {
  demoIncidents,
  demoParserResult,
  type Incident,
  type ParserResult,
} from './demoData';

type DemoRole = 'ADMIN' | 'ANALYST' | 'VIEWER';

const isPublicDemoMode = import.meta.env.VITE_PUBLIC_DEMO === 'true';

function App() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [parserResult, setParserResult] = useState<ParserResult | null>(null);
  const [isAnalyzingDemo, setIsAnalyzingDemo] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [analysisErrorMessage, setAnalysisErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [demoRole, setDemoRole] = useState<DemoRole>('ANALYST');

  useEffect(() => {
    loadIncidents();
  }, []);

  function loadIncidents() {
    if (isPublicDemoMode) {
      setIncidents(demoIncidents);
      setIsLoading(false);
      return;
    }

    fetch('http://localhost:8080/api/incidents')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load incidents from the backend.');
        }

        return response.json();
      })
      .then((data) => {
        setIncidents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }

  function analyzeDemoLog() {
    setIsAnalyzingDemo(true);
    setAnalysisErrorMessage('');
    setParserResult(null);

    if (isPublicDemoMode) {
      window.setTimeout(() => {
        setParserResult(demoParserResult);
        setIsAnalyzingDemo(false);
      }, 450);
      return;
    }

    fetch('http://localhost:8080/api/demo/analyze', {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not analyze the demo log.');
        }

        return response.json();
      })
      .then((data) => {
        setParserResult(data);
        setIsAnalyzingDemo(false);
      })
      .catch((error) => {
        setAnalysisErrorMessage(
          `${error.message} Make sure both the Spring Boot backend and Python parser service are running.`,
        );
        setIsAnalyzingDemo(false);
      });
  }

  function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setAnalysisErrorMessage('');
  }

  function analyzeSelectedFile() {
    if (isPublicDemoMode) {
      setAnalysisErrorMessage('File upload is disabled in public demo mode. Use Analyze Demo Log.');
      return;
    }

    if (!selectedFile) {
      setAnalysisErrorMessage('Choose a local synthetic log file before analyzing.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setIsUploadingFile(true);
    setAnalysisErrorMessage('');
    setParserResult(null);

    fetch('http://localhost:8080/api/upload/analyze', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || 'Could not analyze the selected file.');
          });
        }

        return response.json();
      })
      .then((data) => {
        setParserResult(data);
        setIsUploadingFile(false);
      })
      .catch((error) => {
        setAnalysisErrorMessage(
          `${error.message} Use only .txt, .log, .csv, or .json files under 1 MB with synthetic data.`,
        );
        setIsUploadingFile(false);
      });
  }

  function updateIncidentStatus(incidentId: number, status: string) {
    if (isPublicDemoMode) {
      setIncidents((currentIncidents) =>
        currentIncidents.map((incident) =>
          incident.id === incidentId ? { ...incident, status } : incident,
        ),
      );
      return;
    }

    fetch(`http://localhost:8080/api/incidents/${incidentId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Demo-Role': demoRole,
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Current demo role cannot update incident status.');
        }

        return response.json();
      })
      .then((updatedIncident) => {
        setIncidents((currentIncidents) =>
          currentIncidents.map((incident) =>
            incident.id === updatedIncident.id ? updatedIncident : incident,
          ),
        );
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  function updateIncidentNotes(incidentId: number, notes: string) {
    if (isPublicDemoMode) {
      setIncidents((currentIncidents) =>
        currentIncidents.map((incident) =>
          incident.id === incidentId ? { ...incident, notes } : incident,
        ),
      );
      return;
    }

    fetch(`http://localhost:8080/api/incidents/${incidentId}/notes`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Demo-Role': demoRole,
      },
      body: JSON.stringify({ notes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Current demo role cannot update analyst notes.');
        }

        return response.json();
      })
      .then((updatedIncident) => {
        setIncidents((currentIncidents) =>
          currentIncidents.map((incident) =>
            incident.id === updatedIncident.id ? updatedIncident : incident,
          ),
        );
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  const highSeverityCount = incidents.filter((incident) => incident.severity === 'HIGH').length;
  const openIncidentCount = incidents.filter((incident) => incident.status === 'OPEN').length;
  const isAnalysisInProgress = isAnalyzingDemo || isUploadingFile;
  const canEditIncidents = demoRole === 'ADMIN' || demoRole === 'ANALYST';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Bizarre Studios</p>
          <h1>LogShield Lab</h1>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#dashboard">Dashboard</a>
            <a href="#incidents">Incidents</a>
            <a href="#upload">Demo Logs</a>
            <a href="#notes">Notes</a>
          </nav>
        </div>

        <p className="sidebar-footer">
          Built by Tyler Parrish under Bizarre Studios, a solo indie development brand.
        </p>
      </aside>

      <main className="dashboard" id="dashboard">
        <section className="hero-section">
          <div>
            <p className="eyebrow">Educational prototype</p>
            <h2>Incident response dashboard for safe cybersecurity learning.</h2>
            <p>
              Use only synthetic, sanitized, or lab-generated logs. This prototype is not intended
              for production, compliance, or real sensitive data.
            </p>
          </div>
        </section>

        {isPublicDemoMode && (
          <section className="demo-mode-banner">
            <strong>Public demo mode</strong>
            <span>
              This hosted view uses built-in synthetic data only. Real file upload and backend data
              storage are disabled.
            </span>
          </section>
        )}

        <section className="role-panel" aria-label="Demo role selector">
          <div>
            <p className="eyebrow">Mock role layer</p>
            <h3>Demo Access Mode</h3>
            <p>
              This is not real authentication yet. It demonstrates role-based behavior before Spring
              Security is added.
            </p>
          </div>

          <label>
            Current role
            <select value={demoRole} onChange={(event) => setDemoRole(event.target.value as DemoRole)}>
              <option value="ADMIN">Admin</option>
              <option value="ANALYST">Analyst</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </label>
        </section>

        <section className="summary-grid" aria-label="Incident summary">
          <div className="summary-card">
            <span>Total Incidents</span>
            <strong>{incidents.length}</strong>
          </div>

          <div className="summary-card">
            <span>High Severity</span>
            <strong>{highSeverityCount}</strong>
          </div>

          <div className="summary-card">
            <span>Open Incidents</span>
            <strong>{openIncidentCount}</strong>
          </div>
        </section>

        <section className="content-section" id="incidents">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Incident data</p>
              <h3>Incidents</h3>
            </div>
          </div>

          {isLoading && <p className="state-message">Loading incidents...</p>}

          {errorMessage && (
            <p className="state-message error">
              {errorMessage} Make sure the Spring Boot backend is running on port 8080.
            </p>
          )}

          {!isLoading && !errorMessage && (
            <div className="incident-table-wrapper">
              <table className="incident-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Source</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident.id}>
                      <td>
                        <strong>{incident.title}</strong>
                        <span>{incident.description}</span>
                      </td>
                      <td>
                        <span className={`badge severity-${incident.severity.toLowerCase()}`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td>
                        {canEditIncidents ? (
                          <select
                            className="table-select"
                            value={incident.status}
                            onChange={(event) => updateIncidentStatus(incident.id, event.target.value)}
                          >
                            <option value="OPEN">Open</option>
                            <option value="TRIAGE">Triage</option>
                            <option value="RESOLVED">Resolved</option>
                          </select>
                        ) : (
                          <span className="badge status-badge">{incident.status}</span>
                        )}
                      </td>
                      <td>{incident.source}</td>
                      <td>
                        {canEditIncidents ? (
                          <textarea
                            className="notes-input"
                            value={incident.notes}
                            placeholder="Add analyst notes"
                            onChange={(event) => updateIncidentNotes(incident.id, event.target.value)}
                          />
                        ) : (
                          incident.notes || 'Read-only'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="content-section" id="upload">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Synthetic logs only</p>
              <h3>Log Analysis Lab</h3>
            </div>

            <button
              className="primary-button"
              type="button"
              onClick={analyzeDemoLog}
              disabled={isAnalysisInProgress}
            >
              {isAnalyzingDemo ? 'Analyzing...' : 'Analyze Demo Log'}
            </button>
          </div>

          <p className="warning-text">
            Do not upload real credentials, private keys, customer data, employee data, financial
            data, healthcare data, company secrets, regulated data, or other sensitive information.
            Use only synthetic, sanitized, or lab-generated logs.
          </p>

          {!isPublicDemoMode && (
            <div className="upload-panel">
              <div>
                <h4>Local Developer Upload</h4>
                <p>
                  For learning only. Allowed file types: .txt, .log, .csv, .json. Maximum file
                  size: 1 MB. Public demos should prefer the built-in demo log instead.
                </p>
              </div>

              <div className="upload-controls">
                <input
                  aria-label="Choose a synthetic log file"
                  type="file"
                  accept=".txt,.log,.csv,.json"
                  onChange={handleFileSelection}
                />

                <button
                  className="secondary-button"
                  type="button"
                  onClick={analyzeSelectedFile}
                  disabled={isAnalysisInProgress}
                >
                  {isUploadingFile ? 'Analyzing File...' : 'Analyze Selected File'}
                </button>
              </div>

              {selectedFile && (
                <p className="selected-file">
                  Selected file: <strong>{selectedFile.name}</strong>
                </p>
              )}
            </div>
          )}

          {isPublicDemoMode && (
            <p className="demo-upload-disabled">
              File upload is disabled in this public demo. Use the built-in demo log to view safe,
              synthetic parser results.
            </p>
          )}

          {analysisErrorMessage && <p className="state-message error">{analysisErrorMessage}</p>}

          {parserResult && (
            <div className="analysis-results">
              <div className="analysis-summary">
                <span>Parser Alerts</span>
                <strong>{parserResult.alertCount}</strong>
              </div>

              <div className="alert-list">
                {parserResult.alerts.map((alert, index) => (
                  <article className="alert-card" key={`${alert.title}-${index}`}>
                    <div>
                      <span className={`badge severity-${alert.severity.toLowerCase()}`}>
                        {alert.severity}
                      </span>
                      <h4>{alert.title}</h4>
                    </div>
                    <p>{alert.description}</p>
                    <code>{alert.evidence}</code>
                  </article>
                ))}
              </div>

              <div className="redacted-preview">
                <h4>Redacted Preview</h4>
                <pre>{parserResult.redactedPreview.join('\n')}</pre>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;