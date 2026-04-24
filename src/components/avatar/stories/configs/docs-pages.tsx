import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Avatar"
      description="Componente para exibição de identidade visual de usuários. Suporta 3 tipos (image, icon, initials), formato circular ou quadrado arredondado e dark mode."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
