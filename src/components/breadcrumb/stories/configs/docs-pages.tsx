import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Breadcrumb"
      description="Navegação hierárquica que indica a localização atual. Exibe até 4 itens completos; com 5 ou mais, colapsa os itens do meio em ···."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
