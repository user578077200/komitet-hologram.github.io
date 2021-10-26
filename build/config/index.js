const path = require('path');

const src = './src';
const dest = './dist';

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
	styles: {
		src: `${src}/_assets/stylesheets/*.scss`,
		dest: `${dest}/assets/stylesheets/`,
		watch: `${src}/_assets/stylesheets/**/*.scss`,
		lint: `${src}/_assets/stylesheets/**/*.scss`,
		sourcemaps: NODE_ENV !== 'production',
		compress: NODE_ENV === 'production',
		assetsPath: [`${src}/_assets/images`, `${src}/_assets/fonts`],
	},
	templates: {
		src: `${src}/**/*.pug`,
		dest: `${dest}`,
		watch: `${src}/**/*.pug`,
		prettify: NODE_ENV === 'production',
		data: {
			assetsPath: '/assets',
			filesPath: '/assets/files',
			imagesPath: '/assets/images',
			data: require(path.resolve('src/_data/data.json')),
		},
	},
	scripts: {
		src: `${src}/_assets/javascripts/*.js`,
		dest: `${dest}/assets/javascripts/`,
		watch: `${src}/_assets/javascripts/**/*.js`,
		compress: NODE_ENV === 'production',
	},
	images: {
		src: [`${src}/_assets/images/**/*.{png,jpg,gif,svg,ico}`, `!${src}/_assets/images/inline/**/*`],
		dest: `${dest}/assets/images/`,
		watch: `${src}/_assets/images/**/*.{png,jpg,gif,svg,ico}`,
		optimize: NODE_ENV === 'production',
	},
	resources: [{
		src: `${src}/_assets/files/**/*`,
		dest: `${dest}/assets/files/`,
	}],
	browsersync: {
		open: true,
		port: 9001,
		server: {
			directory: true,
			baseDir: dest,
		},
		files: [dest],
		startPath: '/',
		reloadDelay: 100,
		reloadDebounce: 200,
		injectChanges: true,
		logConnections: true,
		debugInfo: true,
		notify: false,
		browser: 'default',
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false,
		},
		watchOptions: {
			ignoreInitial: true,
		}
	},
	clean: dest,
};
module.exports = config;
