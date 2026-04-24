import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Popover"
      description="Painel flutuante com título e conteúdo. Suporta cinco posições de seta: esquerda, topo, baixo, direita, ou sem seta (default)."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
