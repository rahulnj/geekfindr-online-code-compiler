import * as esbuild from 'esbuild-wasm';
import axios from 'axios'
import localforage from 'localforage';



const fileCache = localforage.createInstance({
    name: 'filecache'
});




export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResolve', args);
                if (args.path === 'index.js') {
                    return { path: args.path, namespace: 'a' };
                }

                if (args.path.includes('./') || args.path.includes('../')) {
                    return {
                        namespace: 'a',
                        path: new URL(args.path,
                            'https://unpkg.com' + args.resolveDir + '/').href,
                    };
                }

                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: `
                     import React,{useState} from 'react'
              console.log(useState);
            `,
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
        },
    };
};