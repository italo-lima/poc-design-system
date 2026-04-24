import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Tag"
      description="Etiqueta com ícones opcionais, sete cores (como o Badge), superfície sólida ou contorno, tamanho médio/pequeno e formato quadrado ou pílula."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
