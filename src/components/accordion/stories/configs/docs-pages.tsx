import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Accordion"
      description="Componente de expansão e colapso de conteúdo. Suporta dois alinhamentos (left e flush), estado desabilitado, indicador visual de hover e foco acessível."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
