import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Avatar Group"
      description="Agrupa múltiplos avatares em linha com sobreposição. Exibe no máximo N avatares e indica o excedente com um círculo +N."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
