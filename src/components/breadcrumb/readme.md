# ds-breadcrumb



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                                                  | Type                  | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `customClass` | `custom-class` | Classes extras mescladas na raiz `<nav>` do breadcrumb (passthrough).                                                                                                                                        | `string \| undefined` | `undefined` |
| `darkMode`    | `dark-mode`    | Flag para dark mode.                                                                                                                                                                                         | `boolean`             | `true`      |
| `items`       | --             | Lista de itens do breadcrumb. Como é um valor complexo (array de objetos), deve ser atribuído via propriedade (property binding), não via atributo. Quando há mais de 4 itens, os do meio colapsam em "···". | `BreadcrumbItem[]`    | `[]`        |


## Events

| Event        | Description                                        | Type                                    |
| ------------ | -------------------------------------------------- | --------------------------------------- |
| `dsNavigate` | Emitido ao clicar em um item navegável (com href). | `CustomEvent<BreadcrumbNavigateDetail>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
