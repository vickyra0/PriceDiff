# PricePulse

## Run With Docker

Build and start the production container:

```bash
docker compose up --build -d
```

Open the app on the host machine at [http://localhost:8080](http://localhost:8080).

To share it with a friend on the same Wi-Fi network, find the host machine's local IP address and give them:

```text
http://YOUR_LOCAL_IP:8080
```

On Windows, run `ipconfig` and use the IPv4 address from the active network adapter. Allow inbound TCP port `8080` through Windows Firewall if the other device cannot connect.

Stop the container with:

```bash
docker compose down
```

The container uses the built-in mock API, so no separate backend is needed for the current demo workflows.

## Local Development

```bash
npm install
npm run dev
```

The app is also available at [http://localhost:5173](http://localhost:5173) during local development.

## Project Notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
