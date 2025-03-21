/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RedisController = () => import('#controllers/redis_controller')
import router from '@adonisjs/core/services/router'
const MoviesController = () => import('#controllers/movies_controller')

router.get('/', [MoviesController, 'index']).as('home')

router
  .get('/movie/:slug', [MoviesController, 'show'])
  .as('movies.show')
  .where('slug', router.matchers.slug())

router.get('/redis/flush', [RedisController, 'flush'])
router.delete('/redis/:slug', [RedisController, 'destroy'])
