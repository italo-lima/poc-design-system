# ds-accordion



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description                                                  | Type                  | Default     |
| -------------------- | -------------- | ------------------------------------------------------------ | --------------------- | ----------- |
| `alignment`          | `alignment`    | Alinhamento e padding do accordion.                          | `"flush" \| "left"`   | `'left'`    |
| `customClass`        | `custom-class` | Classes extras mescladas na raiz do accordion (passthrough). | `string \| undefined` | `undefined` |
| `darkMode`           | `dark-mode`    | Flag para dark mode.                                         | `boolean`             | `true`      |
| `defaultOpen`        | `default-open` | Define se o accordion inicia aberto.                         | `boolean`             | `false`     |
| `disabled`           | `disabled`     | Desabilita a interação com o accordion.                      | `boolean`             | `false`     |
| `readOnly`           | `read-only`    | Flag para read only.                                         | `boolean`             | `false`     |
| `title` _(required)_ | `title`        | Texto exibido no cabeçalho do accordion.                     | `string`              | `undefined` |


## Events

| Event      | Description                                                       | Type                              |
| ---------- | ----------------------------------------------------------------- | --------------------------------- |
| `dsToggle` | Emitido ao alternar o estado. `detail.open` indica o novo estado. | `CustomEvent<{ open: boolean; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
