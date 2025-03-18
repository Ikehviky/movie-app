import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import { MarkdownFile } from '@dimerapp/markdown'
import { readdir, readFile } from 'node:fs/promises'

export class MovieService {
  // Your code here

  static getSlugUrl(slug: string) {
    if (!slug.endsWith('.md')) {
      slug += '.md'
    }

    return app.makeURL(`resources/movies/${slug}`)
  }

  static async getSlug() {
    const files = await readdir(app.makeURL('resources/movies'))
    return files.map((file) => file.replace('.md', ''))
  }

  static async read(slug: string) {
    try {
      const url = this.getSlugUrl(slug)
      const file = await readFile(url, 'utf-8')

      const md = new MarkdownFile(file)

      await md.process()

      return md
    } catch (error) {
      throw new Exception(`could not find movie called ${slug}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }
}
