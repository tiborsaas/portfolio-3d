import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import ThreeLegacyImport from 'rollup-plugin-threejs-legacy-import';
import glsl from './extra/glsl.rollup';

export default {
	entry: './main.js',
	plugins: [
        ThreeLegacyImport(),
		glsl(),
		serve(),
    	livereload({
            watch: 'build'
        }),
		nodeResolve({
			jsnext: true,
			main: true
		}),
	],
	targets: [
		{
			format: 'es',
			sourceMap: false,
			dest: 'build/bundle.js'
		}
	]
};
