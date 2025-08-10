# App Template

Starter app template README

## Development

### Setup
First, set up environment variables and secrets.
1. Copy `.env.template` to `.env` and populate values. Make sure to use the instructions [here](https://supabase.com/docs/guides/self-hosting/docker#generate-api-keys) to generate the `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`.

To start the local development environment:
1. Run `docker compose up -d` to start containers in detached mode.
2. Start file syncing with `docker compose watch`.
3. Navigate to `http://localhost:3000` to view the application.

### Database migrations
Create a new database migration by first editing `src/app/api/db/schema.ts`. Then from the `src/app` folder, run `npm run db:generate <MIGRATION_NAME>` and check in the generated files.

Run the migration against your local development database by running `docker exec -it app bash` and then `npm run db:migrate`.

### Supabase dashboard
With the development environment running, navigate to `http://localhost:8000` to view the Supabase dashboard.

Use the `DASHBOARD_USERNAME` and `DASHBOARD_PASSWORD` environment variables to sign in

### Database shell
1. Run `docker exec -it db bash`.
2. Then, run `psql -U postgres`.

To clear the database, run
1. `docker compose down -v`
2. `rm -r docker/volumes/db/data

### Linting
To install the local eslint plugins, run
1. `cd src/app/api/eslint-local-rules`
2. `npm run build`

## Deployment

TODO