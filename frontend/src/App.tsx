import { useEffect, useState } from 'react';
import './App.css';

type Incident = {
  id: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  source: string;
  notes: string;
  createdAt: string;
};

type ParserAlert = {
  title: string;
  description: string;
  severity: string;
  source: string;
  evidence: string;
};

type ParserResult = {
  alertCount: number;
  alerts: ParserAlert[];
  redactedPreview: string[];
};

function App() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [parserResult, setParserResult] = useState<ParserResult | null>(null);
  const [isAnalyzingDemo, setIsAnalyzingDemo] = useState(false);
  const [analysisErrorMessage, setAnalysisErrorMessage] = useState('');

  useEffect(() => {
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
  }, []);

  function analyzeDemoLog() {
    setIsAnalyzingDemo(true);
    setAnalysisErrorMessage('');
    setParserResult(null);

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

  const highSeverityCount = incidents.filter((incident) => incident.severity === 'HIGH').length;
  const openIncidentCount = incidents.filter((incident) => incident.status === 'OPEN').length;

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
              <p className="eyebrow">Live backend data</p>
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
                        <span className="badge status-badge">{incident.status}</span>
                      </td>
                      <td>{incident.source}</td>
                      <td>{incident.notes || 'No notes yet'}</td>
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
              <p className="eyebrow">Built-in synthetic log</p>
              <h3>Demo Log Analysis</h3>
            </div>

            <button className="primary-button" type="button" onClick={analyzeDemoLog} disabled={isAnalyzingDemo}>
              {isAnalyzingDemo ? 'Analyzing...' : 'Analyze Demo Log'}
            </button>
          </div>

          <p className="warning-text">
            Do not upload real credentials, private keys, customer data, employee data, financial
            data, healthcare data, company secrets, regulated data, or other sensitive information.
            Use only synthetic, sanitized, or lab-generated logs.
          </p>

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