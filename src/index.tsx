import ReactDom from 'react-dom';

import { Provider } from 'react-redux';

import { store } from './state';

import 'bulmaswatch/superhero/bulmaswatch.min.css'

import { CodeCell, TextEditor } from './components';



const App = () => {

    return (
        <Provider store={store}>
            <div>
                <TextEditor />
                {/* <CodeCell /> */}
            </div>
        </Provider>
    )

}



ReactDom.render(
    <App />,
    document.getElementById('root')
)