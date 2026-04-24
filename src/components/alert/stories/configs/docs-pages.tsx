import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Alert"
      description="Componente de feedback visual contextual. Suporta 4 variantes de cor (info, success, warning, danger), ícone customizável, título, subtítulo e ação de fechar por ícone ou botão."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
