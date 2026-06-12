// Public entry of @ds/core. Re-exports the Stencil-generated public types
// (Components/JSX namespaces, per-component prop types and custom-event types)
// so consumers — including the generated @ds/react wrapper — can import them
// from the package root. Runtime registration happens via the lazy loader
// (dist/) or the custom elements bundle (dist/components/).
export * from './components'
