import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany()

  await prisma.prompt.create({
    data: {
      title: 'Título do YouTube',
      template: `Sua função é gerar três títulos para um vídeo do YouTube.
Abaixo você receberá uma transcrição deste vídeo, utilize esta transcrição para gerar os títulos.
Abaixo você também receberá uma lista de títulos, utilize esta lista como referência para os títulos a serem gerados.
      
Os títulos devem ter no máximo 60 caracteres.
Os títulos devem ser atraentes e atraentes para maximizar os cliques.
      
Retorne SOMENTE os três títulos em formato de lista como no exemplo abaixo:
'''
- Título 1
- Título 2
- Título 3
'''

Trasncrição:
'''
{transcription}
'''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Descrição do YouTube',
      template: `Sua função é gerar uma descrição sucinta para um vídeo do YouTube.
Abaixo você receberá uma transcrição deste vídeo, utilize esta transcrição para gerar a descrição.
A descrição deverá ter no máximo 80 palavras na primeira pessoa contendo os principais pontos do vídeo.
Use palavras atraentes que prendam a atenção de quem está lendo.
Além disso, inclua no final da descrição uma lista de 3 a 10 hashtags em letras minúsculas contendo as palavras-chave do vídeo.
A devolução deverá seguir o seguinte formato:
'''
Descrição.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcrição:
'''
{transcription}
'''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Legenda do Instagram',
      template: `Sua função é gerar uma legenda sucinta para um Instagram.
Abaixo você receberá uma transcrição deste vídeo, utilize esta transcrição para gerar a descrição.
A descrição deverá ter no máximo 30 palavras na primeira pessoa contendo os principais pontos do vídeo.
Use palavras atraentes que prendam a atenção de quem está lendo.
Além disso, inclua no final da descrição uma lista de 3 a 10 hashtags em letras minúsculas contendo as palavras-chave do vídeo.
A devolução deverá seguir o seguinte formato:
'''
Descrição.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcrição:
'''
{transcription}
'''`.trim()
    }
  })
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })