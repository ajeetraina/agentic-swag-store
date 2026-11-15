-- Least-privilege role for the containment retest (lab section 7).
--
-- The investigation task ("why does inventory fail to render?") only ever needs
-- to READ the catalog. Point the agent's database access at this role instead of
-- the `postgres` superuser and a destructive write (DELETE/DROP/UPDATE) is
-- rejected by Postgres itself -- enforcement, not a prompt or a tool description.
--
-- This script runs automatically on a fresh volume (docker-entrypoint-initdb.d)
-- after the schema and seed scripts. It is additive and touches no data.

CREATE ROLE catalog_readonly LOGIN PASSWORD 'readonly';

GRANT CONNECT ON DATABASE catalog TO catalog_readonly;
GRANT USAGE ON SCHEMA public TO catalog_readonly;

-- Read-only on everything that exists now...
GRANT SELECT ON ALL TABLES IN SCHEMA public TO catalog_readonly;

-- ...and on anything created later, so the role stays read-only as the schema grows.
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO catalog_readonly;
