-- devs
CREATE TABLE devs (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  access_level TEXT NOT NULL
);

INSERT INTO devs (id, name, username, access_level) VALUES
  (1, 'Diego Arantes', 'darantes', 'dev'),
  (2, 'Natália Freire', 'nfreire', 'dev'),
  (3, 'Caio Resende', 'cresende', 'devops'),
  (4, 'Isabela Porto', 'iporto', 'dev');

-- deploy_log
CREATE TABLE deploy_log (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  server TEXT NOT NULL,
  deploy_time TEXT NOT NULL,
  package TEXT NOT NULL
);

INSERT INTO deploy_log (id, username, server, deploy_time, package) VALUES
  (1, 'cresende', 'PROD-03', '2026-03-28 14:22', 'update-config-v2.tar.gz'),
  (2, 'darantes', 'PROD-01', '2026-03-28 10:05', 'api-service-3.1.0.tar.gz'),
  (3, 'nfreire', 'PROD-02', '2026-03-27 16:40', 'frontend-build.zip'),
  (4, 'cresende', 'PROD-03', '2026-03-20 11:00', 'monitoring-agent.tar.gz');

-- auth_log
CREATE TABLE auth_log (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  login_time TEXT NOT NULL,
  ip_address TEXT NOT NULL
);

INSERT INTO auth_log (id, username, login_time, ip_address) VALUES
  (1, 'cresende', '2026-03-28 13:55', '189.45.22.101'),
  (2, 'darantes', '2026-03-28 09:50', '192.168.1.10'),
  (3, 'nfreire', '2026-03-27 16:20', '192.168.1.11'),
  (4, 'cresende', '2026-03-28 21:30', '189.45.22.101');

-- processes
CREATE TABLE processes (
  id INTEGER PRIMARY KEY,
  process_name TEXT NOT NULL,
  server TEXT NOT NULL,
  first_seen TEXT NOT NULL,
  cpu_usage REAL NOT NULL
);

INSERT INTO processes (id, process_name, server, first_seen, cpu_usage) VALUES
  (1, 'xmrig_svc', 'PROD-03', '2026-03-28 14:30', 89.5),
  (2, 'nginx', 'PROD-01', '2025-01-10 08:00', 5.2),
  (3, 'api-service', 'PROD-01', '2026-03-28 10:10', 12.3),
  (4, 'monitoring-agent', 'PROD-03', '2026-03-20 11:05', 3.1);
