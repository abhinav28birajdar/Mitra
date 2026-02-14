module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                    blacklist: null,
                    whitelist: null,
                    safe: false,
                    allowUndefined: true,
                },
            ],
            [
                'module-resolver',
                {
                    root: ['.'],
                    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                    alias: {
                        '@': './src',
                        '@components': './src/components',
                        '@screens': './src/screens',
                        '@services': './src/services',
                        '@hooks': './src/hooks',
                        '@utils': './src/utils',
                        '@app-types': './src/types',
                        '@theme': './src/theme',
                        '@constants': './src/constants',
                        '@navigation': './src/navigation',
                        '@store': './src/store',
                        '@assets': './src/assets',
                        '@context': './src/context',
                        '@lib': './src/lib'
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
