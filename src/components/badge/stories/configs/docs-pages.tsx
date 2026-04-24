import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Badge"
      description="Indicador visual de contagem ou status. Exibe um número (999+ para valores ≥ 1000) ou um ponto de 8px quando sem contagem. Disponível em 7 variantes de cor."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
