/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { toHtml } from '@dimerapp/markdown/utils'
import { MovieService } from '#services/movie_service'

router
  .get('/', async (ctx) => {
    const slugs = await MovieService.getSlug()

    const movies: Record<string, any>[] = []

    for (const slug of slugs) {
      const md = await MovieService.read(slug)

      await md.process()
      movies.push({
        title: md.frontmatter.title,
        summary: md.frontmatter.summary,
        slug,
      })
    }

    // const slugs = files.map((file) => file.replace('.md', ''))

    return ctx.view.render('pages/home', { movies })
  })
  .as('home')

router
  .get('/movie/:slug', async (ctx) => {
    const md = await MovieService.read(ctx.params.slug)

    const movie = toHtml(md).contents

    ctx.view.share({ movie, md })

    return ctx.view.render('pages/movies/show')
  })
  .as('movies.show')
  .where('slug', router.matchers.slug())
