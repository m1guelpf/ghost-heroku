# [Ghost](https://github.com/TryGhost/Ghost) on [Heroku](http://heroku.com)

Ghost is a free, open, simple blogging platform. Visit the project's website at <http://ghost.org>, or read the docs on <http://support.ghost.org>.

## Ghost version 2.X

The latest release of Ghost is now supported! Changes include:

  * Requires MySQL database, available through either of two add-ons:
    * [JawsDB](https://elements.heroku.com/addons/jawsdb) (deploy default)
    * [ClearDB](https://elements.heroku.com/addons/cleardb)
  * `HEROKU_URL` config var renamed to `PUBLIC_URL` to avoid using Heroku's namespace

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Things you should know

After deployment,
- First, visit Ghost at `https://YOURAPPNAME.herokuapp.com/ghost` to set up your admin account
- The app may take a few minutes to come to life
- Your blog will be publicly accessible at `https://YOURAPPNAME.herokuapp.com`
- If you subsequently set up a [custom domain](https://devcenter.heroku.com/articles/custom-domains) for your blog, you’ll need to update your Ghost blog’s `PUBLIC_URL` environment variable accordingly
- If you create much content or decide to scale-up the dynos to support more traffic, a more substantial, paid database plan will be required.

### How this works

This repository is a [Node.js](https://nodejs.org) web application that specifies [Ghost as a dependency](https://docs.ghost.org/v1.0.0/docs/using-ghost-as-an-npm-module), and makes a deploy button available.

  * Ghost and Casper theme versions are declared in the Node app's [`package.json`](package.json)
  * Scales across processor cores in larger dynos via [Node cluster API](https://nodejs.org/dist/latest-v6.x/docs/api/cluster.html)

## Updating source code

Optionally after deployment, to push Ghost upgrades or work with source code, clone this repo (or a fork) and connect it with the Heroku app:

```bash
git clone https://github.com/m1guelpf/ghost-heroku
cd ghost-heroku

heroku git:remote -a YOURAPPNAME
heroku info
```

Then you can push commits to the Heroku app, triggering new deployments:

```bash
git add .
git commit -m "Important changes"
git push heroku master
```

Watch the app's server-side behavior to see errors and request traffic:

```bash
heroku logs -t
```

See more about [deploying to Heroku with git](https://devcenter.heroku.com/articles/git).

### Upgrading Ghost

On each deployment, the Heroku Node/npm build process will **auto-upgrade Ghost to the newest 1.x version**. To prevent this behavior, use npm 5+ (or yarn) to create a lockfile.

```bash
npm install
git add package-lock.json
git commit -m 'Lock dependencies'
git push heroku master
```

Now, future deployments will always use the same set of dependencies.

To update to newer versions:

```
npm update
git add package-lock.json
git commit -m 'Update dependencies'
git push heroku master
```

### Database migrations

Newer versions of Ghost frequently require changes to the database. These changes are automated with a process called **database migrations**.

After upgrading Ghost, you may see errors logged like:

> DatabaseIsNotOkError: Migrations are missing. Please run knex-migrator migrate.

To resolve this error, run the pending migrations and restart to get the app back on-line:

```bash
heroku run knex-migrator migrate --mgpath node_modules/ghost
heroku restart
```

This can be automated by adding the following line to `Procfile`:

```
release: knex-migrator migrate --mgpath node_modules/ghost
```

## Problems?

If you have problems using your instance of Ghost, you should check the [official documentation](http://support.ghost.org/) or open an issue on [the official issue tracker](https://github.com/TryGhost/Ghost/issues). If you discover an issue with the deployment process provided by *this repository*, then [open an issue here](https://github.com/m1guelpf/ghost-heroku).

## License

Released under the [MIT license](./LICENSE), just like the Ghost project itself.
