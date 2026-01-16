import pluginImport from "postcss-import";
import pluginPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";

export default {
	plugins: [
		pluginImport(),
		pluginPresetEnv(),
		cssnano({
			preset: [
				"default",
				{
					mergeRules: false,
					discardComments: {
						removeAll: true,
					},
				},
			],
		}),
	],
};
