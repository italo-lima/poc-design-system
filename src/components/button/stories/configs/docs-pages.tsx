import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Button"
      description="Elemento de ação primária da interface. Suporta três variantes visuais, três esquemas de cor, ícones leading e trailing, e estado desabilitado."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
