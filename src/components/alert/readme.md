# ds-alert



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description                                                      | Type                                           | Default     |
| -------------------- | -------------- | ---------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `closeLabel`         | `close-label`  | Rótulo exibido no botão de fechar quando `closeType` é `button`. | `string`                                       | `'Fechar'`  |
| `closeType`          | `close-type`   | Define o tipo do elemento de fechar (ícone X ou botão de texto). | `"button" \| "icon"`                           | `'icon'`    |
| `customClass`        | `custom-class` | Classes extras mescladas na raiz do alert (passthrough).         | `string \| undefined`                          | `undefined` |
| `darkMode`           | `dark-mode`    | Flag para dark mode.                                             | `boolean`                                      | `true`      |
| `subtitle`           | `subtitle`     | Texto secundário exibido abaixo do título.                       | `string \| undefined`                          | `undefined` |
| `title` _(required)_ | `title`        | Texto principal exibido no alert.                                | `string`                                       | `undefined` |
| `variant`            | `variant`      | Define a variante de cor do alert.                               | `"danger" \| "default" \| "info" \| "success"` | `'default'` |


## Events

| Event     | Description                                               | Type                |
| --------- | --------------------------------------------------------- | ------------------- |
| `dsClose` | Emitido ao clicar no elemento de fechar (ícone ou botão). | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
