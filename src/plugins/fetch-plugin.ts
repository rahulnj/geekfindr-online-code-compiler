import * as esbuild from 'esbuild-wasm';
import axios from 'axios'
import localforage from 'localforage';



const fileCache = localforage.createInstance({
    name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: inputCode,
                    };
                }

                //checking weather the file is already fetched and stored it as cache file in localforage
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                // if the file is stored as cache then returns here
                if (cachedResult) {
                    return cachedResult;
                }

                const { data, request } = await axios.get(args.path);
                console.log(request);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                };

                //if it is not stored as cache file then stores here
                await fileCache.setItem(args.path, result);
                return result;

            });
        }
    }
}